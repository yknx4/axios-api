import invariant from 'invariant'
import { isString, snakeCase, camelCase } from 'lodash'
import axios from 'axios'
import axiosWrapper from './axiosWrapper'

export default class Api {
  constructor (prefix, models = []) {
    const URL_REGEX = /(https?):\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[\w-_.?]+)(?::(\d{2,5}))?\/?.*/gi
    logger.info(`Initializing Axios Api for ${prefix}`)
    invariant(URL_REGEX.test(prefix), `${prefix} should be a valid url`)
    this.$prefix = prefix
    this.$axios = axios.create()
    this.setModels(models)
  }

  get defaults () {
    return this.$axios.defaults
  }

  setModels (models) {
    invariant(
      Array.isArray(models) && models.every(isString),
      '.models should be a valid array of strings'
    )
    const normalizedModels = models.map(snakeCase)
    normalizedModels.forEach(model => {
      Object.defineProperty(this, camelCase(model), {
        enumerable: true,
        writable: false,
        value: axiosWrapper(
          this.$axios,
          this.$prefix,
          model,
          normalizedModels.filter(m => m !== model)
        )
      })
    })
  }
}
