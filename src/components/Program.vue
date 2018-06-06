<template>
  <b-container class="program" fluid>
    <Header />

    <div class="pull-right no-print">
      <b-btn variant="info" @click.stop="goGrid">Grilla</b-btn>
      <b-btn variant="primary" @click.stop="printGrid">Imprimir</b-btn>
      <b-btn variant="success" @click.stop="goBack">Volver</b-btn>
    </div>

    <div>
      <h4>Grilla de programación {{ budget["branch.name"] }} para el {{ budget["weekday"] }} {{ budget["date"] }}</h4>

      <h5>
        Total horas presupuesto: {{totalHoursBudget}} / Total horas asignadas: {{totalScheduledHours}}
      </h5>

      <b-form-group class="filter-form no-print">
        <b-input-group>
          <b-form-input v-model="filter" placeholder="Entre el dato a buscar" />
          <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
        </b-input-group>
      </b-form-group>

      <b-table hover outlined small :items="scheduleRows" :fields="scheduleFields" :filter="filter" head-variant="light">

        <template slot="sectorPosition" slot-scope="row">
          {{row.item["sector.name"]}} / {{row.item["position.name"]}}
        </template>

        <template slot="fullName" slot-scope="row">
          {{row.item["employee.badge"]}} {{row.item["employee.last_name"]}}, {{row.item["employee.first_name"]}}
        </template>

        <template slot="from" slot-scope="row">
          {{row.item["_from"]}}
        </template>

        <template slot="_to" slot-scope="row">
          {{row.item["_to"]}}
        </template>

        <template slot="hours" slot-scope="row">
          {{row.item["hours"]}}
        </template>

        <template slot="table-caption">
          {{schedules.count}} registros
        </template>

      </b-table>

    </div>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'GridList',
  data () {
    return {
      filter: null,
      scheduleRows: [],
      scheduleFields: [
        {
          key: 'sectorPosition',
          label: 'Función',
          variant: 'info',
          class: 'px-3',
          thStyle: {
            width: '20%'
          }
        },
        {
          key: 'fullName',
          label: 'Empleado',
          class: 'px-2',
          thStyle: {
            width: '20%'
          }
        },
        {
          key: 'from',
          label: 'De',
          variant: 'warning',
          class: 'text-center'
        },
        {
          key: '_to',
          label: 'A',
          variant: 'warning',
          class: 'text-center'
        },
        {
          key: 'hours',
          label: 'Horas',
          variant: 'danger',
          class: 'text-center'
        }
      ]
    }
  },
  components: {
    Header
  },
  methods: {
    goGrid () {
      this.$router.push({ name: 'Grid' })
    },
    goBack () {
      this.$router.push({ name: 'Budgets' })
    },
    printGrid () {
      this.$nextTick(() => {
        window.print()
      })
    },
    loadData () {
      const data = {
        date: this.item._date,
        branch_id: this.item.branch_id
      }
      Store.dispatch('LOAD_SCHEDULES', data)
    }
  },
  watch: {
    schedules () {
      const sch = this.schedules.rows
      const arr = []
      let row = {}
      let from = null
      let _from = null
      for (let i = 0; i < sch.length; i++) {
        from = from ? from : sch[i].from
        _from = _from ? _from : sch[i]._from
        row = {
          'employee.badge': sch[i].employee.badge,
          'employee.first_name': sch[i].employee.first_name,
          'employee.last_name': sch[i].employee.last_name,
          from: from,
          _from: _from,
          'position.name': sch[i].position.name,
          'sector.name': sch[i].position.sector.name,
          to: sch[i].to,
          _to: sch[i]._to,
        }
        if (
          (i < sch.length - 1) &&
          (
            (sch[i].employee.badge !== sch[i + 1].employee.badge) ||
            (sch[i].position_id !== sch[i + 1].position_id) ||
            (sch[i].sector_id !== sch[i + 1].sector_id) ||
            (sch[i].to !== sch[i + 1].from)
          )
        ) {
          row.hours = row.to - row.from
          arr.push(row)
          from = null
          _from = null
        }
      }
      row.hours = row.to - row.from
      arr.push(row)
      this.scheduleRows = arr
    }
  },
  computed: {
    item () {
      return Store.state.record
    },
    isLogged () {
      return Store.state.user.id
    },
    schedules () {
      return Store.state.schedules
    },
    budget () {
      return Store.state.budget.rows
    },
    totalHoursBudget () {
      return Store.state.budget.rows.hours
    },
    totalScheduledHours () {
      return Store.state.schedules.scheduled
    },
    branches () {
      return Store.state.branches
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    this.loadData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.program {
  background-color: white;
}
.load-button {
  margin-bottom: 18px;
}
.input-container {
  max-width: 30%;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
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
.pull-right {
  margin-top: 18px;
  float: right;
}
table input[type='text'] {
  max-width: 60px;
  margin: 0 auto;
  text-align: center;
}
@media print {
  table {
    font-size: smaller;
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
