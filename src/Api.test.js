import Api from './Api'
import testServer from './testServer'

describe('Api Model', () => {
  it('should only allow valid urls as prefix', () => {
    const valid = () => new Api('http://www.test.com')
    const invalid = () => new Api('potato')
    expect(valid).not.toThrowAnyError()
    expect(invalid).toThrowAnyError()
  })

  it('should only allow an array of strings as models', () => {
    const valid = () => new Api('https://test.com', ['hello', 'world'])
    const invalid = () => new Api('https://test.com', 'hello world')
    expect(valid).not.toThrowAnyError()
    expect(invalid).toThrowAnyError()
  })

  it('should get by default', async () => {
    const github = new Api('https://www.github.com', ['orgs', 'repos'])
    const lodashRepos = github.orgs('lodash').repos.get()
    await expect(lodashRepos).resolves
  })

  it('should have axios defaults', () => {
    const github = new Api('https://www.github.com', ['orgs', 'repos'])

    expect(github.defaults).toBe(github.$axios.defaults)
  })
})

describe('requests', () => {
  let serverPort
  let api
  beforeAll(async () => {
    serverPort = await testServer()
    api = new Api(
      `http://127.0.0.1:${serverPort}`,
      ['users', 'posts', 'tags'],
      { crossdomain: true }
    )
  })
  describe('get', () => {
    it('should perform get request with headers', async () => {
      const { status, data } = await api.posts.get({
        headers: {
          'X-Custom-Header': 'custom value'
        }
      })

      expect(status).toEqual(200)
      const { url, method, headers, path } = data
      expect(method).toEqual('GET')
      expect(url).toEqual('/posts')
      expect(path).toEqual('/posts')
      expect(headers).toHaveProperty('x-custom-header', 'custom value')
    })
    it('should perform get request with query', async () => {
      const { status, data } = await api.users.get({
        params: { withQuery: '', values: 'something' }
      })
      expect(status).toEqual(200)
      const { url, method, query, path } = data
      expect(url).toEqual('/users?withQuery=&values=something')
      expect(method).toEqual('GET')
      expect(path).toEqual('/users')
      expect(query).toHaveProperty('withQuery')
      expect(query).toHaveProperty('values', 'something')
    })
  })
})
