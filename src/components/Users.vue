<template>
  <b-container class="users">
      <Header />
      <h1>Usuarios</h1>
      <div class="add-button">
        <b-button href="#/branch_add" size="sm" variant="primary">Agregar</b-button>
      </div>
      <b-table striped hover outlined :items="users.rows" :fields="fields">
        <template slot="acciones" slot-scope="cell">
          <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
          <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item)">Eliminar</b-btn>
        </template>
        <template slot="table-caption">
        {{users.count}} registros
        </template>
      </b-table>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Users",
  data() {
    return {
      fields: [
        {
          key: "user_name",
          label: "Usuario",
          sortable: true
        },
        {
          key: "full_name",
          label: "Nombre"
        },
        {
          key: "profile.name",
          label: "Perfil"
        },
        {
          key: "status.name",
          label: "Status"
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
    users() {
      return Store.state.users;
    }
  },
  created() {
    Store.dispatch("LOAD_USERS");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users {
  background-color: white;
  padding-bottom: 60px;
}
.add-button {
  margin: 20px;
  float: right;
}
</style>
