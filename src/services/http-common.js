import axios from 'axios'
import Store from '../store/store'

import { LOCAL_STORAGE_VARS, getPersistedValue, removePersistedValues } from '../utils'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ENDPOINT
})

HTTP.interceptors.response.use(
  (response) => {
    Store.dispatch('RESET_ERROR')
    return response
  },
  (error) => {
    Store.dispatch('SET_ERROR', { ...error.response.data, code: error.response.status })
    if (error.response.data.message === 'Token expirada') {
      return removePersistedValues()
    }
  }
)

HTTP.interceptors.request.use(
  (config) => {
    const token = getPersistedValue(LOCAL_STORAGE_VARS.TOKEN)
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

export { HTTP as default }
