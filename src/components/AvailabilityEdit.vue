<template>
  <b-container class="availability_edit" fluid>
    <Header />

    <h1>Disponibilidad horaria del empleado</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

    <b-form-group  id="employee_id" label="Empleado" label-for="employee_id">
      <b-form-select v-model="form.employee_id" :options="employees" class="mb-3" @change="verify" />
    </b-form-group>

    <b-row  class="text-center bg-info">
      <b-col>

      </b-col>
      <b-col>
        Lunes
      </b-col>
      <b-col>
        Martes
      </b-col>
      <b-col>
        Miércoles
      </b-col>
      <b-col>
        Jueves
      </b-col>
      <b-col>
        Viernes
      </b-col>
      <b-col>
        Sábado
      </b-col>
      <b-col>
        Domingo
      </b-col>
    </b-row>

    <b-row  class="text-center">
      <b-col>
        Entrada
      </b-col>
      <b-col>
        <b-form-input type="time" id="mo" v-model.trim="form.mo"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="tu" v-model.trim="form.tu"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="we" v-model.trim="form.we"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="th" v-model.trim="form.th"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="fr" v-model.trim="form.fr"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="sa" v-model.trim="form.sa"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="su" v-model.trim="form.su"></b-form-input>
      </b-col>
    </b-row>

    <b-row  class="text-center">
      <b-col>
        Salida
      </b-col>
      <b-col>
        <b-form-input type="time" id="mo2" v-model.trim="form.mo2"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="tu2" v-model.trim="form.tu2"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="we2" v-model.trim="form.we2"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="th2" v-model.trim="form.th2"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="fr2" v-model.trim="form.fr2"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="sa2" v-model.trim="form.sa2"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input type="time" id="su2" v-model.trim="form.su2"></b-form-input>
      </b-col>
    </b-row>

    <div class="buttons">
      <b-button type="submit" variant="info">Guardar</b-button>
      <b-button type="reset" class="to-right">Volver</b-button>
    </div>

    </b-form>

  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";
export default {
  name: "AvailabilityEdit",
  data() {
    return {
      form: {
        id: 0,
        employee_id: 0,
        employee_id_backup: 0,
        mo: "",
        tu: "",
        we: "",
        th: "",
        fr: "",
        sa: "",
        su: "",
        mo2: "",
        tu2: "",
        we2: "",
        th2: "",
        fr2: "",
        sa2: "",
        su2: ""
      },
      show: true
    };
  },
  components: {
    Header
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    item() {
      return Store.state.record;
    },
    employees() {
      const employees = Store.state.employees.rows;
      const options = [];
      for (let i = 0; i < employees.length; i++) {
        options.push({
          value: employees[i].id,
          text: `${employees[i].badge} - ${employees[i].last_name}, ${
            employees[i].first_name
          }`
        });
      }
      return options;
    }
  },
  methods: {
    verify() {
      if (this.form.id !== 0) {
        this.$nextTick(() => {
          this.form.employee_id = this.form.employee_id_backup;
        });
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      const data = {
        id: this.form.id,
        employee_id: this.form.employee_id,
        mo: this.form.mo + "-" + this.form.mo2,
        tu: this.form.tu + "-" + this.form.tu2,
        we: this.form.we + "-" + this.form.we2,
        th: this.form.th + "-" + this.form.th2,
        fr: this.form.fr + "-" + this.form.fr2,
        sa: this.form.sa + "-" + this.form.sa2,
        su: this.form.su + "-" + this.form.su2
      };
      Store.dispatch("SAVE_AVAILABILITY", data);
      setTimeout(() => {
        this.$router.push({ name: "Availability" });
      }, 500);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Availability" });
      });
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    if (this.item.id) {
      this.form.id = this.item.id;
      this.form.employee_id = this.item.employee_id;
      this.form.employee_id_backup = this.item.employee_id;
      this.form.mo = this.item.mo.substring(0, 5);
      this.form.tu = this.item.tu.substring(0, 5);
      this.form.we = this.item.we.substring(0, 5);
      this.form.th = this.item.th.substring(0, 5);
      this.form.fr = this.item.fr.substring(0, 5);
      this.form.sa = this.item.sa.substring(0, 5);
      this.form.su = this.item.su.substring(0, 5);

      this.form.mo2 = this.item.mo.substring(6, 11);
      this.form.tu2 = this.item.tu.substring(6, 11);
      this.form.we2 = this.item.we.substring(6, 11);
      this.form.th2 = this.item.th.substring(6, 11);
      this.form.fr2 = this.item.fr.substring(6, 11);
      this.form.sa2 = this.item.sa.substring(6, 11);
      this.form.su2 = this.item.su.substring(6, 11);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.availability_edit {
  background-color: #fdfdfd;
  padding-bottom: 60px;
}
#addForm {
  margin: 0 auto;
  max-width: 80%;
  padding-top: 40px;
}
.to-right {
  float: right;
}
.buttons {
  margin: 0 auto;
  margin-top: 60px;
}
input[type="time"] {
  text-align: center;
}
div.row {
  margin-top: 32px;
}
.bg-info {
  padding: 10px;
  color: white;
}
</style>
