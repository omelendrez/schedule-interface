<template>
  <b-container class="consumed-hours" fluid>
    <Header />
    <div class="float-right back-button">
      <b-button href="#/reports" variant="info" class="no-print" size="sm">Volver</b-button>
    </div>
    <h3 class="no-print">Reporte de horas consumidas</h3>

    <b-container class="reportForm">
      <b-form @submit.stop="onSubmit" @reset="onReset" v-if="!reportResults">
        <b-form-group horizontal id="dateFrom" label="Fecha desde">
          <b-form-input type="date" v-model.trim="form.dateFrom" required></b-form-input>
        </b-form-group>
        <b-form-group horizontal id="dateTo" label="Hasta">
          <b-form-input type="date" v-model.trim="form.dateTo" required></b-form-input>
        </b-form-group>
        <div class="buttons">
          <b-button type="submit" variant="primary">Generar</b-button>
        </div>
        <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>
      </b-form>
    </b-container>

    <b-container class="reportData" v-if="reportResults">
      <h3>Total de horas consumidas desde el {{dateFrom}} al {{dateTo}}</h3>
      <div class="buttons">
        <b-button type="button" @click="back" variant="primary" class="no-print">Cambiar fechas</b-button>
        <b-button type="button" @click="print" variant="success" class="float-right no-print">Imprimir</b-button>
      </div>
      <h4>Agrupadas porSector</h4>
      <b-table striped :items="reportResults.sector"></b-table>
      <h4>Agrupadas por Función</h4>
      <b-table striped :items="reportResults.all"></b-table>
    </b-container>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'ConsumedHours',
  components: {
    Header
  },
  data () {
    return {
      form: {
        dateFrom: null,
        dateTo: null
      },
      dateFrom: null,
      dateTo: null,
      errorMessage: null,
      errorShow: false,
      reportResults: null
    }
  },
  Store,
  methods: {
    onSubmit (e) {
      this.errorMessage = ''
      this.errorShow = false
      e.preventDefault()
      if (this.form.dateFrom > this.form.dateTo) {
        this.errorMessage = 'La fecha "desde" no puede ser posterior a le fecha "hasta"'
        this.errorShow = true
        return
      }
      Store.dispatch('LAUNCH_REPORT', this.form)
    },
    onReset () {

    },
    back () {
      this.reportResults = null
    },
    print () {
      this.$nextTick(() => {
        window.print()
      })
    }
  },
  watch: {
    results () {
      this.reportResults = this.results
      this.dateFrom = this.form.dateFrom.split('-').reverse().join('/')
      this.dateTo = this.form.dateTo.split('-').reverse().join('/')
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
