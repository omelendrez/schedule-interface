import HTTP from '../components/http-common'

export default {
  fetchStatus () {
    return HTTP.get('status')
  }
}
