import axios from 'axios'
import { LOCAL_STORAGE_VARS, getPersistedValue, removePersistedValues } from '../utils'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ENDPOINT
})

HTTP.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // eslint-disable-next-line no-console
      console.log(error.response.status)
      removePersistedValues()
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
