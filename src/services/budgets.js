import HTTP from '../components/http-common'

export default {
  fetchBudgets () {
    return HTTP.get('budget')
  },
  saveBudget (payload) {
    if (payload.id === 0) {
      return HTTP.post('budget', payload)
    } else {
      return HTTP.put(`budget/${payload.id}`, payload)
    }
  },
  deleteBudget (payload) {
    return HTTP.delete(`budget/${payload}`)
  },
  weekdays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
}
