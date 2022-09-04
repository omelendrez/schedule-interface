import API from './api'

export default {
  fetchStatus() {
    return API.get('status')
  }
}
