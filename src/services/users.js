import API from './api'

export default {
  fetchUsers() {
    return API.get('user')
  },
  login(payload) {
    return API.post('login', payload)
  },
  saveUser(payload) {
    if (payload.id === 0) {
      return API.post('user', payload)
    } else {
      return API.put(`user/${payload.id}`, payload)
    }
  },
  changePassword(payload) {
    return API.put(`user/${payload.id}/password`, payload)
  },
  deleteUser(payload) {
    return API.delete(`user/${payload}`)
  }
}
