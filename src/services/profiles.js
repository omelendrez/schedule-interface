import HTTP from '../components/http-common'

export default {
  fetchProfiles () {
    return HTTP.get('profile')
  }
}
