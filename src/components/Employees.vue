<template>
  <b-container class="employees" fluid>
    <Header />
    <h1>Empleados</h1>
    <div class="add-button">
      <b-button @click="addItem" variant="info">Agregar</b-button>
    </div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Ingrese el dato a buscar" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <b-checkbox v-model="onlyActive" name="check-button" class="m-2"> Sólo registros activos </b-checkbox>
    <b-table hover outlined small :items="records.rows" :fields="fields" :filter="filter" :per-page="perPage"
      :current-page="currentPage" head-variant="light">
      <template slot="fullName" slot-scope="cell"> {{ cell.item["badge"] }} - {{ cell.item["last_name"] }}, {{
      cell.item["first_name"] }} </template>
      <template slot="acciones" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">
          Eliminar</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Reactivar</b-btn>
      </template>
      <template slot="table-caption"> {{ records.count }} registros </template>
    </b-table>
    <b-pagination :total-rows="records.count" :per-page="perPage" v-model="currentPage" />
    <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>
    <b-modal id="modal-center" centered title="Eliminar Empleado" v-model="show" @ok="handleOk" ok-title="Si. Eliminar"
      cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Está seguro que desea eliminar al empleado <strong>{{ selectedItem.badge }} - {{
      selectedItem.first_name }} {{ selectedItem.last_name }}</strong>?</p>
    </b-modal>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'Employees',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      show: false,
      reactivating: false,
      errorShow: false,
      errorMessage: '',
      onlyActive: true,
      records: { count: 0, rows: [] },
      selectedItem: {
        badge: '',
        first_name: '',
        last_name: ''
      },
      fields: [
        {
          key: 'fullName',
          label: 'Empleado',
          tdClass: 'align-middle'
        },
        {
          key: 'branch.name',
          label: 'Local',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: '_joining_date',
          label: 'Ingreso',
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
        id: 0
      })
      this.$router.push({ name: 'Employee' })
    },
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      Store.dispatch('LOAD_EMPLOYEE', item)
      this.$router.push({ name: 'Employee' })
    },
    deleteItem(item, type) {
      this.selectedItem = item
      if (type === 1) {
        this.show = true
        this.reactivating = false
      } else {
        this.reactivating = true
        this.handleOk()
      }
    },
    handleOk() {
      Store.dispatch('DELETE_EMPLOYEE', this.selectedItem)
    },
    applyFilter() {
      const { rows } = Store.state.employees
      const newRows = this.onlyActive ? rows.filter((e) => e.status_id === 1) : rows
      this.records.rows = newRows
      this.records.count = newRows.length
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      this.errorShow = this.reactivating ? false : results.error
      this.errorMessage = this.reactivating ? '' : results.message
      Store.dispatch('LOAD_EMPLOYEES')
    },
    onlyActive() {
      this.applyFilter(Store.state.employees)
    },
    employees() {
      this.applyFilter(Store.state.employees)
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    employees() {
      return Store.state.employees
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_EMPLOYEES')
    Store.dispatch('LOAD_BRANCHES')
    Store.dispatch('LOAD_POSITION_SECTOR')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.employees {
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
