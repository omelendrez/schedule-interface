<template>
  <b-container class="timeoff">
    <h1>Francos</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

      <b-form-group horizontal id="employee_id" label="Empleado" label-for="employee_id">
        <b-form-select v-model="form.employee_id" :options="employeesOptions" class="mb-3" required/>
      </b-form-group>

      <b-form-group horizontal label="Día" label-for="date">
        <b-form-input id="date" type="date" v-model="form.date" required></b-form-input>
      </b-form-group>

      <div class="buttons">
        <b-button type="submit" variant="info">Guardar</b-button>
        <b-button type="reset" class="to-right">Volver</b-button>
      </div>

      <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>

    </b-form>
  </b-container>
</template>

<script>
import Store from '../store/store'

export default {
  name: 'Timeoff',
  data () {
    return {
      form: {
        id: 0,
        employee_id: 0,
        date: ''
      },
      employeesOptions: [],
      show: true,
      errorShow: false,
      errorMessage: ''
    }
  },
  watch: {
    results () {
      const results = Store.state.results
      if (results.error) {
        this.errorMessage = results.message
        this.errorShow = results.error
        return
      }
      this.$router.push({ name: 'Timeoffs' })
    },
    employees () {
      const employees = this.employees.rows
      const options = []
      for (let i = 0; i < employees.length; i++) {
        options.push({
          value: employees[i].id,
          text:
            employees[i].badge +
            ' - ' +
            employees[i].first_name +
            ' ' +
            employees[i].last_name
        })
      }
      this.employeesOptions = options
    }
  },
  computed: {
    results () {
      return Store.state.results
    },
    isLogged () {
      return Store.state.user.id
    },
    employees () {
      return Store.state.employees
    },
    item () {
      return Store.state.record
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      Store.dispatch('SAVE_TIMEOFF', this.form)
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.employee_id = 0
      this.form.date = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.$router.push({ name: 'Timeoffs' })
      })
    },
    cleanError () {
      this.errorShow = false
      this.errorMsg = ''
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('LOAD_EMPLOYEES')
    if (this.item) {
      this.form.id = this.item.id
      this.form.employee_id = this.item.employee_id
      this.form.date = this.item._date
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeoff {
  background-color: white;
  padding: 60px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
  padding-top: 40px;
}
.to-right {
  float: right;
}
.buttons {
  margin: 0 auto;
  margin-bottom: 18px;
}
</style>
