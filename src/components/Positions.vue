<template>
  <b-container class="positions">
    <Header />
    <h1>Funciones</h1>
    <div class="add-button">
      <b-button @click="addItem" variant="primary">Agregar</b-button>
    </div>
    <b-table striped hover outlined :items="positions.rows" :fields="fields">
      <template slot="acciones" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item)">Eliminar</b-btn>
      </template>
      <template slot="table-caption">
        {{positions.count}} registros
      </template>
    </b-table>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Positions",
  data() {
    return {
      fields: [
        {
          key: "sector.name",
          label: "Sector"
        },
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
      Store.dispatch("ADD_ITEM", { id: 0, name: "", sector_id: 0 });
      this.$router.push({ name: "PositionAdd" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "PositionAdd" });
    },
    deleteItem(item) {
      Store.dispatch("DELETE_POSITION", item);
      setTimeout(() => {
        Store.dispatch("LOAD_POSITIONS");
      }, 500);
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    positions() {
      return Store.state.positions;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_POSITIONS");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.positions {
  background-color: white;
  padding-bottom: 60px;
}
.add-button {
  margin: 20px;
  float: right;
}
</style>
