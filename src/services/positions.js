import API from './api'

export default {
  fetchPositions() {
    return API.get('position')
  },
  savePosition(payload) {
    if (payload.id === 0) {
      return API.post('position', payload)
    } else {
      return API.put(`position/${payload.id}`, payload)
    }
  },
  fetchSectorPositions(payload) {
    return API.get(`position/${payload.sector_id}/sector`, payload)
  },
  fetchPositionSector() {
    return API.get('position/sector')
  },
  deletePosition(payload) {
    return API.delete(`position/${payload}`)
  }
}
