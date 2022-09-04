<template>
  <b-container class="users" fluid>
    <Header />
    <h1>Usuarios</h1>
    <div class="add-button" v-if="isAdmin">
      <b-button @click="addItem" variant="info">Agregar</b-button>
    </div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Entre el dato a buscar" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <b-table hover outlined small :items="users.rows" :fields="fields" head-variant="light">
      <template slot="acciones" slot-scope="cell" v-if="cell.item.id !== user.id || isAdmin">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">
          Inactivar</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Reactivar</b-btn>
      </template>
      <template slot="table-caption"> {{ users.count }} registros </template>
    </b-table>
    <b-pagination :total-rows="users.count" :per-page="perPage" v-model="currentPage" />
    <b-modal id="modal-center" centered title="Inactivar Usuario" v-model="show" @ok="handleOk" ok-title="Si. Inactivar"
      cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Está seguro que desea inactivar al usuario <strong>{{ selectedItem.user_name }} ({{
      selectedItem.full_name }})</strong>?</p>
    </b-modal>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'Users',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      show: false,
      selectedItem: {
        user_name: '',
        full_name: ''
      },
      fields: [
        {
          key: 'user_name',
          label: 'Usuario',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'full_name',
          label: 'Nombre',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'profile.name',
          label: 'Perfil',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'branch.name',
          label: 'Local',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'status.name',
          label: 'Status',
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
      Store.dispatch('ADD_ITEM', {
        id: 0,
        user_name: '',
        full_name: '',
        profile_id: 0
      })
      this.$router.push({ name: 'User' })
    },
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'User' })
    },
    handleOk() {
      Store.dispatch('DELETE_USER', this.selectedItem)
    },
    deleteItem(item, type) {
      this.selectedItem = item
      if (type === 1) {
        this.show = true
      } else {
        this.handleOk()
      }
    }
  },
  watch: {
    results() {
      Store.dispatch('LOAD_USERS')
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id
    },
    isAdmin() {
      return Store.state.user.profile_id === 1
    },
    user() {
      return Store.state.user
    },
    users() {
      return Store.state.users
    },
    results() {
      return Store.state.results
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_PROFILES')
    Store.dispatch('LOAD_BRANCHES')
    Store.dispatch('LOAD_STATUS')
    Store.dispatch('LOAD_USERS')
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
.users {
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
