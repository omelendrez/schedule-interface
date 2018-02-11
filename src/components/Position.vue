<template>
  <b-container class="position">
    <h1>Función</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

      <b-form-group horizontal id="sector_id" label="Sector" label-for="sector_id">
        <b-form-select v-model="form.sector_id" :options="sectors" class="mb-3" />
      </b-form-group>

      <b-form-group horizontal id="name" label="Nombre" label-for="name">
        <b-form-input id="name" v-model.trim="form.name"></b-form-input>
      </b-form-group>

      <b-form-group horizontal id="color" label="Color" label-for="color">
        <b-form-input id="color" type="color" v-model.trim="form.color"></b-form-input>
      </b-form-group>

      <div class="buttons">
        <b-button type="submit" variant="info">Guardar</b-button>
        <b-button type="reset" class="to-right">Volver</b-button>
      </div>

    </b-form>
  </b-container>
</template>

<script>
import Store from "../store/store";

export default {
  name: "Position",
  data() {
    return {
      form: {
        id: 0,
        name: "",
        color: "",
        sector_id: 0
      },
      show: true
    };
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
      this.show = false;
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
      this.form.color = this.item.color;
      this.form.sector_id = this.item.sector_id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.position {
  background-color: white;
  padding: 60px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
  padding-top: 40px;
}
.to-right {
  float: right;
}
.buttons {
  margin: 0 auto;
}
</style>
