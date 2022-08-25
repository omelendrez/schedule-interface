import HTTP from './http-common'

export default {
  fetchProfiles () {
    return HTTP.get('profile')
  }
}
