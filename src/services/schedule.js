import HTTP from '../components/http-common'

export default {
  fetchSchedules() {
    return HTTP.get('schedule')
  },
  fetchBudgetSchedules(payload) {
    return HTTP.get(`schedule/${payload.date}/budget/${payload.branch_id}`, payload)
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
  }
}
