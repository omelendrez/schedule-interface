import API from './api'

export default {
  fetchEmployees() {
    return API.get('employee')
  },
  fetchEmployee(payload) {
    return API.get(`employee/${payload.id}`)
  },
  fetchBranchEmployees(payload) {
    return API.get(`employee/${payload.branch_id}/branch`, payload)
  },
  fetchEmployeesByPosition(payload) {
    return API.get(`employee_position/${payload.value}/position`, payload)
  },
  saveEmployee(payload) {
    if (payload.id === 0) {
      return API.post('employee', payload)
    } else {
      return API.put(`employee/${payload.id}`, payload)
    }
  },
  deleteEmployee(payload) {
    return API.delete(`employee/${payload}`)
  }
}
