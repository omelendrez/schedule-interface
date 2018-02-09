<template>
  <b-container class="sectors">
    <Header />
    <h1>Sectores</h1>
    <div class="add-button">
      <b-button @click="addItem" variant="primary">Agregar</b-button>
    </div>
    <b-table striped hover outlined :items="sectors.rows" :fields="fields">
      <template slot="acciones" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item)">Eliminar</b-btn>
      </template>
      <template slot="table-caption">
        {{sectors.count}} registros
      </template>
    </b-table>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Sectors",
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Nombre"
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
  methods: {
    addItem() {
      Store.dispatch("ADD_ITEM", { id: 0, name: "" });
      this.$router.push({ name: "SectorAdd" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "SectorAdd" });
    },
    deleteItem(item) {
      Store.dispatch("DELETE_SECTOR", item);
      setTimeout(() => {
        Store.dispatch("LOAD_SECTORS");
      }, 500);
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    sectors() {
      return Store.state.sectors;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_SECTORS");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sectors {
  background-color: white;
  padding-bottom: 60px;
}
.add-button {
  margin: 20px;
  float: right;
}
</style>
