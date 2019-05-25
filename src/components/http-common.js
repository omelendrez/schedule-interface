import axios from 'axios'
// http://localhost:3010/
// https://escng-schedule.herokuapp.com/
// TODO - Changes only for iPage
const HTTP = axios.create({
  baseURL: 'http://192.168.1.1:3010/',
  headers: {
    // Authorization: 'Bearer {token}'
  }
})

export { HTTP as default }
