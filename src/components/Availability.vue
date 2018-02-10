<template>
  <b-container class="availability" fluid>
      <Header />
      <h1>Disponibilidad horaria del personal</h1>
      <div class="add-button">
        <b-button @click="addItem" variant="info">Agregar</b-button>
      </div>
      <b-table hover outlined :items="availability.rows" :fields="fields" head-variant="light">
        <template slot="acciones" slot-scope="cell">
          <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        </template>
        <template slot="table-caption">
        {{availability.count}} registros
        </template>
      </b-table>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Availability",
  data() {
    return {
      fields: [
        {
          key: "employee.badge",
          label: "Legajo",
          sortable: true
        },
        {
          key: "employee.first_name",
          label: "Nombre",
          sortable: true
        },
        {
          key: "employee.last_name",
          label: "Apellido",
          sortable: true
        },
        {
          key: "mo",
          label: "Lunes",
          variant: "warning",
          class: "text-center",
          sortable: true
        },
        {
          key: "tu",
          label: "Martes",
          variant: "warning",
          class: "text-center",
          sortable: true
        },
        {
          key: "we",
          label: "Miércoles",
          variant: "warning",
          class: "text-center",
          sortable: true
        },
        {
          key: "th",
          label: "Jueves",
          variant: "warning",
          class: "text-center",
          sortable: true
        },
        {
          key: "fr",
          label: "Viernes",
          variant: "warning",
          class: "text-center",
          sortable: true
        },
        {
          key: "sa",
          label: "Sábado",
          variant: "danger",
          class: "text-center",
          sortable: true
        },
        {
          key: "su",
          label: "Domingo",
          variant: "danger",
          class: "text-center",
          sortable: true
        },
        {
          key: "created_at",
          label: "Creado",
          class: "text-center",
          sortable: true
        },
        {
          key: "updated_at",
          label: "Modificado",
          class: "text-center",
          sortable: true
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
      Store.dispatch("ADD_ITEM", {
        id: 0
      });
      this.$router.push({ name: "AvailabilityEdit" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "AvailabilityEdit" });
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    availability() {
      return Store.state.availability;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_AVAILABILITY");
    Store.dispatch("LOAD_EMPLOYEES");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.availability {
  background-color: white;
  padding-bottom: 10px;
}
.add-button {
  margin: 20px;
  float: right;
}
</style>
