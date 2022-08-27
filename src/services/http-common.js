import axios from 'axios'
import { LOCAL_STORAGE_VARS, getPersistedValue } from '../utils'

const token = getPersistedValue(LOCAL_STORAGE_VARS.TOKEN)

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ENDPOINT
})

HTTP.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export { HTTP as default }
