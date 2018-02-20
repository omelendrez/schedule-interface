<template>
  <b-container class="grid" fluid>
    <Header />

    <div v-show="!showForm" class="pull-right no-print">
      <b-btn variant="primary" @click.stop="printGrid">Imprimir</b-btn>
      <b-btn variant="success" @click.stop="closeGrid">Cambiar fecha</b-btn>
    </div>

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
      <h4>Grilla de programación {{ budget["branch.name"] }} para el {{ budget["weekday"] }} {{ budget["date"] }}</h4>
      <h5>
        Total horas presupuesto: {{totalHoursBudget}} / Total horas asignadas: {{totalScheduledHours}}
      </h5>
      <b-table small :items="rows" :fields="fields" head-variant="light">
        <template slot="fullName" slot-scope="data">
          {{data.item["badge"]}} {{data.item["last_name"]}}, {{data.item["first_name"]}}
        </template>
      </b-table>

      <b-card title="Mensaje" class="mb-2">
        <p class="card-text"> {{ footer }} </p>
      </b-card>

      <b-table small :items="colors" :fields="colorFields" head-variant="light" class="compact">
      </b-table>

    </div>

  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Grid",
  data() {
    return {
      showForm: false,
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
          label: "Empleado",
          class: "p-1"
        },
        {
          key: "sector",
          label: "Sector",
          class: "p-1"
        },
        {
          key: "h07",
          label: "07",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h08",
          label: "08",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h09",
          label: "09",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h10",
          label: "10",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h11",
          label: "11",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h12",
          label: "12",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h13",
          label: "13",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h14",
          label: "14",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h15",
          label: "15",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h16",
          label: "16",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h17",
          label: "17",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h18",
          label: "18",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h19",
          label: "19",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h20",
          label: "20",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h21",
          label: "21",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h22",
          label: "22",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h23",
          label: "23",
          class: "text-center p-0 pt-1 pb-1"
        },
        {
          key: "h24",
          label: "24",
          class: "text-center p-0 pt-1 pb-1"
        }
      ],
      rows: [],
      colors: [],
      colorFields: [
        {
          key: "color",
          label: "&nbsp;"
        },
        {
          key: "sector_position",
          label: "Sector / Función"
        }
      ]
    };
  },
  components: {
    Header
  },
  methods: {
    editGrid() {
      this.$router.push({ name: "GridList" });
    },
    closeGrid() {
      this.rows = [];
      this.showForm = true;
    },
    printGrid() {
      this.$nextTick(() => {
        window.print();
      });
    },
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
      let colors = {};
      const rows = [];
      const colorRows = [];
      while (i < data.length) {
        const item = data[i];
        colors.sector_position = `${item["sector.name"]} / ${
          item["position.name"]
        }`;
        colors.color = `<div style="background-color:${
          item["position.color"]
        }">&nbsp;</div>`;
        if (
          !colorRows.find(child => {
            return (
              child.sector_position ===
              `${item["sector.name"]} / ${item["position.name"]}`
            );
          })
        ) {
          colorRows.push(colors);
        }
        colors = {};
        if (item.employee_id !== employeeId) {
          if (employeeId !== 0) {
            rows.push(record);
            record = {};
          }
          employeeId = item.employee_id;
          record.id = item["id"];
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
      if (rows[0].id) {
        this.rows = rows;
        colorRows.sort(this.compare);
        this.colors = colorRows;
      }
      console.log(rows);
    },
    compare(a, b) {
      if (a.sector_position < b.sector_position) {
        return -1;
      }
      if (a.sector_position > b.sector_position) {
        return 1;
      }
      return 0;
    }
  },
  watch: {
    schedules() {
      const records = Store.state.budget.count;
      this.errorMessage = "No hay presupuesto cargado para ese día";
      this.showError = !records;
      this.showForm = !records;
      this.showGrid();
    }
  },
  computed: {
    budget() {
      return Store.state.budget.rows;
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
    this.showForm = true;
    Store.dispatch("SET_MENU_OPTION", this.$route.path);
    if (Store.state.budget.rows.id) {
      this.form.branch_id = Store.state.budget.rows.branch_id;
      this.form.date = Store.state.budget.rows._date;
      this.loadData();
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
  .grid {
    font-family: Arial, Helvetica, sans-serif;
    font-size: small;
  }
}
.pull-right {
  margin-top: 18px;
  float: right;
}
.compact {
  width: 300px;
}
.table-sm td {
  color: red;
  width: 20px !important;
}
</style>
