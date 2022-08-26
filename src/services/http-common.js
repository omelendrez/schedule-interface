import axios from 'axios'
// http://localhost:3010/

console.log(process.env)
const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ENDPOINT,
  headers: {
    // Authorization: 'Bearer {token}'
  }
})

export { HTTP as default }
