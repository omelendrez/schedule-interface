<template>
  <b-container class="budget-actual" fluid>
    <Header />
    <div class="float-right back-button">
      <b-button href="#/reports" variant="info" class="no-print" size="sm">Volver</b-button>
    </div>
    <h3 class="no-print">Horas Presupuestadas vs Consumidas</h3>

    <b-container class="reportData" v-if="reportResultsMonthly">
      <div class="buttons">
        <b-button type="button" @click="print" variant="success" class="float-right no-print">Imprimir</b-button>
      </div>
      <div class="monthly">
        <h4>Mensual - Últimos 6 meses</h4>
        <line-chart :data="reportResultsMonthly" :download="true" />
      </div>
      <div class="daily">
        <h4>Diario - Últimos 30 días</h4>
        <line-chart :data="reportResultsDaily" :download="true" />
      </div>
    </b-container>
  </b-container>
</template>

<script>
import Store from '@/store/store'
import Header from '@/components/Header'

export default {
  name: 'BudgetActual',
  components: {
    Header
  },
  data () {
    return {
      reportResultsMonthly: [],
      reportResultsDaily: []
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
          sMonth = 'Ene'
          break
        case '02':
          sMonth = 'Feb'
          break
        case '03':
          sMonth = 'Mar'
          break
        case '04':
          sMonth = 'Abr'
          break
        case '05':
          sMonth = 'May'
          break
        case '06':
          sMonth = 'Jun'
          break
        case '07':
          sMonth = 'Jul'
          break
        case '08':
          sMonth = 'Ago'
          break
        case '09':
          sMonth = 'Set'
          break
        case '10':
          sMonth = 'Oct'
          break
        case '11':
          sMonth = 'Nov'
          break
        case '12':
          sMonth = 'Dic'
          break
      }
      return `${sMonth}`
    }
  },
  watch: {
    results () {
      let data = {}
      this.results.monthly.actual.map(item => {
        data[this.translateMonth(item.month)] = parseInt(item.total)
      })
      let actual = {
        name: 'Horas Consumidas',
        data: data
      }
      data = {}
      this.results.monthly.budget.map(item => {
        data[this.translateMonth(item.month)] = parseInt(item.hours)
      })
      let budget = {
        name: 'Horas Presupuestadas',
        data: data
      }
      this.reportResultsMonthly = [budget, actual]

      data = {}
      this.results.daily.actual.map(item => {
        const date = item.date.split('-')
        date[1] = this.translateMonth(date[1])
        date.join('-')
        data[date] = parseInt(item.total)
      })
      actual = {
        name: 'Horas Consumidas',
        data: data
      }
      data = {}
      this.results.daily.budget.map(item => {
        const date = item.date.split('-')
        date[1] = this.translateMonth(date[1])
        date.join('-')
        data[date] = parseInt(item.hours)
      })
      budget = {
        name: 'Horas Presupuestadas',
        data: data
      }
      this.reportResultsDaily = [budget, actual]
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
.buttons {
  margin-bottom: 20px;
}
.back-button {
  margin: 14px;
}

.daily {
  margin-top: 60px;
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
    size: landscape;
  }
}
</style>
