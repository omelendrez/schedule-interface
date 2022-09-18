import API from './api'

export default {
  fetchTimeoffs(payload) {
    const { from, to } = payload
    return API.get(`timeoff?date_from=${from}&date_to=${to}`)
  },
  fetchAllByDate(date) {
    return API.get(`timeoff/all?date=${date}`)
  },
  saveTimeoff(payload) {
    if (payload.id === 0) {
      return API.post('timeoff', payload)
    } else {
      return API.put(`timeoff/${payload.id}`, payload)
    }
  },
  findByEmployee(payload) {
    return API.get(`timeoff/${payload}/employee`)
  },
  findByDate(date) {
    return API.get(`timeoff/${date}/date`)
  },
  findByPeriod({ fromDate, toDate, absenteeismId, sortBy }) {
    return API.get(`timeoff/${fromDate}/${toDate}/${absenteeismId}/${sortBy}/period`)
  },
  deleteTimeoff(payload) {
    return API.delete(`timeoff/${payload}`)
  }
}
