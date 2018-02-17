<template>
  <b-container class="availability" fluid>
    <Header />
    <h1>Disponibilidad horaria del personal</h1>

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Entre el dato a buscar"/>
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <div class="add-button">
      <b-button @click="addItem" variant="info">Agregar</b-button>
    </div>

    <b-table hover outlined :items="availability.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" head-variant="light">
      <template slot="acciones" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
      </template>
      <template slot="table-caption">
      {{availability.count}} registros
      </template>
    </b-table>

    <b-pagination :total-rows="availability.count" :per-page="perPage" v-model="currentPage" />

  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Availability",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
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
    Store.dispatch("SET_MENU_OPTION", 6);
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
.filter-form {
  max-width: 30%;
}
.reset-button {
  margin-left: 10px;
}
</style>
