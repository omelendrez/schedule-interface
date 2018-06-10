import HTTP from '../components/http-common'

export default {
  fetchAbsenteeisms () {
    return HTTP.get('absenteeism')
  },
  saveAbsenteeism (payload) {
    if (payload.id === 0) {
      return HTTP.post('absenteeism', payload)
    } else {
      return HTTP.put(`absenteeism/${payload.id}`, payload)
    }
  },
  deleteAbsenteeism (payload) {
    return HTTP.delete(`absenteeism/${payload}`)
  }
}
