<template>
  <b-container class="budget">
    <h1>Cambiar password</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-form-group
        label="Usuario"
        label-for="user_name">
        <b-form-input
          id="user_name"
          type="text"
          autocomplete="username"
          readonly="readonly"
          v-model.trim="form.user_name">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Password actual"
        label-for="password_current"
        :valid-feedback="pwdValidFeedback"
        :invalid-feedback="pwdInvalidFeedback"
        :state="pwdState">
        <b-form-input
          id="password_current"
          type="password"
          autofocus="true"
          autocomplete="current-password"
          description="Escriba la password que usted usa actualmente para ingresar esta aplicación"
          v-model.trim="form.password_current"
          placeholder="Escriba aquí su password actual"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Nueva password"
        label-for="password_new"
        :valid-feedback="newValidFeedback"
        :invalid-feedback="newInvalidFeedback"
        :state="newState">
        <b-form-input
          id="password_new"
          type="password"
          autocomplete="new-password"
          description="Entre su nueva password"
          v-model.trim="form.password_new"
          placeholder="Escriba aquí la nueva password"
          required>
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Confirme password"
        label-for="password_retype"
        :valid-feedback="retValidFeedback"
        :invalid-feedback="retInvalidFeedback"
        :state="retState">
        <b-form-input
          id="password_retype"
          type="password"
          autocomplete="new-password"
          v-model.trim="form.password_retype"
          placeholder="Repita aquí la nueva password"
          required>
        </b-form-input>
      </b-form-group>

      <div class="buttons">
        <b-button type="submit" :disabled="!allOk" variant="info">Cambiar</b-button>
        <b-button type="reset" class="to-center">Reset</b-button>
        <b-button href="#/" class="to-right" variant="danger">Salir</b-button>
      </div>

      <b-alert variant="danger" :show="showError">{{ errorMessage }}</b-alert>
      <b-alert variant="success" :show="showMessage">{{ userMessage }}</b-alert>

    </b-form>
  </b-container>
</template>

<script>
import Store from "../store/store";
import { setTimeout } from "timers";

export default {
  name: "ChangePassword",
  data() {
    return {
      form: {
        user_name: Store.state.user.user_name,
        password_current: "",
        password_new: "",
        password_retype: "",
        id: Store.state.user.id
      },
      show: true,
      showError: false,
      errorMessage: "",
      showMessage: false,
      userMessage: ""
    };
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    pwdState() {
      return this.form.password_current.length > 0;
    },
    pwdValidFeedback() {
      return this.pwdState ? "Ok" : "";
    },
    pwdInvalidFeedback() {
      return this.pwdState ? "" : "Entre su password";
    },
    newState() {
      return this.form.password_new.length >= 6;
    },
    newValidFeedback() {
      return this.newState ? "Ok" : "";
    },
    newInvalidFeedback() {
      return this.newState ? "" : "Mínimo 6 caracteres";
    },
    retState() {
      return (
        this.form.password_retype === this.form.password_new &&
        this.form.password_retype.length > 0
      );
    },
    retValidFeedback() {
      return this.retState ? "Ok" : "";
    },
    retInvalidFeedback() {
      return this.retState
        ? ""
        : "La confirmación password debe con la nueva password";
    },
    allOk() {
      return this.newState && this.pwdState && this.retState;
    },
    password() {
      return Store.state.password;
    }
  },
  watch: {
    password() {
      const password = Store.state.password;
      if (password.msg) {
        this.errorMessage = password.msg;
        this.showError = true;
      } else {
        this.userMessage = "Password modificada con éxito";
        this.showMessage = true;
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 2000);
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("CHANGE_PASSWORD", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.form.password_current = "";
      this.form.password_new = "";
      this.form.password_retype = "";
      this.show = true;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.budget {
  background-color: white;
  padding: 60px;
  width: 600px;
}
#addForm {
  margin: 0 auto;
  padding-top: 40px;
}
.to-right {
  float: right;
}
.to-center {
  margin: 0 auto;
}
.buttons {
  margin-bottom: 20px;
}
</style>
