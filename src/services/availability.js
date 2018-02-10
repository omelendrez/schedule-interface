import HTTP from '../components/http-common'

export default {
  fetchAvailability() {
    return HTTP.get('availability')
  },
  saveAvailability(payload) {
    if (payload.id === 0) {
      return HTTP.post('availability', payload)
    } else {
      return HTTP.put(`availability/${payload.id}`, payload)
    }
  }
}
