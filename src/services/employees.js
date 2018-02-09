import HTTP from '../components/http-common'

export default {
  fetchEmployees () {
    return HTTP.get('employee')
  }
}
