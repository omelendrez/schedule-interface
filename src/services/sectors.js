import HTTP from '../components/http-common'

export default {
  fetchSectors () {
    return HTTP.get('sector')
  }
}
