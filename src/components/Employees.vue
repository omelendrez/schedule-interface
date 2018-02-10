<template>
  <b-container class="employees">
      <Header />
      <h1>Empleados</h1>
      <div class="add-button">
        <b-button @click="addItem" variant="info">Agregar</b-button>
      </div>
      <b-table striped hover outlined :items="employees.rows" :fields="fields">
        <template slot="acciones" slot-scope="cell">
          <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
          <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item)">Inactivar</b-btn>
          <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item)">Reactivar</b-btn>
        </template>
      <template slot="table-caption">
       {{employees.count}} registros
    </template>
    </b-table>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Employees",
  data() {
    return {
      fields: [
        {
          key: "badge",
          label: "Legajo",
          sortable: true
        },
        {
          key: "first_name",
          label: "Nombre"
        },
        {
          key: "last_name",
          label: "Apellido"
        },
        {
          key: "sector.name",
          label: "Sector"
        },
        {
          key: "position.name",
          label: "Función"
        },
        {
          key: "joining_date",
          label: "Ingreso"
        },
        {
          key: "branch.name",
          label: "Local"
        },
        {
          key: "status.name",
          label: "Status",
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
      Store.dispatch("ADD_ITEM", {
        id: 0,
        badge: "",
        first_name: "",
        last_name: "",
        sector_id: 0,
        position_id: 0,
        joining_date: "",
        branch_id: 0
      });
      this.$router.push({ name: "Employee" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "Employee" });
    },
    deleteItem(item) {
      Store.dispatch("DELETE_EMPLOYEE", item);
      setTimeout(() => {
        Store.dispatch("LOAD_EMPLOYEES");
      }, 500);
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    employees() {
      return Store.state.employees;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_EMPLOYEES");
    Store.dispatch("LOAD_BRANCHES");
    Store.dispatch("LOAD_SECTORS");
    Store.dispatch("LOAD_POSITIONS");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.employees {
  background-color: white;
  padding-bottom: 60px;
}
.add-button {
  margin: 20px;
  float: right;
}
</style>
