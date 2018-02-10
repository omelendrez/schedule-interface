<template>
  <b-container class="branch">
    <h1>Local</h1>
  <b-form @submit="onSubmit" @reset="onReset" v-if="form.show" id="addForm">
  <b-form-group
      id="name"
      description="Ingrese el nombre del local."
      label="Nombre"
      label-for="name"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
  >
  <b-form-input id="name" :state="state" v-model.trim="form.name"></b-form-input>
  </b-form-group>

      <b-button type="submit" variant="info">Guardar</b-button>
      <b-button type="reset" class="to-right">Volver</b-button>

    </b-form>
  </b-container>
</template>

<script>
import Store from "../store/store";

export default {
  name: "Branch",
  data() {
    return {
      form: {
        name: "",
        id: 0,
        show: true
      }
    };
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    item() {
      return Store.state.record;
    },
    state() {
      return this.form.name.length >= 4;
    },
    invalidFeedback() {
      if (this.form.name.length > 4) {
        return "";
      }
      if (this.form.name.length > 0) {
        return "Ingrese al menos 4 caracteres";
      }
    },
    validFeedback() {
      return this.state ? "Válido" : "";
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("SAVE_BRANCH", this.form);
      setTimeout(() => {
        this.$router.push({ name: "Branches" });
      }, 500);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Branches" });
      });
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    if (this.item) {
      this.form.name = this.item.name;
      this.form.id = this.item.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.branch {
  background-color: white;
  padding: 60px;
}
input {
  max-width: 40%;
}
.to-right {
  float: right;
}
</style>
