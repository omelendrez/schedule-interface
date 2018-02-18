import HTTP from '../components/http-common'

export default {
  fetchEmployees() {
    return HTTP.get('employee')
  },
  fetchEmployee(payload) {
    return HTTP.get(`employee/${payload.id}`)
  },
  fetchBranchEmployees(payload) {
    return HTTP.get(`employee/${payload.branch_id}/branch`, payload)
  },
  saveEmployee(payload) {
    if (payload.id === 0) {
      return HTTP.post("employee", payload);
    } else {
      return HTTP.put(`employee/${payload.id}`, payload);
    }
  },
  deleteEmployee(payload) {
    return HTTP.delete(`employee/${payload}`);
  }
}
