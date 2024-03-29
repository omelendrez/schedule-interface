<template>
  <b-container class="timeoff">
    <h1>Ausencia</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-form-group horizontal id="employee_id" label="Empleado" label-for="employee_id">
        <b-form-select v-model="form.employee_id" :options="employeesOptions" class="mb-3" required />
      </b-form-group>
      <b-form-group horizontal id="absenteeism_id" label="Type de Ausentismo" label-for="absenteeism_id">
        <b-form-select v-model="form.absenteeism_id" :options="absenteeismsOptions" class="mb-3" required />
      </b-form-group>
      <b-form-group horizontal label="Desde Fecha" label-for="dateFrom">
        <b-form-input id="dateFrom" type="date" v-model="form.dateFrom" :disabled="dateChangeBlocked" required>
        </b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Hasta Fecha" label-for="dateTo">
        <b-form-input id="dateTo" type="date" v-model="form.dateTo" :disabled="dateChangeBlocked" required>
        </b-form-input>
      </b-form-group>
      <div class="buttons">
        <b-button type="submit" variant="info" class="to-right">Guardar</b-button>
        <b-button type="reset">Volver</b-button>
      </div>
      <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>
    </b-form>
    <b-modal v-model="warningShow" header-bg-variant="info" title="Aviso" header-text-variant="light" centered
      @ok="handleOk" ok-title="Si. Continuar" cancel-title="No. Dejar como está" cancel-variant="danger">
      <strong>{{ warningMessage }}.</strong> Querés continuar?
    </b-modal>
  </b-container>
</template>

<script>
import Store from '../store/store'

export default {
  name: 'Timeoff',
  data() {
    return {
      form: {
        id: 0,
        employee_id: 0,
        absenteeism_id: 0,
        dateFrom: '',
        dateTo: ''
      },
      dateChangeBlocked: true,
      employeesOptions: [],
      absenteeismsOptions: [],
      show: true,
      forced: false,
      warningShow: false,
      warningMessage: '',
      errorShow: false,
      errorMessage: ''
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        this.errorMessage = results.message
        this.errorShow = true
        return
      }
      if (results.warning) {
        this.warningMessage = results.message
        this.warningShow = true
        return
      }
      this.forced = false
      this.errorMessage = ''
      this.errorShow = false
      this.$router.push({ name: 'Timeoffs' })
    },
    employees() {
      // Only active
      const options = this.employees.rows
        .filter((e) => e.status_id === 1)
        .map((e) => ({
          value: e.id,
          text: `${e.last_name}, ${e.first_name}`
        }))
      this.employeesOptions = options
    },
    absenteeisms() {
      // Only active
      const options = this.absenteeisms.rows
        .filter((a) => a.status_id === 1)
        .map((a) => ({
          value: a.id,
          text: a.name
        }))
      this.absenteeismsOptions = options
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    employees() {
      return Store.state.employees
    },
    absenteeisms() {
      return Store.state.absenteeisms
    },
    item() {
      return Store.state.record
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.errorMessage = ''
      this.errorShow = false
      if (this.form.dateFrom > this.form.dateTo) {
        this.errorMessage = 'Fecha final no puede ser anterior a fecha inicial'
        this.errorShow = true
        return
      }
      this.saveData()
    },
    increaseDate(date) {
      const arrayDate = date.split('-')
      let year = parseInt(arrayDate[0])
      let month = parseInt(arrayDate[1])
      let day = parseInt(arrayDate[2])
      day++
      switch (month) {
        case 2:
          if ((year % 4 === 0) && (year % 100 !== 0)) {
            if (day > 29) {
              day = 1
              month++
            }
          } else {
            if (day > 28) {
              day = 1
              month++
            }
          }
          break
        case 4:
        case 6:
        case 9:
        case 11:
          if (day > 30) {
            day = 1
            month++
          }
          break
        default:
          if (day > 31) {
            day = 1
            month++
          }
      }
      if (month > 12) {
        month = 1
        year++
      }
      let newDate = ''
      newDate = `${year.toString()}`
      newDate += month.toString().length === 1 ? '-0' + month.toString() : '-' + month.toString()
      newDate += day.toString().length === 1 ? '-0' + day.toString() : '-' + day.toString()
      return newDate
    },
    saveTimeoff(data) {
      Store.dispatch('SAVE_TIMEOFF', data)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.employee_id = 0
      this.form.dateFrom = ''
      this.form.dateTo = ''
      this.form.absenteeism_id = 0
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.$router.push({ name: 'Timeoffs' })
      })
    },
    cleanError() {
      this.errorShow = false
      this.errorMsg = ''
    },
    saveData() {
      let initialDate = this.form.dateFrom
      const finalDate = this.form.dateTo
      while (initialDate <= finalDate) {
        const data = {
          id: this.form.id,
          employee_id: this.form.employee_id,
          absenteeism_id: this.form.absenteeism_id,
          date: initialDate,
          forced: this.forced
        }
        this.saveTimeoff(data)
        initialDate = this.increaseDate(initialDate)
      }
    },
    handleOk() {
      this.forced = true
      this.saveData()
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('LOAD_EMPLOYEES')
    Store.dispatch('LOAD_ABSENTEEISMS')
    if (this.item) {
      this.dateChangeBlocked = this.item.id !== 0
      this.form.id = this.item.id
      this.form.employee_id = this.item.employee_id
      this.form.absenteeism_id = this.item.absenteeism_id
      this.form.dateFrom = this.item._date
      this.form.dateTo = this.item._date
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
