<template>
  <b-container class="budget">
    <h1>Presupuesto</h1>
    <div class="text-right mb-4">
      <b-btn variant="primary" @click.stop="goProgram">Programa</b-btn>
      <b-btn variant="success" @click.stop="goGrid">Grilla</b-btn>
    </div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
        <b-form-select v-model="form.branch_id" :options="branches" required />
      </b-form-group>
      <b-form-group horizontal id="date" label="Día" label-for="date">
        <b-form-input id="date" type="date" v-model.trim="form.date" required></b-form-input>
      </b-form-group>
      <b-form-group horizontal id="hours" label="Horas" label-for="hours">
        <b-form-input id="hours" v-model.trim="form.hours" required></b-form-input>
      </b-form-group>
      <b-form-group horizontal id="footer" label="Mensaje" label-for="footer">
        <b-form-textarea id="footer" v-model="form.footer"
          placeholder="Escriba el mensaje que quiere mostrar al pie de la Grilla de programación" :rows="3"
          :max-rows="6"></b-form-textarea>
      </b-form-group>
      <div class="buttons">
        <b-button type="submit" variant="primary">Guardar</b-button>
        <b-button type="reset" class="to-right">Volver</b-button>
      </div>
      <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>
    </b-form>
  </b-container>
</template>

<script>
import Store from '../store/store'

export default {
  name: 'Budget',
  data() {
    return {
      form: {
        id: 0,
        date: '',
        weekday: null,
        hours: 0,
        branch_id: 0,
        footer: ''
      },
      show: true,
      errorShow: false,
      errorMessage: ''
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        this.errorMessage = results.message
        this.errorShow = results.error
        return
      }
      this.$router.push({ name: 'Budgets' })
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    item() {
      return Store.state.record
    },
    branches() {
      // Only active
      const branches = Store.state.branches.rows
      const options = branches
        .filter((b) => b.status_id === 1)
        .map((b) => ({
          value: b.id,
          text: b.name
        }))
      return options
    }
  },
  methods: {
    goProgram() {
      this.$router.push({ name: 'Program' })
    },
    goGrid() {
      this.$router.push({ name: 'Grid' })
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.form.footer = this.form.footer ? this.form.footer : ''
      Store.dispatch('SAVE_BUDGET', this.form)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.$router.push({ name: 'Budgets' })
      })
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('LOAD_BRANCHES')
    if (this.item) {
      this.form.id = this.item.id
      this.form.date = this.item._date
      this.form.weekday = this.item.weekday
      this.form.hours = this.item.hours
      this.form.footer = this.item.footer
      this.form.branch_id = this.item.branch_id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
