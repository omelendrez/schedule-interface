<template>
  <b-container class="absenteeisms" fluid>
    <Header />
    <h1>Ausentismo</h1>
    <div class="add-button" v-if="isAdmin">
      <b-button @click="addItem" variant="info">Agregar</b-button>
    </div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Entre el dato a buscar" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <b-table hover outlined :items="absenteeisms.rows" :fields="fields" :filter="filter" :per-page="perPage"
      :current-page="currentPage" head-variant="light">
      <template slot="acciones" slot-scope="cell" v-if="isAdmin">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">
          Inactivar</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Reactivar</b-btn>
      </template>
      <template slot="table-caption"> {{ absenteeisms.count }} registros </template>
    </b-table>
    <b-pagination :total-rows="absenteeisms.count" :per-page="perPage" v-model="currentPage" />
    <b-modal id="modal-center" centered title="Inactivar local" v-model="show" @ok="handleOk" ok-title="Si. Inactivar"
      cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Está seguro que desea inactivar el ausentismo <strong>{{ selectedItem.name }} </strong>?</p>
    </b-modal>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'Absenteeisms',
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
          key: 'name',
          label: 'Nombre',
          sortable: true
        },
        {
          key: 'status.name',
          label: 'Status',
          class: 'text-center'
        },
        {
          key: 'created_at',
          label: 'Creado',
          class: 'text-center'
        },
        {
          key: 'updated_at',
          label: 'Modificado',
          class: 'text-center'
        }
      ]
    }
  },
  components: {
    Header
  },
  methods: {
    addItem() {
      Store.dispatch('ADD_ITEM', { id: 0, name: '' })
      this.$router.push({ name: 'Absenteeism' })
    },
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Absenteeism' })
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
      Store.dispatch('DELETE_ABSENTEEISM', this.selectedItem)
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        return
      }
      Store.dispatch('LOAD_ABSENTEEISMS')
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
    absenteeisms() {
      return Store.state.absenteeisms
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_ABSENTEEISMS')
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
.absenteeisms {
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
