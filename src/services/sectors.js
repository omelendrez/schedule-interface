import API from './api'

export default {
  fetchSectors() {
    return API.get('sector')
  },
  saveSector(payload) {
    if (payload.id === 0) {
      return API.post('sector', payload)
    } else {
      return API.put(`sector/${payload.id}`, payload)
    }
  },
  deleteSector(payload) {
    return API.delete(`sector/${payload}`)
  }
}
