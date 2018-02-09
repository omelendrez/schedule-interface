import HTTP from '../components/http-common'

export default {
  fetchPositions () {
    return HTTP.get('position')
  }
}
