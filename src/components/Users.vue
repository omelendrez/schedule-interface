<template>
  <b-container class="users" fluid>
    <Header />
    <h1>Usuarios</h1>
    <div class="add-button">
      <b-button @click="addItem" variant="info">Agregar</b-button>
    </div>
    <b-table hover outlined :items="users.rows" :fields="fields" head-variant="light">
      <template slot="acciones" slot-scope="cell" v-if="cell.item.user_name!=='omar.melendrez'">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">Inactivar</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Reactivar</b-btn>
      </template>
      <template slot="table-caption">
        {{users.count}} registros
      </template>
    </b-table>
    <b-modal id="modal-center" title="Inactivar Usuario" v-model="show" @ok="handleOk" ok-title="Si. Inactivar" cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Está seguro que desea inactivar al usuario <strong>{{ selectedItem.user_name }} ({{ selectedItem.full_name }})</strong>?</p>
    </b-modal>

  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Users",
  data() {
    return {
      show: false,
      selectedItem: {
        user_name: "",
        full_name: ""
      },
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
    handleOk() {
      Store.dispatch("DELETE_USER", this.selectedItem);
      setTimeout(() => {
        Store.dispatch("LOAD_USERS");
      }, 500);
    },
    deleteItem(item, type) {
      this.selectedItem = item;
      if (type === 1) {
        this.show = true;
      } else {
        this.handleOk();
      }
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
  padding-bottom: 10px;
}
.add-button {
  margin: 20px;
  float: right;
}
</style>
