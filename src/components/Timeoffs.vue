<template>
  <b-container class="timeoffs" fluid>
    <Header />
    <h1>Ausencias</h1>
    <div class="add-button">
      <b-button @click="addItem" variant="info">Agregar</b-button>
      <b-btn variant="primary" @click.stop="printReport">Reporte</b-btn>
    </div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" type="text" placeholder="Ingrese el dato a buscar" debounce="500" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <div class="calendar" v-if="date">
      <b-btn size="sm" variant="outline-info" @click="goPrevMonth">{{this.monthName(date.prevMonth)}} {{date.prevYear}}
      </b-btn>
      <div class="current">{{this.monthName(date.month)}} {{date.year}}</div>
      <b-btn size="sm" variant="outline-info" @click="goNextMonth">{{this.monthName(date.nextMonth)}} {{date.nextYear}}
      </b-btn>
    </div>
    <b-table hover outlined small :items="timeoffs.rows" :fields="fields" :filter="filter" :per-page="perPage"
      :current-page="currentPage" head-variant="light">
      <template slot="acciones" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Editar</b-btn>
        <b-btn size="sm" variant="danger" @click.stop="deleteItem(cell.item, 1)">Eliminar</b-btn>
      </template>
      <template slot="table-caption"> {{ timeoffs.count }} registros </template>
    </b-table>
    <b-pagination :total-rows="timeoffs.count" :per-page="perPage" v-model="currentPage" />
    <b-modal id="modal-center" centered title="Eliminar franco" v-model="show" @ok="handleOk" ok-title="Si. Eliminar"
      cancel-title="No. Dejar como está" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Está seguro que desea eliminar el franco <strong>{{ selectedItem.first_name }} {{
      selectedItem.last_name }} {{ selectedItem.date }} </strong>?</p>
    </b-modal>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'
import { DateHandler } from '../utils'

const CalendarData = new DateHandler()

export default {
  name: 'Timeoffs',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      show: false,
      date: null,
      selectedItem: {
        date: ''
      },
      fields: [
        {
          key: 'employee.badge',
          label: 'Legajo',
          tdClass: 'align-middle'
        },
        {
          key: 'employee.first_name',
          label: 'Nombre',
          tdClass: 'align-middle'
        },
        {
          key: 'employee.last_name',
          label: 'Apellido',
          tdClass: 'align-middle'
        },
        {
          key: 'absenteeism.name',
          label: 'Ausencia',
          class: 'text-center',
          tdClass: 'align-middle'
        },
        {
          key: 'date',
          label: 'Día',
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
      Store.dispatch('ADD_ITEM', { id: 0, dateFrom: '', dateTo: '', employee_id: 0, absenteeism_id: 0, color: '' })
      this.$router.push({ name: 'Timeoff' })
    },
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Timeoff' })
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
      Store.dispatch('DELETE_TIMEOFF', this.selectedItem)
    },
    printReport() {
      this.$router.push({ name: 'TimeoffReport' })
    },
    monthName(month) {
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Deciembre']
      return monthNames[month - 1]
    },
    goPrevMonth() {
      CalendarData.setPrevMonth()
      this.loadData()
    },
    goNextMonth() {
      CalendarData.setNextMonth()
      this.loadData()
    },
    loadData() {
      this.date = CalendarData.getDateInfo()
      Store.dispatch('LOAD_TIMEOFFS', { from: this.date.from, to: this.date.to })
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        return
      }
      this.loadData()
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    timeoffs() {
      return Store.state.timeoffs
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    this.date = CalendarData.getDateInfo()
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    this.loadData()
    Store.dispatch('LOAD_EMPLOYEES')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeoffs {
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

.calendar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 1rem;
}

.calendar .current {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0 1rem;
}
</style>
