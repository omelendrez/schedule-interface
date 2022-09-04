import API from './api'

export default {
  fetchBudgets() {
    return API.get('budget')
  },
  saveBudget(payload) {
    if (payload.id === 0) {
      return API.post('budget', payload)
    } else {
      return API.put(`budget/${payload.id}`, payload)
    }
  },
  deleteBudget(payload) {
    return API.delete(`budget/${payload}`)
  },
  weekdays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
}
