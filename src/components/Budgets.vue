<template>
  <b-container class="budgets" fluid>
    <Header />
    <h1>Presupuestos</h1>
    <div class="add-button">
      <b-button @click="addItem" variant="info" v-if="isAdmin">Agregar</b-button>
    </div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Ingrese el dato a buscar" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <b-table hover outlined small :items="budgets.rows" :fields="fields" :filter="filter" :per-page="perPage"
      :current-page="currentPage" head-variant="light">
      <template slot="acciones" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)" v-if="isAdmin">Editar</b-btn>
        <b-btn size="sm" variant="primary" @click.stop="openProgram(cell.item)">Programa</b-btn>
        <b-btn size="sm" variant="success" @click.stop="openGrid(cell.item)">Grilla</b-btn>
        <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item)" v-if="isAdmin">Eliminar</b-btn>
      </template>
      <template slot="table-caption"> {{ budgets.count }} registros </template>
    </b-table>
    <b-pagination :total-rows="budgets.count" :per-page="perPage" v-model="currentPage" class="my-0" />
    <b-modal id="modal-center" centered title="Borrar Presupuesto" v-model="show" @ok="handleOk" ok-title="Si. Eliminar"
      cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Está seguro que desea borrar el presupuesto del día <strong>{{ selectedItem.date }} por {{
      selectedItem.hours }} horas</strong>?</p>
    </b-modal>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'Budgets',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      show: false,
      selectedItem: {
        date: '',
        hours: 0,
        branch_id: 0
      },
      fields: [
        {
          key: 'weekday',
          label: 'Día',
          class: 'text-center',
          tdClass: 'align-middle'
        },
        {
          key: 'date',
          label: 'Fecha',
          variant: 'success',
          class: 'text-center',
          tdClass: 'align-middle'
        },
        {
          key: 'hours',
          label: 'Horas budget',
          variant: 'warning',
          class: 'text-center',
          tdClass: 'align-middle'
        },
        {
          key: 'program',
          label: 'Horas programa',
          variant: 'warning',
          class: 'text-center',
          tdClass: 'align-middle'
        },
        {
          key: 'branch.name',
          label: 'Local',
          variant: 'info',
          class: 'text-center',
          tdClass: 'align-middle'
        },
        {
          key: 'acciones',
          label: ' ',
          class: 'text-right',
          tdClass: 'align-middle'
        }
      ]
    }
  },
  components: {
    Header
  },
  methods: {
    addItem() {
      Store.dispatch('ADD_ITEM', { id: 0 })
      this.$router.push({ name: 'Budget' })
    },
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Budget' })
    },
    openProgram(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Program' })
    },
    openGrid(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Grid' })
    },
    deleteItem(item) {
      this.selectedItem = item
      this.show = true
    },
    handleOk() {
      Store.dispatch('DELETE_BUDGET', this.selectedItem)
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        return
      }
      Store.dispatch('LOAD_BUDGETS')
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    budgets() {
      return Store.state.budgets
    },
    isAdmin() {
      return Store.state.user.profile_id === 1
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_BUDGETS')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.budgets {
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
