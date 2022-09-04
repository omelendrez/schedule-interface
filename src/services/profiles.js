import API from './api'

export default {
  fetchProfiles() {
    return API.get('profile')
  }
}
