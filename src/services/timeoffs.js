import API from './api'

export default {
  fetchTimeoffs() {
    return API.get('timeoff')
  },
  fetchAll() {
    return API.get('timeoff/all')
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
  findByDate(payload) {
    return API.get(`timeoff/${payload}/date`)
  },
  findByPeriod(payload) {
    return API.get(`timeoff/${payload.fromDate}/${payload.toDate}/${payload.absenteeismId}/${payload.sortBy}/period`)
  },
  deleteTimeoff(payload) {
    return API.delete(`timeoff/${payload}`)
  }
}
