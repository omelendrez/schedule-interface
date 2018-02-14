<template>
  <b-container class="grid-edit">
    <h1>Presupuesto</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-form-group horizontal id="employee_id" label="Empleado" label-for="employee_id">
        <b-form-select v-model="form.employee_id" :options="employees"/>
      </b-form-group>
      <b-form-group horizontal id="sector_id" label="Sector" label-for="sector_id">
        <b-form-select v-model="form.sector_id" :options="sectors" @change="updateChild" />
      </b-form-group>
      <b-form-group horizontal id="position_id" label="Función" label-for="position_id">
        <b-form-select v-model="form.position_id" :options="filteredPositions"/>
      </b-form-group>
      <b-form-group horizontal id="from" label="Desde" label-for="from">
        <b-form-input type="number" id="from" min="7" max="24" step="1" v-model.trim="form.from"></b-form-input>
      </b-form-group>
      <b-form-group horizontal id="to" label="Hasta" label-for="to">
        <b-form-input type="number" id="to" min="7" max="24" step="1" v-model.trim="form.to"></b-form-input>
      </b-form-group>

      <div class="buttons">
        <b-button type="submit" variant="info">Guardar</b-button>
        <b-button type="reset" class="to-right">Volver</b-button>
      </div>

      <b-alert variant="danger" :show="errorShow">{{ errorMsg }}</b-alert>

    <b-modal id="modal-center" title="Guardar registro" v-model="warningShow" @ok="handleOk" ok-title="Si. Grabar" cancel-title="No. Cambiar" ok-variant="danger" cancel-variant="success">
      <p class="my-4"><strong>{{ warningMsg }}</strong>, desea grabar de todos modos?</p>
    </b-modal>

    </b-form>

  </b-container>
</template>

<script>
import Store from "../store/store";

export default {
  name: "GridEdit",
  data() {
    return {
      form: {
        id: 0,
        from: "",
        to: "",
        employee_id: 0,
        sector_id: 0,
        position_id: 0
      },
      show: true,
      filteredPositions: [],
      errorShow: false,
      errorMsg: "",
      warningShow: false,
      warningMsg: ""
    };
  },
  watch: {
    results() {
      const results = Store.state.results;
      if (results.id) {
        const data = {
          date: this.budget.date,
          branch_id: this.budget.branch_id
        };
        Store.dispatch("LOAD_SCHEDULES", data);
      } else {
        if (results.error) {
          switch (results.error.type) {
            case 0:
              Store.dispatch("SAVE_SCHEDULE", this.form);
              break;
            case 1:
              this.errorMsg = results.error.message;
              this.errorShow = true;
              break;
            case 2:
              this.warningMsg = results.error.message;
              this.warningShow = true;
              break;
          }
        } else {
          this.$router.push({ name: "GridList" });
        }
      }
    }
  },
  computed: {
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    item() {
      return Store.state.record;
    },
    budget() {
      return Store.state.budget.rows;
    },
    employees() {
      if (!Store.state.employees.rows) {
        return [];
      }
      const employees = Store.state.employees.rows;
      const options = [];
      for (let i = 0; i < employees.length; i++) {
        options.push({
          value: employees[i].id,
          text: `${employees[i].badge} ${employees[i].last_name}, ${
            employees[i].first_name
          }`
        });
      }
      return options;
    },
    sectors() {
      if (!Store.state.sectors.rows) {
        return [];
      }
      const sectors = Store.state.sectors.rows;
      const options = [];
      for (let i = 0; i < sectors.length; i++) {
        options.push({
          value: sectors[i].id,
          text: `${sectors[i].name}`
        });
      }
      return options;
    },
    positions() {
      if (Store.state.positions.rows) {
        this.updateChild();
      }
      return Store.state.positions;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.warningShow = false;
      this.errorShow = false;
      this.form["budget_id"] = this.budget.id;
      Store.dispatch("SCHEDULE_VERIFY_INPUT", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "GridList" });
      });
    },
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
    handleOk() {
      this.form["budget_id"] = this.budget.id;
      Store.dispatch("SAVE_SCHEDULE", this.form);
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_POSITIONS");
    Store.dispatch("LOAD_SECTORS");
    Store.dispatch("LOAD_BRANCH_EMPLOYEES", {
      branch_id: this.budget.branch_id
    });

    if (this.item) {
      this.form.id = this.item.id;
      this.form.employee_id = this.item.employee_id;
      this.form.sector_id = this.item.sector_id;
      this.form.position_id = this.item.position_id;
      this.form.from = this.item.from;
      this.form.to = this.item.to;
    }

    this.updateChild();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-edit {
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
  margin-bottom: 18px;
}
</style>
