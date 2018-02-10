<template>
  <b-container class="employee">

    <h1>Empleado</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

    <b-form-group horizontal id="badge" label="Legajo" label-for="badge">
      <b-form-input id="badge" v-model.trim="form.badge"></b-form-input>
    </b-form-group>

    <b-form-group horizontal id="first_name" label="Nombre" label-for="first_name">
      <b-form-input id="first_name" v-model.trim="form.first_name"></b-form-input>
    </b-form-group>

    <b-form-group horizontal id="last_name" label="Apellido" label-for="last_name">
      <b-form-input id="last_name" v-model.trim="form.last_name"></b-form-input>
    </b-form-group>

    <b-form-group horizontal id="joining_date" label="Fecha de ingreso" label-for="joining_date">
      <b-form-input id="joining_date" v-model.trim="form.joining_date" type="date"></b-form-input>
    </b-form-group>

    <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
      <b-form-select  v-model="form.branch_id" :options="branches" class="mb-3"  />
    </b-form-group>

    <b-form-group horizontal id="sector_id" label="Sector" label-for="sector_id">
      <b-form-select v-model="form.sector_id" :options="sectors" class="mb-3" @change="updateChild" />
    </b-form-group>

    <b-form-group horizontal id="position_id" label="Función" label-for="position_id">
      <b-form-select v-model="form.position_id" :options="filteredPositions" class="mb-3" />
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
  name: "Employee",
  data() {
    return {
      form: {
        id: 0,
        badge: "",
        first_name: "",
        last_name: "",
        sector_id: 0,
        position_id: 0,
        joining_date: "",
        branch_id: 0
      },
      filteredPositions: [],
      show: true
    };
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    branches() {
      const branches = Store.state.branches.rows;
      const options = [];
      for (let i = 0; i < branches.length; i++) {
        options.push({
          value: branches[i].id,
          text: branches[i].name
        });
      }
      return options;
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
    updateChild() {
      this.$nextTick(() => {
        const positions = Store.state.positions.rows;
        const options = [];
        for (let i = 0; i < positions.length; i++) {
          if (positions[i].sector_id === this.form.sector_id) {
            options.push({
              value: positions[i].id,
              text: positions[i].name
            });
          }
        }
        this.filteredPositions = options;
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("SAVE_EMPLOYEE", this.form);
      setTimeout(() => {
        this.$router.push({ name: "Employees" });
      }, 500);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Employees" });
      });
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    if (this.item) {
      this.form.id = this.item.id;
      this.form.badge = this.item.badge;
      this.form.first_name = this.item.first_name;
      this.form.last_name = this.item.last_name;
      this.form.sector_id = this.item.sector_id;
      this.form.position_id = this.item.position_id;
      this.form.joining_date = this.item.joining_date;
      this.form.branch_id = this.item.branch_id;
      this.updateChild();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.employee {
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
