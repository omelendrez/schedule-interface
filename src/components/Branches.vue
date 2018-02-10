<template>
  <b-container class="branches">
      <Header />
      <h1>Locales</h1>
      <div class="add-button">
        <b-button @click="addItem" variant="info">Agregar</b-button>
      </div>
      <b-table striped hover outlined :fields="fields" :items="branches.rows">
        <template slot="acciones" slot-scope="cell">
          <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
          <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item)">Inactivar</b-btn>
          <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item)">Reactivar</b-btn>
        </template>
        <template slot="table-caption">
        {{branches.count}} registros
        </template>
      </b-table>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";
import { setTimeout } from "timers";

export default {
  name: "Branches",
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Nombre"
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
      Store.dispatch("ADD_ITEM", { id: 0, name: "" });
      this.$router.push({ name: "Branch" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "Branch" });
    },
    deleteItem(item) {
      Store.dispatch("DELETE_BRANCH", item);
      setTimeout(() => {
        Store.dispatch("LOAD_BRANCHES");
      }, 500);
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
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
    Store.dispatch("LOAD_BRANCHES");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.branches {
  background-color: white;
  padding-bottom: 60px;
}
.add-button {
  margin: 20px;
  float: right;
}
</style>
