import HTTP from './http-common'

export default {
  fetchStatus () {
    return HTTP.get('status')
  }
}
