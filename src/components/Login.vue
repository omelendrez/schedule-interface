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

      <b-button type="submit">Login</b-button>
      <b-button type="reset">Reset</b-button>
    </b-form>
    <b-alert variant="danger" :show="isLoginError">Credenciales incorrectas</b-alert>
    <b-alert variant="success" :show="isLoginCorrect">Autorizado</b-alert>
  </b-card>
</template>

<script>
import Store from "../store/store";
import { setTimeout } from "timers";

export default {
  name: "Login",
  data() {
    return {
      form: {
        user_name: "",
        password: ""
      },
      show: true,
      isLoginError: false,
      isLoginCorrect: false
    };
  },
  methods: {
    onSubmit(evt) {
      this.isLoginError = false;
      const self = this;
      evt.preventDefault();
      const payload = {
        user_name: this.form.user_name,
        password: this.form.password
      };
      Store.dispatch("LOGIN", payload);
      setTimeout(() => {
        if (Store.state.user.id) {
          this.isLoginCorrect = true;
          setTimeout(() => {
            self.$router.push({ name: "Home" });
          }, 800);
        } else {
          this.isLoginError = true;
        }
      }, 500);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.user_name = "";
      this.form.password = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  created() {
    Store.dispatch("LOGOUT_USER");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginCard {
  top: 100px;
  margin: 0 auto;
  max-width: 400px;
}
#loginForm {
  padding: 10px;
}
</style>
