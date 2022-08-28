<template>
  <b-container class="login">
    <Header />
    <b-card no-block id="loginCard">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="loginForm">
        <b-form-group>
          <b-form-input id="user_name" type="text" v-model="form.user_name" required autoFocus="true"
            autocomplete="username" placeholder="Usuario">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input id="password" type="password" v-model="form.password" required autocomplete="current-password"
            placeholder="Password">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="info">Login</b-button>
        <b-button type="reset">Reset</b-button>
      </b-form>
      <b-alert variant="danger" :show="isLoginError">Credenciales incorrectas</b-alert>
      <b-alert variant="success" :show="isLoginCorrect">Autorizado</b-alert>
    </b-card>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_name: '',
        password: ''
      },
      show: true,
      isLoginError: false,
      isLoginCorrect: false
    }
  },
  components: {
    Header
  },
  watch: {
    user: function () {
      const user = Store.state.user
      if (user.id === null) {
        return
      }
      if (user.id > 0) {
        this.isLoginCorrect = true
        this.$router.push({ name: 'Home' })
      } else {
        this.isLoginError = true
      }
    }
  },
  computed: {
    user() {
      return Store.state.user
    }
  },
  methods: {
    onSubmit(evt) {
      this.isLoginError = false
      evt.preventDefault()
      const payload = {
        user_name: this.form.user_name,
        password: this.form.password
      }
      Store.dispatch('LOGIN', payload)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.user_name = ''
      this.form.password = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  isLogged() {
    return Store.state.user.id
  },
  created() {
    Store.dispatch('LOGOUT_USER')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 400px;
}
</style>
