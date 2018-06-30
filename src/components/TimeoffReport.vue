<template>
  <b-container class="timeoff-report" fluid>
    <Header />
    <h1 class="no-print">Reporte Ausencias</h1>

    <b-card class="printForm no-print">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group horizontal id="absenteeismId" label="Type de Ausentismo" label-for="absenteeismId">
          <b-form-select v-model="form.absenteeismId" :options="absenteeismsOptions" required @change="changedParams" />
        </b-form-group>
        <b-form-group horizontal label="Fecha desde" label-for="fromDate">
          <b-form-input type="date" id="fromDate" v-model="form.fromDate" required @change="changedParams" />
        </b-form-group>
        <b-form-group horizontal label="Fecha hasta" label-for="toDate">
          <b-form-input type="date" id="toDate" v-model="form.toDate" required @change="changedParams" />
        </b-form-group>
        <b-form-group horizontal id="sortBy" label="Ordenar resultados" label-for="sortBy">
          <b-form-select v-model="form.sortBy" :options="sortOptions" required @change="changedParams" />
        </b-form-group>
        <div class="buttons">
          <b-button type="reset">Volver</b-button>
          <b-button type="submit" variant="info" class="to-right">Cargar</b-button>
        </div>
      </b-form>
      <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>
    </b-card>

    <div class="report-table" v-show="TimeoffRows.length">
      <b-button type="button" variant="primary" @click="printReport" class="no-print print-button to-right">Imprimir</b-button>
      <h4>Reporte de ausentimo del {{dateFrom}} al {{dateTo}}</h4>
      <b-table v-if="TimeoffRows" hover outlined :items="TimeoffRows" :fields="fields" head-variant="light">
        <template slot="fullName" slot-scope="cell">
          {{cell.item["badge"]}} - {{cell.item["last_name"]}}, {{cell.item["first_name"]}}
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'TimeoffReport',
  data () {
    return {
      dateFrom: '',
      dateTo: '',
      errorShow: false,
      errorMessage: '',
      form: {
        absenteeismId: 0,
        fromDate: '',
        toDate: '',
        sortBy: 0
      },
      loaded: false,
      absenteeismsOptions: [],
      TimeoffRows: [],
      fields: [
        {
          key: 'fullName',
          label: 'Empleado'
        },
        {
          key: 'date',
          label: 'Día',
          class: 'text-center'
        },
        {
          key: 'absenteeism',
          label: 'Ausencia',
          class: 'text-center'
        }
      ]
    }
  },
  components: {
    Header
  },
  watch: {
    absenteeisms () {
      const absenteeisms = this.absenteeisms.rows
      const options = [
        {
          value: 0,
          text: 'Incluir Todos'
        }
      ]
      for (let i = 0; i < absenteeisms.length; i++) {
        options.push({
          value: absenteeisms[i].id,
          text:
            absenteeisms[i].name
        })
      }
      this.absenteeismsOptions = options
    },
    timeoffs () {
      const to = this.timeoffs.rows
      if (!to) {
        return
      }
      const timeoffRows = []
      for (let i = 0; i < to.length; i++) {
        const item = to[i]
        if (this.form.absenteeismId === 0 || item.absenteeism_id === this.form.absenteeismId) {
          timeoffRows.push({
            badge: item.employee.badge,
            first_name: item.employee.first_name,
            last_name: item.employee.last_name,
            date: item.week_day + ' ' + item.date,
            absenteeism: item.absenteeism.name
          })
        }
      }
      this.TimeoffRows = timeoffRows
      this.dateFrom = this.form.fromDate.split('-').reverse().join('-')
      this.dateTo = this.form.toDate.split('-').reverse().join('-')
    }
  },
  computed: {
    isLogged () {
      return Store.state.user.id
    },
    absenteeisms () {
      return Store.state.absenteeisms
    },
    timeoffs () {
      return Store.state.timeoffs
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.errorShow = false
      if (this.form.fromDate > this.form.toDate) {
        this.errorMessage = '[Fecha desde] no puede ser posterior a [Fecha hasta]'
        this.errorShow = true
        return
      }
      Store.dispatch('LOAD_TIMEOFFS_BY_PERIOD', this.form)
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.fromDate = ''
      this.form.toDate = ''
      this.$nextTick(() => {
        this.$router.push({ name: 'Timeoffs' })
      })
    },
    printReport () {
      this.$nextTick(() => {
        window.print()
      })
    },
    goBack () {
      this.$router.push({ name: 'Timeoffs' })
    },
    changedParams () {
      this.TimeoffRows = []
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_ABSENTEEISMS')
    const sortOptions = [
      {
        value: 0,
        text: 'Por empleado'
      },
      {
        value: 1,
        text: 'Por fecha'
      }
    ]
    this.sortOptions = sortOptions
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.printForm {
  max-width: 600px;
  margin: 0 auto;
}
.to-right {
  float: right;
}
.report-table {
  margin: 0 auto;
  margin-top: 40px;
  max-width: 800px;
}
input {
  text-align: center;
}
.buttons {
  margin: 0 auto;
  margin-top: 18px;
  margin-bottom: 18px;
}
.print-button {
  margin-bottom: 10px;
}
.filter-form {
  max-width: 30%;
}
@media print {
  .program {
    padding: 30px;
  }
  h4 {
    font-size: 1em;
  }
  table {
    font-size: smaller;
    width: auto;
  }
  .no-print,
  .no-print * {
    display: none !important;
  }
  @page {
    size: portrait;
  }
}
</style>
