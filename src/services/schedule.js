import HTTP from './http-common'

export default {
  fetchBudgetSchedules(payload) {
    return HTTP.get(`schedule/${payload.date}/budget/${payload.branch_id}`, payload)
  },
  fetchSchedule(payload) {
    return HTTP.get(`schedule/${payload.date}/budget/${payload.branch_id}/schedule`, payload)
  },
  fetchTimeoff(payload) {
    return HTTP.get(`schedule/${payload.budget_id}/timeoff`)
  },
  verifySchedule(payload) {
    return HTTP.post('schedule/verify', payload)
  },
  saveSchedule(payload) {
    if (payload.id === 0) {
      return HTTP.post('schedule', payload)
    } else {
      return HTTP.put(`schedule/${payload.id}`, payload)
    }
  },
  deleteSchedule(payload) {
    return HTTP.delete(`schedule/${payload}`)
  },
  getConsumedBySector(payload) {
    const { dateFrom, dateTo, branchId } = payload
    return HTTP.get(`schedule/report1/${dateFrom}/${dateTo}/${branchId}`)
  },
  getBudgetVsConsumed() {
    return HTTP.get('schedule/report2')
  }
}
