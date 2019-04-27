import axios from 'axios'
// http://localhost:3010/
// https://escng-schedule.herokuapp.com/
// TODO - Changes only for iPage
const HTTP = axios.create({
  baseURL: 'https://escng-schedule.herokuapp.com/',
  headers: {
    // Authorization: 'Bearer {token}'
  }
})

export { HTTP as default }
