<template>
  <b-container class="positions" fluid>
    <Header />
    <h1>Funciones</h1>
    <div class="add-button" v-if="isAdmin">
      <b-button @click="addItem" variant="info">Agregar</b-button>
    </div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Entre el dato a buscar" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <b-table hover outlined small :items="positions.rows" :fields="fields" :filter="filter" :per-page="perPage"
      :current-page="currentPage" head-variant="light">
      <template slot="div" slot-scope="data">
        <div v-html='data.item.div'></div>
      </template>
      <template slot="div2" slot-scope="data">
        <div v-html='data.item.div2'></div>
      </template>
      <template slot="acciones" slot-scope="cell" v-if="isAdmin">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item, 1)">Eliminar</b-btn>
      </template>
      <template slot="table-caption"> {{ positions.count }} registros </template>
    </b-table>
    <b-pagination :total-rows="positions.count" :per-page="perPage" v-model="currentPage" />
    <b-modal id="modal-center" centered title="Eliminar función" v-model="show" @ok="handleOk" ok-title="Si. Eliminar"
      cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Está seguro que desea eliminar la función <strong>{{ selectedItem.name }} </strong>?</p>
    </b-modal>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'Positions',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      show: false,
      selectedItem: {
        name: ''
      },
      fields: [
        {
          key: 'sector.name',
          label: 'Sector',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'name',
          label: 'Función',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'div',
          label: 'Color',
          class: 'text-center',
          tdClass: 'align-middle'
        },
        {
          key: 'div2',
          label: 'Texto',
          class: 'text-center',
          tdClass: 'align-middle'
        },
        {
          key: 'acciones',
          class: 'text-right'
        }
      ]
    }
  },
  components: {
    Header
  },
  methods: {
    addItem() {
      Store.dispatch('ADD_ITEM', { id: 0, name: '', sector_id: 0, color: '', text: '' })
      this.$router.push({ name: 'Position' })
    },
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Position' })
    },
    deleteItem(item, type) {
      this.selectedItem = item
      if (type === 1) {
        this.show = true
      } else {
        this.handleOk()
      }
    },
    handleOk() {
      Store.dispatch('DELETE_POSITION', this.selectedItem)
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        return
      }
      Store.dispatch('LOAD_POSITIONS')
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isAdmin() {
      return Store.state.user.profile_id === 1
    },
    isLogged() {
      return Store.state.user.id
    },
    positions() {
      return Store.state.positions
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_POSITIONS')
    Store.dispatch('LOAD_SECTORS')
    if (this.isAdmin) {
      this.fields.push(
        {
          key: 'acciones',
          class: 'text-center'
        })
    }
  }
}
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
