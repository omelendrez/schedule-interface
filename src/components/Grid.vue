<template>
  <b-container class="grid" fluid>
    <Header />

    <div v-show="!showForm" class="pull-right no-print">
      <b-btn variant="success" @click.stop="closeGrid">Volver</b-btn>
      <b-btn variant="info" @click.stop="editForm">Modificar</b-btn>
      <b-btn variant="primary" @click.stop="printForm">Imprimir</b-btn>
    </div>

    <h2 v-show="!showForm">Grilla de programación del {{ formatedDate }}</h2>

    <div class="input-container no-print" v-show="showForm">
      <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
        <b-form-select v-model="form.branch_id" :options="branches"/>
      </b-form-group>

      <b-form-group horizontal id="date" label="Día" label-for="date">
        <b-form-input type="date" v-model="form.date"/>
      </b-form-group>

      <b-btn variant="info" v-show="dataOk" class="load-button" @click.stop="loadData">Cargar</b-btn>

      <b-alert variant="danger" :show="showError">{{ errorMessage }}</b-alert>
      <b-alert variant="success" :show="showMessage">{{ message }}</b-alert>

    </div>

    <div v-show="!showForm">
      <h5>
        Total horas presupuesto: {{totalHoursBudget}} / Total horas asignadas: {{totalScheduledHours}}
      </h5>
      <b-table small bordered :items="rows" :fields="fields" head-variant="light">
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
    handleOk() {
      Store.dispatch("DELETE_SCHEDULE", this.selectedItem);
      setTimeout(() => {
        Store.dispatch("LOAD_SCHEDULES");
      }, 500);
    },
    showGrid() {
      const data = Store.state.schedules.rows;
      let i = 0;
      let employeeId = 0;
      let record = {};
      const rows = [];
      while (i < data.length) {
        const item = data[i];
        if (item.employee_id !== employeeId) {
          if (employeeId !== 0) {
            rows.push(record);
            record = {};
          }
          employeeId = item.employee_id;
          record.badge = item["employee.badge"];
          record.first_name = item["employee.first_name"];
          record.last_name = item["employee.last_name"];
          record.sector = item["sector.name"];
          record.position = item["position.name"];
        }
        for (let i = 7; i < 25; i++) {
          let hour = `0${i.toString()}`;
          hour = hour.substr(hour.length - 2);
          if (item["from"] <= i && item["to"] > i) {
            record[`h${hour}`] = `<div title="${
              item["position.name"]
            }" style="background-color:${item["position.color"]}">&nbsp;</div>`;
          }
        }
        i++;
      }
      rows.push(record);
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
    budget() {
      return Store.state.budget.rows.hours;
    },
    totalHoursBudget() {
      return Store.state.budget.rows.hours;
    },
    totalScheduledHours() {
      return Store.state.schedules.scheduled;
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
