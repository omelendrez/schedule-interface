import HTTP from '../components/http-common'

export default {
  fetchPositions () {
    return HTTP.get('position')
  },
  savePosition (payload) {
    if (payload.id === 0) {
      return HTTP.post('position', payload)
    } else {
      return HTTP.put(`position/${payload.id}`, payload)
    }
  },
  fetchSectorPositions (payload) {
    return HTTP.get(`position/${payload.sector_id}/sector`, payload)
  },
  fetchPositionSector () {
    return HTTP.get('position/sector')
  },
  deletePosition (payload) {
    return HTTP.delete(`position/${payload}`)
  }
}
