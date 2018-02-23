<template>
  <b-container class="program" fluid>
    <Header />

    <div v-show="!showForm" class="pull-right no-print">
      <b-btn variant="primary" @click.stop="printGrid">Imprimir</b-btn>
      <b-btn variant="success" @click.stop="closeGrid">Cambiar fecha</b-btn>
    </div>

    <div class="input-container no-print" v-show="showForm">
      <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
        <b-form-select v-model="form.branch_id" :options="branchOptions" />
      </b-form-group>

      <b-form-group horizontal id="date" label="Día" label-for="date">
        <b-form-input type="date" v-model="form.date" />
      </b-form-group>

      <b-btn variant="info" v-show="dataOk" class="load-button" @click.stop="loadData">Cargar</b-btn>

      <b-alert variant="danger" dismissible :show="showErr">{{ errMsg }}</b-alert>
    </div>

    <b-alert variant="success" dismissible :show="showMessage">{{ message }}</b-alert>

    <div v-show="!showForm">
      <h4>Grilla de programación {{ budget["branch.name"] }} para el {{ budget["weekday"] }} {{ budget["date"] }}</h4>

      <h5>
        Total horas presupuesto: {{totalHoursBudget}} / Total horas asignadas: {{totalScheduledHours}}
      </h5>

      <div class="add-button no-print">
        <b-button @click="addItem" variant="info" :disabled="isEditing">Agregar</b-button>
      </div>

      <b-form-group class="filter-form no-print">
        <b-input-group>
          <b-form-input v-model="filter" placeholder="Entre el dato a buscar" />
          <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
        </b-input-group>
      </b-form-group>

      <b-table hover outlined small :items="scheduleRows" :fields="scheduleFields" :filter="filter" head-variant="light">

        <template slot="fullName" slot-scope="row">
          <div v-if="!row.item.editing">
            {{row.item["employee.badge"]}} {{row.item["employee.last_name"]}}, {{row.item["employee.first_name"]}}
          </div>
          <b-form-select v-model="form.employee_id" :options="employeesOptions" @change="refreshUser($event)" id="edit_field" v-else required/>
        </template>

        <template slot="sectorPosition" slot-scope="row">
          <div v-if="!row.item.editing">
            {{row.item["sector.name"]}} / {{row.item["position.name"]}}
          </div>
          <b-form-select v-model="form.position_id" :options="positionsOptions" id="edit_field" v-else required/>
        </template>

        <template slot="from" slot-scope="row">
          <div v-if="!row.item.editing">
            {{row.item["from"]}}
          </div>
          <b-form-input type="text" v-model="form.from" v-else required></b-form-input>
        </template>

        <template slot="_to" slot-scope="row">
          <div v-if="!row.item.editing">
            {{row.item["_to"]}}
          </div>
          <b-form-input type="text" v-model="form.to" v-else required></b-form-input>
        </template>

        <template slot="hours" slot-scope="row">
          <div v-if="!row.item.editing">
            {{row.item["to"]-row.item["from"]}}
          </div>
          <div v-else>
            {{hoursWorked}}
          </div>
        </template>
        
        <template slot="acciones" slot-scope="row">
          <b-btn size="sm" variant="info" @click.stop="editItem(row.item, row.index, $event.target)" v-if="!row.item.editing" :disabled="isEditing">Editar</b-btn>
          <b-btn size="sm" variant="success" @click.stop="saveItem(row.item, row.index, $event.target)" v-else>Grabar</b-btn>
          <b-btn size="sm" variant="danger" @click.stop="deleteItem(row.item)" v-if="!row.item.editing" :disabled="isEditing">Eliminar</b-btn>
          <b-btn size="sm" variant="primary" ref="cancelSave" @click.stop="cancelSave(row.item, row.index, $event.target)" v-else>Cancelar</b-btn>
        </template>

        <template slot="table-caption">
          {{schedules.count}} registros
        </template>

      </b-table>

      <b-modal id="modal-center" header-bg-variant="info" title="Confirmación requerida" centered v-model="show" @ok="handleOkDelete" ok-title="Si. Eliminar" cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
        <p class="my-4">Está seguro que desea borrar el registro de
          <strong>{{selectedItem["employee.last_name"]}}, {{selectedItem["employee.first_name"]}} {{ selectedItem.first_name }} de {{ selectedItem.from }} a {{ selectedItem.to }} horas</strong>?</p>
      </b-modal>

      <b-modal id="modal-center" header-bg-variant="info" centered title="Confirmación requerida" v-model="showWarning" @ok="handleOkSave" @cancel="handleCancelSave" ok-title="Si. Grabar" cancel-title="No. Cambiar" ok-variant="danger" cancel-variant="success">
        <p class="my-4">
          <strong>{{ warningMessage }}</strong>, desea grabar de todos modos?</p>
      </b-modal>

      <b-modal v-model="showError" header-bg-variant="info" size="lg" centered ok-only title="Error al intentar grabar" class="modalError">
        <div class="d-block text-center">
          <strong>{{ errorMessage }}</strong>
        </div>
        <p class="m-0  text-center">
          Corrija e intente de nuevo
        </p>
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
      isEditing: false,
      filter: null,
      show: false,
      showForm: false,
      showErr: false,
      showError: false,
      showMessage: false,
      showWarning: false,
      timeoffAlert: false,
      message: "",
      errMsg: "",
      errorMessage: "",
      warningMessage: "",
      form: {},
      selectedItem: {},
      branchOptions: [],
      employeesOptions: [],
      positionsOptions: [],
      scheduleRows: [],
      timeoffRows: [],
      scheduleFields: [
        {
          key: "fullName",
          label: "Empleado",
          class: "px-2"
        },
        {
          key: "sectorPosition",
          label: "Función",
          variant: "info",
          class: "px-3"
        },
        {
          key: "from",
          label: "Desde",
          variant: "warning",
          class: "text-center"
        },
        {
          key: "_to",
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
          class: "text-center no-print"
        },
        {
          key: "acciones",
          label: " ",
          class: "text-center no-print"
        }
      ]
    };
  },
  components: {
    Header
  },
  methods: {
    printGrid() {
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
      Store.dispatch("LOAD_BRANCH_EMPLOYEES", data);
    },
    addItem() {
      const item = {
        id: 0,
        employe_id: 0,
        position_id: 0,
        "employee.badge": "",
        "employee.first_name": "",
        "employee.last_name": "",
        "position.sector.name": "",
        "position.name": "",
        from: "",
        to: "",
        editing: true,
        isNew: true
      };
      this.scheduleRows.push(item);
      this.isEditing = true;
      this.form = item;
    },
    refreshUser(id) {
      Store.dispatch("LOAD_EMPLOYEE", { id: id });
    },
    editItem(item, index, target) {
      item.editing = true;
      this.isEditing = true;
      this.form.employee_id = item.employee_id;
      this.form.position_id = item.position_id;
      this.form.from = item.from;
      this.form.to = item._to;
      item.budget_id = Store.state.budget.rows.id;
      Store.dispatch("LOAD_EMPLOYEE", { id: item.employee_id });
    },
    saveItem(item, index, target) {
      if (
        !this.form.employee_id ||
        !this.form.position_id ||
        !this.form.from ||
        !this.form.to
      ) {
        this.errorMessage = `Empleado, Función, Desde y Hasta son campos obligatorios y deben completarse para poder grabar. No deje ningún campo vacío`;
        this.showError = true;
        return;
      }

      const from = parseInt(this.form.from);
      const to = parseInt(this.form.to);

      if (from === to) {
        this.errorMessage = `La hora de entrada no puede ser igual a la hora de salida`;
        this.showError = true;
        return;
      }

      if (from < to) {
        if (from < 6) {
          this.errorMessage = `La hora de entrada no puede ser anterior a las 6am`;
          this.showError = true;
          return;
        }
        if (from < 6) {
          this.errorMessage = `La hora de entrada no puede ser anterior a las 6am`;
          this.showError = true;
          return;
        }
      } else {
        if (to > 2) {
          this.errorMessage = `La hora de salida no puede ser posterior a las 2am`;
          this.showError = true;
          return;
        }
      }

      this.form.budget_id = Store.state.budget.rows.id;
      this.form.id = this.form.isNew ? 0 : item.id;
      Store.dispatch("SCHEDULE_VERIFY_INPUT", this.form);
    },
    cancelSave(item, index, target) {
      item.editing = false;
      this.isEditing = false;
      if (item.isNew) {
        this.scheduleRows.splice(index, 1);
      }
    },
    deleteItem(item) {
      this.selectedItem = item;
      this.show = true;
    },
    handleOkDelete() {
      Store.dispatch("DELETE_SCHEDULE", this.selectedItem);
    },
    handleOkSave() {
      if (this.timeoffAlert) {
        return;
      }
      this.form.budget_id = Store.state.budget.rows.id;
      Store.dispatch("SAVE_SCHEDULE", this.form);
    },
    handleCancelSave() {
      if (this.timeoffAlert) {
        this.$refs.cancelSave.click();
      }
    },
    closeGrid() {
      this.scheduleRows = [];
      this.showForm = true;
    },
    hideModal() {
      this.showError = false;
    }
  },
  watch: {
    results() {
      const results = Store.state.results;
      if (results.id || results.status) {
        this.isEditing = false;
        const data = {
          date: this.budget._date,
          branch_id: this.budget.branch_id
        };
        Store.dispatch("LOAD_SCHEDULES", data);
      } else {
        if (results.error) {
          switch (results.error.type) {
            case 0:
              if (this.isEditing) {
                Store.dispatch("SAVE_SCHEDULE", this.form);
              } else {
                Store.dispatch("DELETE_SCHEDULE", this.selectedItem);
              }
              break;
            case 1:
              this.errorMessage = results.error.message;
              this.showError = true;
              break;
            case 2:
              this.warningMessage = results.error.message;
              this.showWarning = true;
              break;
          }
        }
      }
    },
    branches() {
      if (!Store.state.branches.rows) {
        return;
      }
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
    employees() {
      if (!Store.state.employees.rows) {
        return;
      }
      const employees = Store.state.employees.rows;
      const employeesOptions = [];
      for (let i = 0; i < employees.length; i++) {
        employeesOptions.push({
          value: employees[i].id,
          text: `${employees[i].badge} ${employees[i].last_name}, ${
            employees[i].first_name
          }`
        });
      }
      this.employeesOptions = employeesOptions;
    },
    employee() {
      if (!Store.state.employee.employee_positions) {
        return;
      }
      const pos = Store.state.positionSector;
      const positionsOptions = [];
      const filter = Store.state.employee.employee_positions;
      for (let i = 0; i < filter.length; i++) {
        for (let el in pos) {
          if (pos[el].value === filter[i].position_id) {
            positionsOptions.push(pos[el]);
          }
        }
      }
      this.positionsOptions = positionsOptions;
      const timeoff = this.timeoffRows.find(item => {
        return item.id === this.employee.id;
      });
      let isTimeoff = false;
      if (timeoff) {
        isTimeoff = true;
        this.timeoffAlert = true;
      }
      this.warningMessage = isTimeoff
        ? "El empleado debería estar de franco en este día"
        : "";
      this.showWarning = isTimeoff;
    },
    schedules() {
      if (!Store.state.budget.rows) {
        return;
      }
      const records = Store.state.budget;
      this.errMsg = "No existe presupuesto para ese día";
      this.showErr = !records.count;
      this.showForm = !records.count;
      const sch = Store.state.schedules.rows;
      const arr = [];
      for (let i = 0; i < sch.length; i++) {
        let row = {
          editing: false,
          created_at: sch[i].created_at,
          "employee.badge": sch[i]["employee.badge"],
          "employee.first_name": sch[i]["employee.first_name"],
          "employee.last_name": sch[i]["employee.last_name"],
          employee_id: sch[i].employee_id,
          from: sch[i].from,
          id: sch[i].id,
          "position.color": sch[i]["position.color"],
          "position.name": sch[i]["position.name"],
          position_id: sch[i].position_id,
          "sector.name": sch[i]["position.sector.name"],
          sector_id: sch[i].sector_id,
          to: sch[i].to,
          _to: sch[i]._to,
          updated_at: sch[i].updated_at
        };
        arr.push(row);
      }
      this.scheduleRows = arr;
      Store.dispatch("LOAD_TIMEOFF", {
        budget_id: Store.state.budget.rows.id
      });
    },
    timeoff() {
      const to = Store.state.timeoff;
      if (!Store.state.timeoff) {
        return;
      }
      for (let i = 0; i < to.length; i++) {
        const item = to[i];
        if (item.presence > 5) {
          this.timeoffRows.push(item);
        }
      }
    }
  },
  computed: {
    hoursWorked() {
      const from = parseInt(this.form.from);
      const to = parseInt(this.form.to);
      return from < to ? to - from : to + 24 - from;
    },
    timeoff() {
      return Store.state.timeoff;
    },
    results() {
      return Store.state.results;
    },
    employees() {
      return Store.state.employees;
    },
    employee() {
      return Store.state.employee;
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
    Store.dispatch("LOAD_POSITIONS");
    Store.dispatch("LOAD_POSITION_SECTOR");
    if (Store.state.budget.rows.id) {
      this.showForm = false;
      this.form.branch_id = Store.state.budget.rows.branch_id;
      this.form.date = Store.state.budget.rows._date;
      this.loadData();
    } else {
      this.showForm = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.program {
  background-color: white;
  position: fixed !important;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.load-button {
  margin-bottom: 18px;
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
table input[type="text"] {
  max-width: 60px;
  margin: 0 auto;
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
</style>
