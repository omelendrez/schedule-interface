<template>
  <b-card no-block id="loginCard">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="loginForm">
      <b-form-group>
        <b-form-input id="user_name"
                      type="text"
                      v-model="form.user_name"
                      required
                      autocomplete="false"
                      placeholder="Usuario">
        </b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required
                      autocomplete="false"
                      placeholder="Password">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        user_name: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginCard {
  top: 100px;
  margin: 0 auto;
  max-width: 400px;
  background-color:#b2cecf;
}
#loginForm {
  padding: 10px;
}
</style>
