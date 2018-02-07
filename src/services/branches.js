import HTTP from '../components/http-common'

export default {
  fetchBranches () {
    return HTTP.get('branch')
  }
}
