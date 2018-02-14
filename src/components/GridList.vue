<template>
  <b-container class="grid-list" fluid>
    <Header />

    <div class="pull-right no-print">
      <b-btn variant="success" href="/#/grid">Volver a grilla</b-btn>
    </div>

    <h4>Grilla de programación {{ budget["branch.name"] }} para el {{ formatedDate }}</h4>

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

    <b-table hover outlined :items="schedules.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" head-variant="light">
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
      selectedItem: {
        id: "",
        employee_id: "",
        from: 0,
        to: 0
      },
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
    addItem() {
      Store.dispatch("ADD_ITEM", { id: 0 });
      this.$router.push({ name: "GridEdit" });
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
    }
  },
  watch: {
    results() {
      const results = Store.state.results;
      if (results) {
        const data = {
          date: this.budget.date,
          branch_id: this.budget.branch_id
        };
        Store.dispatch("LOAD_SCHEDULES", data);
      }
      return Store.state.results;
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

    formatedDate() {
      const budget = Store.state.budget.rows;
      if (budget.date) {
        return `${budget.date.substr(-2)}/${budget.date.substr(
          5,
          2
        )}/${budget.date.substr(0, 4)}`;
      }
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_POSITIONS");
    Store.dispatch("LOAD_SECTORS");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-list {
  background-color: white;
  padding-bottom: 10px;
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
