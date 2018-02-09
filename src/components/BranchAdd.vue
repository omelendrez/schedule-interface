<template>
  <b-container class="branch-add">
      <Header />
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

      <b-button type="submit" variant="primary">Guardar</b-button>
      <b-button type="reset" variant="info" class="to-right">Volver</b-button>

    </b-form>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";
export default {
  name: "BranchAdd",
  data() {
    return {
      form: {
        name: "",
        show: true
      }
    };
  },
  components: {
    Header
  },
  computed: {
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
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.name = "";
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Branches" });
      });
    }
  },
  created() {
    if (this.item) {
      this.form.name = this.item.name;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.branch-add {
  background-color: white;
  padding-bottom: 60px;
}
input {
  max-width: 40%;
}
.to-right {
  float: right;
}
</style>
