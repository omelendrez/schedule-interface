<template>
  <b-container class="employee">

    <h1>Empleado</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-card no-body>
          <b-tabs card>
            <b-tab title="Info del empleado" active>

              <b-form-group horizontal id="badge" label="Legajo" label-for="badge">
                <b-form-input id="badge" v-model.trim="form.badge" required autofocus="true"></b-form-input>
              </b-form-group>

              <b-form-group horizontal id="first_name" label="Nombre" label-for="first_name">
                <b-form-input id="first_name" v-model.trim="form.first_name" required></b-form-input>
              </b-form-group>

              <b-form-group horizontal id="last_name" label="Apellido" label-for="last_name">
                <b-form-input id="last_name" v-model.trim="form.last_name" required></b-form-input>
              </b-form-group>

              <b-form-group horizontal id="joining_date" label="Fecha de ingreso" label-for="joining_date">
                <b-form-input id="joining_date" v-model="form.joining_date" type="date" required></b-form-input>
              </b-form-group>

              <b-form-group horizontal id="branch_id" label="Local" label-for="branch_id">
                <b-form-select v-model="form.branch_id" :options="branches" class="mb-3" required/>
              </b-form-group>
            </b-tab>

            <b-tab title="Asignaciones">
              <b-form-group class="assignations">
                <b-form-checkbox-group stacked v-model="form.selected" :options="positions" />
              </b-form-group>
            </b-tab>

            <b-tab title="Bloqueo de días y horas" class="hours-tab" >
              <b-row class="header m-1">
                <b-col cols="2"><label>Día</label></b-col>
                <b-col cols="2" class="center">
                  De
                </b-col>
                <b-col cols="2" class="center">
                  A
                </b-col>
              </b-row>
              <b-row class="m-1">
                <b-col cols="2"><label>Lunes</label></b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.mo_from"></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.mo_to" ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="m-1">
                <b-col cols="2"><label>Martes</label></b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.tu_from" ></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.tu_to" ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="m-1">
                <b-col cols="2"><label>Miércoles</label></b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.we_from" ></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.we_to" ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="m-1">
                <b-col cols="2"><label>Jueves</label></b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.th_from" ></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.th_to" ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="m-1">
                <b-col cols="2"><label>Viernes</label></b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.fr_from" ></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.fr_to" ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="m-1">
                <b-col cols="2"><label>Sábado</label></b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.sa_from" ></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.sa_to" ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="m-1">
                <b-col cols="2"><label>Domingo</label></b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.su_from" ></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-form-input type="text" v-model="form.su_to" ></b-form-input>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
      </b-card>

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
        joining_date: "",
        branch_id: 0,
        mo_from: "",
        mo_to: "",
        tu_from: "",
        tu_to: "",
        we_from: "",
        we_to: "",
        th_from: "",
        th_to: "",
        fr_from: "",
        fr_to: "",
        sa_from: "",
        sa_to: "",
        su_from: "",
        su_to: "",
        selected: []
      },
      show: true,
      fields: [
        {
          key: "position",
          label: "Función"
        },
        "assign"
      ]
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
    item() {
      return Store.state.record;
    },
    positions() {
      return Store.state.positionSector;
    },
    results() {
      return Store.state.results;
    }
  },
  watch: {
    results() {
      this.$router.push({ name: "Employees" });
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(this.form);
      // Store.dispatch("SAVE_EMPLOYEE", this.form);
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
      this.form.joining_date = this.item.joining_date;
      this.form.branch_id = this.item.branch_id;
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
  margin-top: 18px;
}
.assignations {
  padding: 10px;
}
.header {
  font-weight: bold;
}
.center {
  text-align: center;
}
.hours-tab input {
  text-align: center;
}
</style>
