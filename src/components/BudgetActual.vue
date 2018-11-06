<template>
  <b-container class="budget-actual" fluid>
    <Header />
    <div class="float-right back-button">
      <b-button href="#/reports" variant="info" class="no-print" size="sm">Volver</b-button>
    </div>
    <h3 class="no-print">Horas Presupuestadas vs Consumidas</h3>

    <b-container class="reportData" v-if="reportResults">
      <div class="buttons">
        <b-button type="button" @click="print" variant="success" class="float-right no-print">Imprimir</b-button>
      </div>
      <line-chart :data="reportResults" />
    </b-container>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'BudgetActual',
  components: {
    Header
  },
  data () {
    return {
      reportResults: [
        {name: 'Workout', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4}},
        {name: 'Call parents', data: {'2017-01-01 00:00:00 -0800': 5, '2017-01-02 00:00:00 -0800': 3}}
      ]
    }
  },
  Store,
  methods: {
    print () {
      this.$nextTick(() => {
        window.print()
      })
    },
    translateMonth (period) {
      const month = period.split('-')
      let sMonth = ''
      switch (month[0]) {
        case '01':
          sMonth = 'Enero'
          break
        case '02':
          sMonth = 'Febrero'
          break
        case '03':
          sMonth = 'Marzo'
          break
        case '04':
          sMonth = 'Abrir'
          break
        case '05':
          sMonth = 'Mayo'
          break
        case '06':
          sMonth = 'Junio'
          break
        case '07':
          sMonth = 'Julio'
          break
        case '08':
          sMonth = 'Agosto'
          break
        case '09':
          sMonth = 'Setiembre'
          break
        case '10':
          sMonth = 'Octubre'
          break
        case '11':
          sMonth = 'Noviembre'
          break
        case '12':
          sMonth = 'Diciembre'
          break
      }
      return `${sMonth}`
    }
  },
  watch: {
    results () {
      let data = {}
      this.results.actual.map(item => {
        data[this.translateMonth(item.month)] = parseInt(item.total)
      })
      const actual = {
        name: 'Horas Consumidas',
        data: data
      }
      data = {}
      this.results.budget.map(item => {
        data[this.translateMonth(item.month)] = parseInt(item.hours)
      })
      const budget = {
        name: 'Horas Presupuestadas',
        data: data
      }
      this.reportResults = [actual, budget]
    }
  },
  computed: {
    isLogged () {
      return Store.state.user.id
    },
    results () {
      return Store.state.results
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
    }
    Store.dispatch('SET_MENU_OPTION', '/reports')
    Store.dispatch('LAUNCH_BUDGET_VS_CONSUMED')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reportForm {
  margin: 0 auto;
  padding: 10px;
  max-width: 600px;
  text-align: center;
}
.buttons {
  margin-bottom: 20px;
}
.back-button {
  margin: 14px;
}

@media print {
  h3 {
    font-size: 1.5em;
  }
  h4 {
    font-size: 1.2em;
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
