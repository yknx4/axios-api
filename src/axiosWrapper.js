import { URL as baseUrl, Url } from 'url'

const URL = Url || baseUrl

function wrap (axios, name, url) {
  return axios[name].bind(axios, url.toString())
}

function setAxiosMethods (axios, object) {
  // All axios available methods
  const methods = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch']

  // Chain get as default action
  object.then = wrap(axios, 'get', object.url)
  object.catch = () => {}

  // Create each method with a binded call to axios' methods with given url
  methods.forEach(method => {
    Object.defineProperty(object, method, {
      enumerable: true,
      writable: false,
      value: wrap(axios, method, object.url)
    })
  })

  // Specially handled request method
  object.request = opts =>
    axios.request(Object.assign({}, opts, { url: object.url.toString() }))
}

function populateChilds (axios, object, childs) {
  // Only when childs are an array
  if (Array.isArray(childs)) {
    // Define a child property with an axiosWrapper with the child as prefix
    childs.forEach(child => {
      Object.defineProperty(object, child, {
        enumerable: true,
        writable: false,
        value: axiosWrapper(
          axios,
          object.url.toString() + '/',
          child,
          childs.filter(c => c !== child)
        )
      })
    })
  }
}

export default function axiosWrapper (axios, prefix, model, childs) {
  const url = new URL(model, prefix)
  logger.trace(`Base ${prefix} + Path ${model} => ${url}`)

  const idEndpoint = id =>
    axiosWrapper(axios, prefix, `${model}/${id}`, childs)
  idEndpoint.url = url

  setAxiosMethods(axios, idEndpoint)
  populateChilds(axios, idEndpoint, childs)

  return idEndpoint
}
