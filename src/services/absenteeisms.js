import API from './api'

export default {
  fetchAbsenteeisms() {
    return API.get('absenteeism')
  },
  saveAbsenteeism(payload) {
    if (payload.id === 0) {
      return API.post('absenteeism', payload)
    } else {
      return API.put(`absenteeism/${payload.id}`, payload)
    }
  },
  deleteAbsenteeism(payload) {
    return API.delete(`absenteeism/${payload}`)
  }
}
