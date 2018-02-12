<template>
  <b-container class="grid" fluid>
    <Header />
    <h2 v-show="!showForm">Grilla de programación del {{ formatedDate }}</h2>
    <div class="input-container no-print" v-show="showForm">
      <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
        <b-form-select v-model="form.branch_id" :options="branches"/>
      </b-form-group>

      <b-form-group horizontal id="date" label="Día" label-for="date">
        <b-form-input type="date" v-model="form.date"/>
      </b-form-group>

      <b-btn variant="info" v-show="dataOk" class="load-button" @click.stop="loadData">Mostrar</b-btn>

      <b-alert variant="danger" :show="showError">{{ errorMessage }}</b-alert>
      <b-alert variant="success" :show="showMessage">{{ message }}</b-alert>

    </div>
    <div v-show="!showForm" class="no-print">
      <b-btn variant="info" @click.stop="closeGrid">Volver</b-btn>
      <b-btn variant="success" @click.stop="printForm">Imprimir</b-btn>
    </div>

    <div v-show="!showForm">
      <h5>
        Total horas presupuesto: {{totalHoursBudget}} / Total horas asignadas: {{totalScheduledHours}}
      </h5>
      <b-table small :items="rows" :fields="fields" head-variant="light">
        <template slot="fullName" slot-scope="data">
          {{data.item.last_name}}, {{data.item.first_name}}
        </template>
      </b-table>

      <b-card title="Mensaje" class="mb-2">
        <p class="card-text"> {{ footer }} </p>
      </b-card>
    </div>

    <b-modal id="modal-center" title="Borrar Presupuesto" v-model="show" @ok="handleOk" ok-title="Si. Eliminar" cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Está seguro que desea borrar este registro?</p>
    </b-modal>

  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Grid",
  data() {
    return {
      show: false,
      showForm: true,
      message: "",
      errorMessage: "",
      showMessage: false,
      showError: false,
      form: {
        branch_id: 0,
        date: ""
      },
      fields: [
        {
          key: "fullName",
          label: "Empleado"
        },
        {
          key: "sector",
          label: "Sector"
        },
        {
          key: "h07",
          label: "07",
          class: "text-center"
        },
        {
          key: "h08",
          label: "08",
          class: "text-center"
        },
        {
          key: "h09",
          label: "09",
          class: "text-center"
        },
        {
          key: "h10",
          label: "10",
          class: "text-center"
        },
        {
          key: "h11",
          label: "11",
          class: "text-center"
        },
        {
          key: "h12",
          label: "12",
          class: "text-center"
        },
        {
          key: "h13",
          label: "13",
          class: "text-center"
        },
        {
          key: "h14",
          label: "14",
          class: "text-center"
        },
        {
          key: "h15",
          label: "15",
          class: "text-center"
        },
        {
          key: "h16",
          label: "16",
          class: "text-center"
        },
        {
          key: "h17",
          label: "17",
          class: "text-center"
        },
        {
          key: "h18",
          label: "18",
          class: "text-center"
        },
        {
          key: "h19",
          label: "19",
          class: "text-center"
        },
        {
          key: "h20",
          label: "20",
          class: "text-center"
        },
        {
          key: "h21",
          label: "21",
          class: "text-center"
        },
        {
          key: "h22",
          label: "22",
          class: "text-center"
        },
        {
          key: "h23",
          label: "23",
          class: "text-center"
        },
        {
          key: "h24",
          label: "24",
          class: "text-center"
        }
      ],
      rows: []
    };
  },
  components: {
    Header
  },
  methods: {
    closeGrid() {
      this.rows = [];
      this.showForm = true;
    },
    printForm() {
      this.$nextTick(() => {
        window.print();
      });
    },
    loadData() {
      this.showError = false;
      this.showMessage = false;
      const data = {
        date: this.form.date,
        branch_id: this.form.branch_id
      };
      Store.dispatch("LOAD_SCHEDULES", data);
    },
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
      setTimeout(() => {
        Store.dispatch("LOAD_SCHEDULES");
      }, 500);
    },
    showGrid() {
      const rows = [];
      const data = Store.state.schedules.rows;
      let employeeId = 0;
      let record = {};
      for (const item in data) {
        const field = data[item];
        if (field["employee_id"] !== employeeId) {
          employeeId = field["employee_id"];
          record = {};
          record.badge = field["employee.badge"];
          record.first_name = field["employee.first_name"];
          record.last_name = field["employee.last_name"];
          record.sector = field["sector.name"];
          record.position = field["position.name"];
        }
        for (let i = 7; i < 25; i++) {
          let hour = `0${i.toString()}`;
          hour = hour.substr(hour.length - 2);
          if (field["from"] <= i && field["to"] > i) {
            record[`h${hour}`] = `<div title="${
              field["position.name"]
            }" style="background-color:${
              field["position.color"]
            }">&nbsp;</div>`;
          }
        }
        rows.push(record);
      }
      this.rows = rows;
    }
  },
  watch: {
    schedules() {
      const records = Store.state.budget.count;
      this.errorMessage = "No se encontraron registros para este día";
      this.showError = !records;
      this.showForm = !records;
      this.showGrid();
    }
  },
  computed: {
    totalHoursBudget() {
      return Store.state.budget.rows.hours;
    },
    totalScheduledHours() {
      return Store.state.budget.rows.scheduled;
    },
    footer() {
      return Store.state.budget.rows.footer;
    },
    isLogged() {
      return Store.state.user.id;
    },
    schedules() {
      return Store.state.schedules;
    },
    formatedDate() {
      return `${this.form.date.substr(-2)}/${this.form.date.substr(
        5,
        2
      )}/${this.form.date.substr(0, 4)}`;
    },
    dataOk() {
      return this.form.date !== "" && this.form.branch_id !== 0;
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
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
  background-color: white;
}
.add-button {
  margin: 20px;
  float: right;
}
.load-button {
  margin-bottom: 20px;
}
.input-container {
  max-width: 30%;
  margin-top: 20px;
  text-align: center;
}
@media print {
  .no-print,
  .no-print * {
    display: none !important;
  }
  @page {
    size: landscape;
  }
}
.pull-right {
  float: right;
}
</style>
