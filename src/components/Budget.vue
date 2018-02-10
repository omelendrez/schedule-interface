<template>
  <b-container class="budget">
    <h1>Presupuesto</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
        <b-form-select v-model="form.branch_id" :options="branches"/>
      </b-form-group>
      <b-form-group horizontal id="date" label="Día" label-for="date">
        <b-form-input id="date" type="date" v-model.trim="form.date"></b-form-input>
      </b-form-group>
      <b-form-group horizontal id="hours" label="Horas" label-for="hours">
        <b-form-input id="hours" v-model.trim="form.hours"></b-form-input>
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
  name: "Budget",
  data() {
    return {
      form: {
        id: 0,
        date: "",
        hours: 0,
        branch_id: 0
      },
      show: true
    };
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    item() {
      return Store.state.record;
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
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("SAVE_BUDGET", this.form);
      setTimeout(() => {
        this.$router.push({ name: "Budgets" });
      }, 500);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Budgets" });
      });
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_BRANCHES");
    if (this.item) {
      this.form.id = this.item.id;
      this.form.date = this.item._date;
      this.form.hours = this.item.hours;
      this.form.branch_id = this.item.branch_id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.budget {
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
