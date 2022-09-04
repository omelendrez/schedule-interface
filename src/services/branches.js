import API from './api'

export default {
  fetchBranches() {
    return API.get('branch')
  },
  saveBranch(payload) {
    if (payload.id === 0) {
      return API.post('branch', payload)
    } else {
      return API.put(`branch/${payload.id}`, payload)
    }
  },
  deleteBranch(payload) {
    return API.delete(`branch/${payload}`)
  }
}
