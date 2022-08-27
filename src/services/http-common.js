import axios from 'axios'
import { LOCAL_STORAGE_VARS, getPersistedValue } from '../utils'
// http://localhost:3010/

const token = getPersistedValue(LOCAL_STORAGE_VARS.TOKEN)
const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export { HTTP as default }
