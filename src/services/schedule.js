import API from './api'

export default {
  fetchBudgetSchedules(payload) {
    return API.get(`schedule/${payload.date}/budget/${payload.branch_id}`, payload)
  },
  fetchSchedule(payload) {
    return API.get(`schedule/${payload.date}/budget/${payload.branch_id}/schedule`, payload)
  },
  fetchTimeoff(payload) {
    return API.get(`schedule/${payload.budget_id}/timeoff`)
  },
  verifySchedule(payload) {
    return API.post('schedule/verify', payload)
  },
  saveSchedule(payload) {
    if (payload.id === 0) {
      return API.post('schedule', payload)
    } else {
      return API.put(`schedule/${payload.id}`, payload)
    }
  },
  deleteSchedule(payload) {
    return API.delete(`schedule/${payload}`)
  },
  getConsumedBySector(payload) {
    const { dateFrom, dateTo, branchId } = payload
    return API.get(`schedule/report1/${dateFrom}/${dateTo}/${branchId}`)
  },
  getBudgetVsConsumed() {
    return API.get('schedule/report2')
  }
}
