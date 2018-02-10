import HTTP from '../components/http-common'

export default {
  fetchEmployees() {
    return HTTP.get('employee')
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
