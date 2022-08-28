<template>
  <b-container class="user">
    <h1>Usuario</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="form.show" id="addForm">
      <b-form-group horizontal id="user_name" label="Nombre de usuario" label-for="user_name">
        <b-form-input id="user_name" v-model.trim="form.user_name" required></b-form-input>
      </b-form-group>
      <b-form-group horizontal id="full_name" label="Nombre completo" label-for="full_name">
        <b-form-input id="full_name" v-model.trim="form.full_name" required></b-form-input>
      </b-form-group>
      <b-form-group horizontal id="profile_id" label="Perfil" label-for="profile_id">
        <b-form-select v-model="form.profile_id" :options="profiles" class="mb-3" required />
      </b-form-group>
      <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
        <b-form-select v-model="form.branch_id" :options="branches" class="mb-3" required />
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
  name: 'User',
  data() {
    return {
      form: {
        id: 0,
        user_name: '',
        full_name: '',
        profile_id: 0,
        branch_id: 0,
        show: true
      },
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
      this.$router.push({ name: 'Users' })
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    profiles() {
      const profiles = Store.state.profiles.rows
      const options = []
      for (let i = 0; i < profiles.length; i++) {
        options.push({
          value: profiles[i].id,
          text: profiles[i].name
        })
      }
      return options
    },
    branches() {
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
    item() {
      return Store.state.record
    },
    state() {
      return this.form.user_name.length >= 6
    },
    invalidFeedback() {
      if (this.form.user_name.length > 6) {
        return ''
      }
      if (this.form.user_name.length > 0) {
        return 'Ingrese al menos 6 caracteres'
      }
    },
    validFeedback() {
      return this.state ? 'Válido' : ''
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Store.dispatch('SAVE_USER', this.form)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.user_name = ''
      this.form.full_name = ''
      this.form.profile_id = 0
      this.form.branch_id = 0
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false
      this.$nextTick(() => {
        this.$router.push({ name: 'Users' })
      })
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    if (this.item) {
      this.form.id = this.item.id
      this.form.user_name = this.item.user_name
      this.form.full_name = this.item.full_name
      this.form.profile_id = this.item.profile_id
      this.form.branch_id = this.item.branch_id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
