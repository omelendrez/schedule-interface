<template>
  <b-card no-block id="addCard">
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

      <b-button type="submit">Guardar</b-button>
      <b-button type="reset">Volver</b-button>

    </b-form>
  </b-card>
</template>

<script>
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
  computed: {
    state() {
      return this.form.name.length >= 4;
    },
    invalidFeedback() {
      if (this.form.name.length > 4) {
        return "";
      }
      if (this.form.name.length > 0) {
        return "Ingrese al menos 4 letras";
      }
    },
    validFeedback() {
      return this.state ? "Correcto" : "";
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#addCard {
  top: 100px;
  margin: 0 auto;
  max-width: 60%;
  background-color: white;
}
#addForm {
  padding: 10px;
}
</style>
