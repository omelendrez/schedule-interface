<template>
  <b-container class="employees">
      <Header />
      <h1>Empleados</h1>
      <div class="add-button">
        <b-button href="#/branch_add" size="sm" variant="primary">Agregar</b-button>
      </div>
      <b-table striped hover outlined :items="employees.rows" :fields="fields">
        <template slot="acciones" slot-scope="cell">
          <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
          <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item)">Eliminar</b-btn>
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
          key: "created_at",
          label: "Creado"
        },
        {
          key: "updated_at",
          label: "Modificado"
        },
        "acciones"
      ]
    };
  },
  components: {
    Header
  },
  computed: {
    employees() {
      return Store.state.employees;
    }
  },
  created() {
    Store.dispatch("LOAD_EMPLOYEES");
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
