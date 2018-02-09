import HTTP from '../components/http-common'

export default {
  fetchUsers() {
    return HTTP.get('user')
  },
  login(payload) {
    return HTTP.get('login', { params: payload })
  }
}
