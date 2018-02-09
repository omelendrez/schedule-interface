<template>
  <b-container class="sectors">
      <Header />
      <h1>Sectores</h1>
      <div class="add-button">
        <b-button href="#/branch_add" size="sm" variant="primary">Agregar</b-button>
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
  computed: {
    sectors() {
      return Store.state.sectors;
    }
  },
  created() {
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
