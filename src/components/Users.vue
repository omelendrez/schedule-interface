<template>
  <b-container class="users">
    <Header />
    <h1>Usuarios</h1>
    <div class="add-button">
      <b-button @click="addItem" variant="info">Agregar</b-button>
    </div>
    <b-table striped hover outlined :items="users.rows" :fields="fields">
      <template slot="acciones" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item)">Inactivar</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item)">Reactivar</b-btn>
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
          label: "Nombre",
          sortable: true
        },
        {
          key: "profile.name",
          label: "Perfil",
          sortable: true
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
        user_name: "",
        full_name: "",
        profile_id: 0
      });
      this.$router.push({ name: "User" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "User" });
    },
    deleteItem(item) {
      Store.dispatch("DELETE_USER", item);
      setTimeout(() => {
        Store.dispatch("LOAD_USERS");
      }, 500);
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    users() {
      return Store.state.users;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_PROFILES");
    Store.dispatch("LOAD_STATUS");
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
