import HTTP from './http-common'

export default {
  fetchUsers() {
    return HTTP.get('user')
  },
  login(payload) {
    return HTTP.post('login', payload)
  },
  saveUser(payload) {
    if (payload.id === 0) {
      return HTTP.post('user', payload)
    } else {
      return HTTP.put(`user/${payload.id}`, payload)
    }
  },
  changePassword(payload) {
    return HTTP.put(`user/${payload.id}/password`, payload)
  },
  deleteUser(payload) {
    return HTTP.delete(`user/${payload}`)
  }
}
