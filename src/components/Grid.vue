<template>
  <b-container class="grid" fluid>
    <Header />
    <div class="pull-right no-print">
      <b-btn variant="info" @click.stop="goProgram">Programa</b-btn>
      <b-btn variant="primary" @click.stop="printGrid">Imprimir</b-btn>
      <b-btn variant="success" @click.stop="goBack">Volver</b-btn>
    </div>
    <div>
      <h4>Grilla de programación {{ budget["branch.name"] }} para el {{ budget["weekday"] }} {{ budget["date"] }}</h4>
      <h5 class="no-print">Total horas presupuesto: {{ totalHoursBudget }} / Total horas asignadas: {{
      totalScheduledHours }}</h5>
      <div @click="showPositions = true" class="position-group no-print">
        <div class="position">Sector seleccionado:</div>
        <div class="position-color" v-bind:style="{ background: selectedPosition.color }">&nbsp;</div>
        <div class="position-name">{{ selectedPosition.name }}</div>
        <div class="pull-right error" :show="showError">{{ errorMessage }}</div>
      </div>
      <b-table small bordered :items="scheduleRows" @click.native="selectCell($event)" :fields="fields"
        head-variant="light" class="schedule-table">
        <template slot="fullName" slot-scope="data">
          <span v-b-popover.hover="data.item.last_timeoff" class="last-timeoff">{{ data.item["last_name"] }}, {{
          data.item["first_name"] }}</span>
        </template>
        <template slot="h06" slot-scope="data">
          <div v-html="data.item['h06']"></div>
        </template>
        <template slot="h07" slot-scope="data">
          <div v-html="data.item['h07']"></div>
        </template>
        <template slot="h08" slot-scope="data">
          <div v-html="data.item['h08']"></div>
        </template>
        <template slot="h09" slot-scope="data">
          <div v-html="data.item['h09']"></div>
        </template>
        <template slot="h10" slot-scope="data">
          <div v-html="data.item['h10']"></div>
        </template>
        <template slot="h11" slot-scope="data">
          <div v-html="data.item['h11']"></div>
        </template>
        <template slot="h12" slot-scope="data">
          <div v-html="data.item['h12']"></div>
        </template>
        <template slot="h13" slot-scope="data">
          <div v-html="data.item['h13']"></div>
        </template>
        <template slot="h14" slot-scope="data">
          <div v-html="data.item['h14']"></div>
        </template>
        <template slot="h15" slot-scope="data">
          <div v-html="data.item['h15']"></div>
        </template>
        <template slot="h16" slot-scope="data">
          <div v-html="data.item['h16']"></div>
        </template>
        <template slot="h17" slot-scope="data">
          <div v-html="data.item['h17']"></div>
        </template>
        <template slot="h18" slot-scope="data">
          <div v-html="data.item['h18']"></div>
        </template>
        <template slot="h19" slot-scope="data">
          <div v-html="data.item['h19']"></div>
        </template>
        <template slot="h20" slot-scope="data">
          <div v-html="data.item['h20']"></div>
        </template>
        <template slot="h21" slot-scope="data">
          <div v-html="data.item['h21']"></div>
        </template>
        <template slot="h22" slot-scope="data">
          <div v-html="data.item['h22']"></div>
        </template>
        <template slot="h23" slot-scope="data">
          <div v-html="data.item['h23']"></div>
        </template>
        <template slot="h24" slot-scope="data">
          <div v-html="data.item['h24']"></div>
        </template>
        <template slot="h25" slot-scope="data">
          <div v-html="data.item['h25']"></div>
        </template>
      </b-table>
      <b-card title="Mensaje" class="mb-2" v-show="footer">
        <p class="card-text">{{ footer }}</p>
      </b-card>
      <b-modal v-model="showAlert" header-bg-variant="info" title="Aviso" header-text-variant="light" centered
        @ok="handleOk" ok-title="Si. Continuar" cancel-title="No. Dejar como está" cancel-variant="danger">
        <strong>{{ alertMessage }}</strong>
        <p>Querés continuar?</p>
      </b-modal>
      <b-modal v-model="timeoffAlert" header-bg-variant="info" title="Aviso" header-text-variant="light" centered
        ok-only>
        <p> Este empleado está informado como ausente con <strong>{{ timeoffMessage }}</strong> para este día. <br>Si
          querés cargarle horas tenés que eliminar el ausentismo desde la opción <strong>Ausencias</strong> del menú.
        </p>
      </b-modal>
      <b-modal v-model="warningShow" centered header-bg-variant="info" title="Aviso" header-text-variant="light"
        ok-only>
        <p>
          <strong>{{ warningMessage }}</strong>
        </p>
      </b-modal>
      <b-modal v-model="showPositions" header-bg-variant="info" title="Sectores" header-text-variant="light" ok-only>
        <Positions :selectPosition="selectPosition" :deleteSector="deleteSector" :deActivate="deActivate"
          :positionRows="positionRows" />
      </b-modal>
    </div>
  </b-container>
</template>

<script>
/* eslint-disable */
import Store from '@/store/store'
import Header from './Header'
import Positions from './lib/Positions'
import fields from '@/utils/fields'
import { getPersistedValue, LOCAL_STORAGE_VARS, persistValue } from '../utils'

export default {
  name: 'Grid',
  data() {
    return {
      alertMessage: '',
      showError: false,
      errorMessage: '',
      timeoffAlert: false,
      timeoffMessage: '',
      fields: fields.grid,
      scheduleRows: [],
      positionRows: [],
      recordData: {},
      showAlert: false,
      showPositions: false,
      warningMessage: '',
      warningShow: false,
      weekday: null,
      selectedPosition: {
        name: ''
      },
      text: 'Haga click aquí para seleccionar un Sector'
    }
  },
  components: {
    Header,
    Positions
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        this.errorMessage = results.message
        this.showError = true
        return
      }
      if (results.warnings && results.warnings.warning) {
        this.alertMessage = results.warnings.message
        this.showAlert = true
      }
      this.loadData()
    },
    schedule() {
      const rows = this.schedule.rows
      this.weekday = this.budget._weekday
      this.loadGrid(rows)
    },
    allTimeoffs() {
      const allTimeoffs = this.allTimeoffs.rows
      if (allTimeoffs) {
        this.loadData()
      }
    },
    positions() {
      const positions = this.positions.rows
      positions.map(pos => {
        const position = {}
        position.color = pos.div
        position.hours = 0
        position.id = pos.id
        position.sector_position = `${pos['sector.name']} - ${pos.name}`
        this.positionRows.push(position)
      })
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    record() {
      return Store.state.record
    },
    budget() {
      return Store.state.budget.rows
    },
    schedule() {
      return Store.state.schedule
    },
    totalHoursBudget() {
      return Store.state.budget.rows.hours
    },
    totalScheduledHours() {
      return Store.state.schedule.scheduled
    },
    footer() {
      return Store.state.budget.rows.footer
    },
    allTimeoffs() {
      return Store.state.allTimeoffs
    },
    isLogged() {
      return Store.state.user.id
    },
    positions() {
      return Store.state.positions
    }
  },
  methods: {
    loadGrid(rows) {
      this.scheduleRows = []
      rows.map(emp => {
        let Employee = {}
        const blockers = emp.availabilities
        Employee.blockedFrom = null
        Employee.blockedTo = null
        for (let i = 0; i < blockers.length; i++) {
          const blk = blockers[i]
          if (blk.week_day === this.weekday) {
            Employee.blockedFrom = blk.from
            Employee.blockedTo = blk.to
          }
        }
        Employee.id = emp.id
        Employee.badge = emp.badge
        Employee.last_timeoff = this.getLastTimeoff(emp.id)
        Employee.first_name = emp.first_name
        Employee.last_name = emp.last_name
        Employee.hours = 0
        const record = {
          id: 0,
          budget_id: this.record.id,
          position_id: 0,
          timeoff: '',
          hours: 0,
          position: {
            color: ''
          }
        }
        for (let i = 6; i < 26; i++) {
          const hour = i < 10 ? `0${i.toString()}` : `${i.toString()}`
          this.fillCell(Employee, record, hour)
        }
        const timeoffs = emp.timeoffs
        if (timeoffs.length) {
          for (let i = 6; i < 26; i++) {
            record.timeoff = timeoffs[0].absenteeism.name
            record.position.name = timeoffs[0].absenteeism.name
            const hour = i < 10 ? `0${i.toString()}` : `${i.toString()}`
            this.fillCell(Employee, record, hour)
          }
        }
        const data = emp.schedules
        if (data.length) {
          for (let i = 0; i < data.length; i++) {
            const rec = data[i]
            rec.timeoff = ''
            const hours = parseInt(rec.to) - parseInt(rec.from)
            Employee.hours += hours
            this.positionRows.map(pos => {
              if (pos.id === rec.position_id) {
                pos.hours += hours
              }
              return pos
            })
            for (var h = rec.from; h < rec.to; h++) {
              const hour = h < 10 ? `0${h.toString()}` : `${h.toString()}`
              this.fillCell(Employee, rec, hour)
            }
          }
          if (Employee.hours < 4) {
            this.errorMessage =
              'ATENCIÓN! Tenés empleados con menos de 4 horas asignadas'
            this.showError = true
          } else {
            this.errorMessage = ''
            this.showError = false
          }
        }
        this.scheduleRows.push(Employee)
      })
    },
    fillCell(Employee, rec, h) {
      if (rec.position.name && rec.position.name.length > 6) {
        rec.position.name = rec.position.name.substring(0, 5) + '...'
      }
      Employee[`h${h}`] = `<div data-record-id="${rec.id}" data-timeoff="${rec.timeoff
        }" data-budget-id="${rec.budget_id}" data-position-id="${rec.position_id
        }" data-employee-id="${Employee.id
        }" data-hour="${h}" class="my-div" style="background-color:${rec.position
          .color || '#ffffff'};color:${rec.position.text ||
          '#000000'};cursor:pointer;font-size:9px;padding-top:3px;padding-bottom:3px;overflow:hidden;">${rec
            .position.name || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</div>`
    },
    selectCell(item) {
      const data = item.target.dataset
      if (data.recordId) {
        if (data.timeoff !== '') {
          this.timeoffMessage = data.timeoff
          this.timeoffAlert = true
          return
        }
        if (!this.selectedPosition.id) {
          this.showPositions = true
          return
        }
        const record = {
          id: parseInt(data.recordId),
          budget_id: parseInt(data.budgetId),
          position_id: parseInt(this.selectedPosition.id),
          employee_id: parseInt(data.employeeId),
          from: parseInt(data.hour),
          to: parseInt(data.hour) + 1
        }
        this.recordData = record
        switch (this.selectedPosition.id) {
          case -1:
            if (record.id !== 0) {
              Store.dispatch('DELETE_SCHEDULE', record)
            }
            break
          default:
            this.saveSchedule()
        }
      }
    },
    handleOk() {
      this.alertMessage = ''
      this.showAlert = false
      Object.assign(this.recordData, { forced: true })
      this.saveSchedule()
    },
    saveSchedule() {
      Store.dispatch('SAVE_SCHEDULE', this.recordData)
    },
    loadData() {
      const prevData = getPersistedValue(LOCAL_STORAGE_VARS.GRID)
      const data = {
        date: this.record._date || prevData.date,
        branch_id: this.record.branch_id || prevData.branch_id
      }
      persistValue(LOCAL_STORAGE_VARS.GRID, data)
      Store.dispatch('LOAD_SCHEDULE', data)
    },
    goProgram() {
      this.$router.push({ name: 'Program' })
    },
    goBack() {
      this.$router.push({ name: 'Budgets' })
    },
    printGrid() {
      this.$nextTick(() => {
        window.print()
      })
    },
    getLastTimeoff(id) {
      const item = this.allTimeoffs.rows.find(item => item.employee_id === id)
      return item ? 'Último franco cargado: ' + item.date : ''
    },
    selectPosition(item) {
      const data = item.target.dataset
      if (data.positionId) {
        const pos = {
          id: data.positionId,
          name: data.positionName,
          color: data.positionColor
        }
        this.selectedPosition = pos
        this.showPositions = false
      }
    },
    deleteSector() {
      const pos = {
        id: -1,
        name: 'Borrar actividad',
        color: 'red'
      }
      this.selectedPosition = pos
    },
    deActivate() {
      const pos = {
        id: 0,
        name: this.text,
        color: '#ccc'
      }
      this.selectedPosition = pos
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
    }
    Store.dispatch('LOAD_POSITIONS')
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_ALL_TIMEOFFS_BY_DATE', this.record._date)
    this.selectedPosition.name = this.text
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
  background-color: white;
}

@media print {
  body {
    background-color: white;
  }

  h4 {
    font-size: 1em;
    margin: 0;
  }

  table {
    font-size: small;
  }

  .no-print,
  .no-print * {
    display: none !important;
  }

  @page {
    size: landscape;
  }
}

.pull-right {
  margin-top: 18px;
  float: right;
}

.pull-left {
  margin-top: 18px;
  float: left;
}

.compact {
  width: auto;
}

.position {
  display: inline-block;
}

.position-name {
  display: inline-block;
  font-weight: bold;
  font-size: 1.2em;
}

.position-group {
  cursor: pointer;
}

.error {
  color: red;
  font-weight: bold;
}

.last-timeoff {
  cursor: help;
}
</style>
