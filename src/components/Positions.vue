<template>
  <b-container class="positions" fluid>
    <Header />
    <h1>Funciones</h1>

    <div class="add-button">
      <b-button @click="addItem" variant="info">Agregar</b-button>
    </div>

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Entre el dato a buscar"/>
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table hover outlined :items="positions.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" head-variant="light">
      <template slot="acciones" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item)">Eliminar</b-btn>
      </template>
      <template slot="table-caption">
        {{positions.count}} registros
      </template>
    </b-table>

    <b-pagination :total-rows="positions.count" :per-page="perPage" v-model="currentPage" />

  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";

export default {
  name: "Positions",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: "sector.name",
          label: "Sector",
          sortable: true
        },
        {
          key: "name",
          label: "Función",
          sortable: true
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
      Store.dispatch("ADD_ITEM", { id: 0, name: "", sector_id: 0 });
      this.$router.push({ name: "Position" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "Position" });
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
