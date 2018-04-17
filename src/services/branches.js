import HTTP from '../components/http-common'

export default {
  fetchBranches () {
    return HTTP.get('branch')
  },
  saveBranch (payload) {
    if (payload.id === 0) {
      return HTTP.post('branch', payload)
    } else {
      return HTTP.put(`branch/${payload.id}`, payload)
    }
  },
  deleteBranch (payload) {
    return HTTP.delete(`branch/${payload}`)
  }
}
