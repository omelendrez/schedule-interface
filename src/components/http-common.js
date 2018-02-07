import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://localhost:3010/',
  headers: {
    // Authorization: 'Bearer {token}'
  }
})

export {
  HTTP as default
}
