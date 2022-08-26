import axios from 'axios'
// http://localhost:3010/

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ENDPOINT,
  headers: {
    // Authorization: 'Bearer {token}'
  }
})

export { HTTP as default }
