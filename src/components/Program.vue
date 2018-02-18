<template>
  <b-container class="grid-list" fluid>
    <Header />

    <div v-show="!showForm" class="pull-right">
      <b-btn variant="success" @click.stop="closeGrid">Cambiar fecha</b-btn>
    </div>

    <div class="input-container" v-show="showForm">
      <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
        <b-form-select v-model="form.branch_id" :options="branchOptions"/>
      </b-form-group>

      <b-form-group horizontal id="date" label="Día" label-for="date">
        <b-form-input type="date" v-model="form.date"/>
      </b-form-group>

      <b-btn variant="info" v-show="dataOk" class="load-button" @click.stop="loadData">Cargar</b-btn>

      <b-alert variant="danger" :show="showError">{{ errorMessage }}</b-alert>
      <b-alert variant="success" :show="showMessage">{{ message }}</b-alert>

    </div>

    <div v-show="!showForm">
      <h4>Grilla de programación {{ budget["branch.name"] }} para el {{ budget["weekday"] }} {{ budget["date"] }}</h4>

      <h5>
        Total horas presupuesto: {{totalHoursBudget}} / Total horas asignadas: {{totalScheduledHours}}
      </h5>

      <div class="add-button">
        <b-button @click="addItem" variant="info">Agregar</b-button>
      </div>

      <b-form-group class="filter-form">
        <b-input-group>
          <b-form-input v-model="filter" placeholder="Entre el dato a buscar"/>
          <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
        </b-input-group>
      </b-form-group>

      <b-table hover outlined :items="rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" head-variant="light">
        <template slot="fullName" slot-scope="data">
          {{data.item["employee.last_name"]}}, {{data.item["employee.first_name"]}}
        </template>
        <template slot="hours" slot-scope="data">
          {{data.item["to"]-data.item["from"]}}
        </template>
        <template slot="acciones" slot-scope="cell">
          <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
          <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item)">Eliminar</b-btn>
        </template>
        <template slot="table-caption">
          {{schedules.count}} registros
        </template>
      </b-table>

      <b-pagination :total-rows="schedules.count" :per-page="perPage" v-model="currentPage" class="my-0" />

      <b-modal id="modal-center" title="Borrar Registro" v-model="show" @ok="handleOk" ok-title="Si. Eliminar" cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
        <p class="my-4">Está seguro que desea borrar el registro de <strong>{{selectedItem["employee.last_name"]}}, {{selectedItem["employee.first_name"]}} {{ selectedItem.first_name }} de {{ selectedItem.from }} a {{ selectedItem.to }} horas</strong>?</p>
      </b-modal>

    </div>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "GridList",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      show: false,
      showForm: false,
      branchOptions: [],
      message: "",
      errorMessage: "",
      showMessage: false,
      showError: false,
      form: {
        branch_id: 0,
        date: ""
      },
      selectedItem: {
        id: "",
        employee_id: "",
        from: 0,
        to: 0
      },
      rows: [],
      fields: [
        {
          key: "fullName",
          label: "Empleado"
        },
        {
          key: "sector.name",
          label: "Sector",
          variant: "info",
          class: "text-center"
        },
        {
          key: "position.name",
          label: "Función",
          variant: "info",
          class: "text-center"
        },
        {
          key: "from",
          label: "Desde",
          variant: "warning",
          class: "text-center"
        },
        {
          key: "to",
          label: "Hasta",
          variant: "warning",
          class: "text-center"
        },
        {
          key: "hours",
          label: "Horas",
          variant: "danger",
          class: "text-center"
        },
        {
          key: "created_at",
          label: "Creado",
          class: "text-center"
        },
        {
          key: "updated_at",
          label: "Modificado",
          class: "text-center"
        },
        {
          key: "acciones",
          class: "text-center"
        }
      ]
    };
  },
  components: {
    Header
  },
  methods: {
    loadData() {
      this.showError = false;
      this.showMessage = false;
      // localStorage.setItem("form", JSON.stringify(this.form));
      const data = {
        date: this.form.date,
        branch_id: this.form.branch_id
      };
      Store.dispatch("LOAD_SCHEDULES", data);
    },
    addItem() {
      const item = {
        id: 0,
        employee_id: 0,
        employee: {
          first_name: "0",
          last_name: "0"
        },
        sector_id: 1,
        sector: {
          name: "Entrenamiento"
        },
        position_id: 1,
        position: {
          name: "Entrenamiento"
        },
        from: 7,
        to: 9,
        hours: 2,
        created_at: "",
        updated_at: ""
      };
      this.rows.push(item);
      // Store.dispatch("ADD_ITEM", { id: 0 });
      // this.$router.push({ name: "GridEdit" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "GridEdit" });
    },
    deleteItem(item) {
      this.selectedItem = item;
      this.show = true;
    },
    handleOk() {
      Store.dispatch("DELETE_SCHEDULE", this.selectedItem);
    },
    closeGrid() {
      this.rows = [];
      this.showForm = true;
    }
  },
  watch: {
    branches() {
      const branches = Store.state.branches.rows;
      const branchOptions = [];
      for (let i = 0; i < branches.length; i++) {
        branchOptions.push({
          value: branches[i].id,
          text: branches[i].name
        });
      }
      this.branchOptions = branchOptions;
    },
    schedules() {
      const records = Store.state.budget.count;
      this.errorMessage = "Falta cargar el presupuesto para ese día";
      this.showError = !records;
      this.showForm = !records;
    }
  },
  computed: {
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    schedules() {
      return Store.state.schedules;
    },
    budget() {
      return Store.state.budget.rows;
    },
    totalHoursBudget() {
      return Store.state.budget.rows.hours;
    },
    totalScheduledHours() {
      return Store.state.schedules.scheduled;
    },
    dataOk() {
      return this.form.date !== "" && this.form.branch_id !== 0;
    },
    branches() {
      return Store.state.branches;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("SET_MENU_OPTION", this.$route.path);
    Store.dispatch("LOAD_BRANCHES");
    this.showForm = true;
    if (Store.state.budget.rows) {
      this.form.branch_id = Store.state.budget.rows.branch_id;
      this.form.date = Store.state.budget.rows._date;
      this.loadData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-list {
  background-color: white;
  padding-bottom: 60px;
}
.load-button {
  margin-bottom: 20px;
}
.input-container {
  max-width: 30%;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
}
.add-button {
  margin: 20px;
  float: right;
}
.filter-form {
  max-width: 30%;
}
.reset-button {
  margin-left: 10px;
}
.pull-right {
  margin-top: 18px;
  float: right;
}
</style>
