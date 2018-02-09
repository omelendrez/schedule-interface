<template>
  <b-container class="position-add">
    <Header />
    <h1>Función</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="form.show" id="addForm">

      <b-form-group id="sector_id" description="Seleccione el sector." label="Sector" label-for="sector_id">
        <b-form-select v-model="form.sector_id" :options="sectors" class="mb-3" />
      </b-form-group>

      <b-form-group id="name" description="Ingrese el nombre de la función." label="Nombre" label-for="name" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
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
  name: "PositionAdd",
  data() {
    return {
      form: {
        id: 0,
        name: "",
        sector_id: 0,
        show: true
      }
    };
  },
  components: {
    Header
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    sectors() {
      const sectors = Store.state.sectors.rows;
      const options = [];
      for (let i = 0; i < sectors.length; i++) {
        options.push({
          value: sectors[i].id,
          text: sectors[i].name
        });
      }
      return options;
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
      Store.dispatch("SAVE_POSITION", this.form);
      setTimeout(() => {
        this.$router.push({ name: "Positions" });
      }, 500);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.name = "";
      this.form.sector_id = 0;
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Positions" });
      });
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_SECTORS");
    if (this.item) {
      this.form.id = this.item.id;
      this.form.name = this.item.name;
      this.sector_id = this.item.sector_id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.position-add {
  background-color: white;
  padding-bottom: 60px;
}
input,
select {
  max-width: 40%;
}
.to-right {
  float: right;
}
</style>
