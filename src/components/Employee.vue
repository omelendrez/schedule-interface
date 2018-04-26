<template>
  <b-container class="employee">

    <h1>Empleado</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-card no-body>
        <b-tabs card v-model="tabIndex">
          <b-tab title="Info del empleado" active>

            <b-form-group horizontal id="badge" label="Legajo" label-for="badge">
              <b-form-input id="badge" v-model.trim="form.badge" required autofocus="true"></b-form-input>
            </b-form-group>

            <b-form-group horizontal id="first_name" label="Nombre" label-for="first_name">
              <b-form-input id="first_name" v-model.trim="form.first_name" required></b-form-input>
            </b-form-group>

            <b-form-group horizontal id="last_name" label="Apellido" label-for="last_name">
              <b-form-input id="last_name" v-model.trim="form.last_name" required></b-form-input>
            </b-form-group>

            <b-form-group horizontal id="joining_date" label="Fecha de ingreso" label-for="joining_date">
              <b-form-input id="joining_date" v-model="form.joining_date" type="date" required></b-form-input>
            </b-form-group>

            <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
              <b-form-select v-model="form.branch_id" :options="branches" class="mb-3" required/>
            </b-form-group>
          </b-tab>

          <b-tab title="Asignaciones">
            <b-form-group class="assignations">
              <b-form-checkbox-group stacked v-model="form.selectedPositions" :options="positions" />
            </b-form-group>
          </b-tab>

          <b-tab title="Bloqueo de días y horas" class="hours-tab">
            <b-row class="header m-1">
              <b-col cols="2">
                <label>Día</label>
              </b-col>
              <b-col cols="2" class="center">
                De
              </b-col>
              <b-col cols="2" class="center">
                A
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col cols="2">
                <label>Lunes</label>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_0_from"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_0_to"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col cols="2">
                <label>Martes</label>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_1_from"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_1_to"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col cols="2">
                <label>Miércoles</label>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_2_from"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_2_to"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col cols="2">
                <label>Jueves</label>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_3_from"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_3_to"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col cols="2">
                <label>Viernes</label>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_4_from"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_4_to"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col cols="2">
                <label>Sábado</label>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_5_from"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_5_to"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col cols="2">
                <label>Domingo</label>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_6_from"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-form-input type="text" v-model="form.fld_6_to"></b-form-input>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-card>

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
  name: 'Employee',
  data () {
    return {
      form: {
        id: 0,
        badge: '',
        first_name: '',
        last_name: '',
        joining_date: '',
        branch_id: 0,
        fld_0_from: '',
        fld_0_to: '',
        fld_1_from: '',
        fld_1_to: '',
        fld_2_from: '',
        fld_2_to: '',
        fld_3_from: '',
        fld_3_to: '',
        fld_4_from: '',
        fld_4_to: '',
        fld_5_from: '',
        fld_5_to: '',
        fld_6_from: '',
        fld_6_to: '',
        selectedPositions: []
      },
      errorShow: false,
      errorMessage: '',
      tabIndex: 0,
      show: true,
      fields: [
        {
          key: 'position',
          label: 'Función'
        },
        'assign'
      ]
    }
  },
  watch: {
    employee () {
      const avail = Store.state.employee.availabilities
      for (let i = 0; i < avail.length; i++) {
        const item = avail[i]
        const from = `fld_${item.week_day}_from`
        this.form[from] = item.from
        const to = `fld_${item.week_day}_to`
        this.form[to] = item.to
      }
      const pos = Store.state.employee.employee_positions
      for (let i = 0; i < pos.length; i++) {
        this.form.selectedPositions.push(pos[i].position_id)
      }
    },
    results () {
      // this.$router.push({ name: 'Employees' })
      this.$router.go(-1)
    }
  },
  computed: {
    employee () {
      return Store.state.employee
    },
    isLogged () {
      return Store.state.user.id
    },
    branches () {
      const branches = Store.state.branches.rows
      const options = []
      for (let i = 0; i < branches.length; i++) {
        options.push({
          value: branches[i].id,
          text: branches[i].name
        })
      }
      return options
    },
    item () {
      return Store.state.record
    },
    positions () {
      return Store.state.positionSector
    },
    results () {
      return Store.state.results
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.errorMessage = ''
      this.errorShow = false
      const form = this.form
      let formData = {}
      for (var prop in form) {
        if (form.hasOwnProperty(prop)) {
          const item = form[prop]
          if (item.length || prop === 'id' || prop === 'branch_id') {
            formData[prop] = item
          }
        }
      }
      if (!formData.selectedPositions) {
        this.tabIndex = 1
        this.errorMessage = 'Olvidaste las asingaciones!'
        this.errorShow = true
        return
      }
      Store.dispatch('SAVE_EMPLOYEE', formData)
    },
    onReset (evt) {
      evt.preventDefault()
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false
      this.$nextTick(() => {
        // this.$router.push({ name: 'Employees' })
        this.$router.go(-1)
      })
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    if (this.item) {
      this.form.id = this.item.id
      this.form.badge = this.item.badge
      this.form.first_name = this.item.first_name
      this.form.last_name = this.item.last_name
      this.form.joining_date = this.item.joining_date
      this.form.branch_id = this.item.branch_id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.employee {
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
  margin-top: 18px;
  margin-bottom: 18px;
}
.assignations {
  padding: 10px;
}
.hours-tab .header {
  font-weight: bold;
}
.hours-tab .header .center {
  text-align: center;
}
.hours-tab input {
  text-align: center;
}
</style>
