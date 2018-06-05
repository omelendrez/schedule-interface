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
      <h5>
        Total horas presupuesto: {{totalHoursBudget}} / Total horas asignadas: {{totalScheduledHours}}
      </h5>

      <div @click="showPositions = true" class="position-group">
        <div class="position">Sector seleccionado:</div>
        <div class="position-color" v-bind:style="{background:selectedPosition.color}">&nbsp;</div>
        <div class="position-name">{{selectedPosition.name}}</div>
        <div class="pull-right error" :show="showError">{{ errorMessage }}</div>
      </div>
      <b-table small bordered :items="scheduleRows" @click.native="selectCell($event)" :fields="fields" head-variant="light" class="schedule-table">
        <template slot="fullName" slot-scope="data">
          {{data.item["badge"]}} {{data.item["last_name"]}}, {{data.item["first_name"]}}
        </template>
      </b-table>

      <b-card title="Mensaje" class="mb-2" v-show="footer">
        <p class="card-text"> {{ footer }} </p>
      </b-card>

      <b-modal v-model="showAlert" header-bg-variant="info" title="Aviso" header-text-variant="light" centered @ok="handleOk" ok-title="Si. Continuar" cancel-title="No. Dejar como está" cancel-variant="danger">
        <strong>{{alertMessage}}.</strong> Querés continuar?
      </b-modal>

      <b-modal v-model="showPositions" header-bg-variant="info" title="Sectores" header-text-variant="light" centered ok-only>
        <b-table small :items="positionRows" :fields="colorFields" head-variant="light" hover @click.native="selectPosition($event)" />
        <hr />
        <div>
          <div class="delete-sector" @click="deleteSector"></div>
          <div class="in-line">Borrar actividad</div>
        </div>
        <div>
          <div class="de-activate" @click="deActivate"></div>
          <div class="in-line">Desactivar click</div>
        </div>
      </b-modal>

      <b-table bordered :items="timeoffRows" :fields="timeoffFields" head-variant="light" class="compact pull-left">
        <template slot="fullName" slot-scope="data">
          {{data.item["badge"]}} {{data.item["last_name"]}}, {{data.item["first_name"]}}
        </template>
      </b-table>

    </div>

  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'
import { hoursLimit } from './../store/constants'

export default {
  name: 'Grid',
  data () {
    return {
      alertMessage: '',
      showError: false,
      errorMessage: '',
      fields: [
        {
          key: 'fullName',
          label: 'Empleado',
          class: 'p-1',
          thStyle: {
            width: '320px'
          }
        },
        {
          key: 'h06',
          label: '06',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h07',
          label: '07',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h08',
          label: '08',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h09',
          label: '09',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h10',
          label: '10',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h11',
          label: '11',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h12',
          label: '12',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h13',
          label: '13',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h14',
          label: '14',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h15',
          label: '15',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h16',
          label: '16',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h17',
          label: '17',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h18',
          label: '18',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h19',
          label: '19',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h20',
          label: '20',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h21',
          label: '21',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h22',
          label: '22',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h23',
          label: '23',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h24',
          label: '24',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'h25',
          label: '01',
          class: 'text-center p-0 pt-1'
        },
        {
          key: 'hours',
          label: 'Horas',
          class: 'text-center p-0 pt-1'
        }
      ],
      scheduleRows: [],
      positionRows: [],
      timeoffRows: [],
      recordData: {},
      showAlert: false,
      showPositions: false,
      weekday: null,
      selectedPosition: {
        name: ''
      },
      text: 'Haga click aquí para seleccionar un Sector',
      colorFields: [
        {
          key: 'color',
          label: '&nbsp;',
          class: 'p-1 m-0'
        },
        {
          key: 'sector_position',
          label: 'Sector / Función',
          class: 'p-1 m-0'
        },
        {
          key: 'hours',
          label: 'Horas',
          class: 'text-right p-1 m-0'
        }
      ],
      timeoffFields: [
        {
          key: 'fullName',
          label: 'PERSONAL DE FRANCO'
        }
      ]
    }
  },
  components: {
    Header
  },
  watch: {
    results () {
      Store.dispatch('LOAD_POSITIONS')
    },
    schedule () {
      const rows = this.schedule.rows
      this.weekday = this.budget._weekday
      this.loadGrid(rows)
    },
    budgetTimeoffs () {
      const items = this.budgetTimeoffs.rows
      const list = []
      for (let i = 0; i < items.length; i++) {
        let item = {
          badge: items[i]['employee']['badge'],
          first_name: items[i]['employee']['first_name'],
          last_name: items[i]['employee']['last_name']
        }
        list.push(item)
      }
      this.timeoffRows = list
    },
    positions () {
      const positionRows = []
      const positions = this.positions.rows
      for (let i = 0; i < positions.length; i++) {
        const pos = positions[i]
        let position = {}
        position.color = pos.div
        position.hours = 0
        position.id = pos.id
        position.sector_position = `${pos['sector.name']} - ${pos['name']}`
        positionRows.push(position)
      }
      this.positionRows = positionRows
      this.loadData()
    }
  },
  computed: {
    results () {
      return Store.state.results
    },
    record () {
      return Store.state.record
    },
    budget () {
      return Store.state.budget.rows
    },
    schedule () {
      return Store.state.schedule
    },
    totalHoursBudget () {
      return Store.state.budget.rows.hours
    },
    totalScheduledHours () {
      return Store.state.schedule.scheduled
    },
    footer () {
      return Store.state.budget.rows.footer
    },
    budgetTimeoffs () {
      return Store.state.budgetTimeoffs
    },
    positions () {
      return Store.state.positions
    },
    isLogged () {
      return Store.state.user.id
    }
  },
  methods: {
    loadGrid (rows) {
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
        Employee.first_name = emp.first_name
        Employee.last_name = emp.last_name
        Employee.hours = 0
        const record = {
          id: 0,
          budget_id: this.record.id,
          position_id: 0,
          hours: 0,
          position: {
            color: ''
          }
        }
        for (let i = 1; i < 27; i++) {
          const hour = i < 10 ? `0${i.toString()}` : `${i.toString()}`
          this.fillCell(Employee, record, hour)
        }
        const data = emp.schedules
        if (data.length) {
          for (let i = 0; i < data.length; i++) {
            const rec = data[i]
            const hours = (parseInt(rec.to) - parseInt(rec.from))
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
            this.errorMessage = 'ATENCIÓN! Tenés empleados con menos de 4 horas asignadas'
            this.showError = true
          } else {
            this.errorMessage = ''
            this.showError = false
          }
        }
        this.scheduleRows.push(Employee)
      })
    },
    fillCell (Employee, rec, h) {
      Employee[`h${h}`] = `<div data-record-id="${rec.id}" data-budget-id="${rec.budget_id}" data-position-id="${rec.position_id}" data-employee-id="${Employee.id}" data-hour="${h}" style="background-color:${rec.position.color};cursor:pointer">&nbsp;</div>`
    },
    selectCell (item) {
      const data = item.target.dataset
      if (data.recordId) {
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
        let showAlert = false
        if (this.selectedPosition.id === -1) {
          if (record.id !== 0) {
            Store.dispatch('DELETE_SCHEDULE', record)
          }
        } else {
          this.scheduleRows.map(emp => {
            if (emp.id === parseInt(data.employeeId)) {
              if (parseInt(data.recordId) === 0) {
                if (emp.hours + 1 > hoursLimit) {
                  this.alertMessage = `Le estás asignando más de 8 horas a ${emp.first_name} ${emp.last_name}`
                  showAlert = true
                }
                if (emp.blockedFrom) {
                  if (data.hour >= emp.blockedFrom && data.hour <= emp.blockedTo - 1) {
                    this.alertMessage = `${emp.first_name} ${emp.last_name} tiene bloquedo de ${emp.blockedFrom} hs a ${emp.blockedTo} hs para este día de la semana`
                    showAlert = true
                  }
                }
              }
            }
          })
          if (showAlert) {
            this.showAlert = true
          } else {
            this.saveSchedule()
          }
        }
      }
    },
    handleOk () {
      this.saveSchedule()
    },
    saveSchedule () {
      Store.dispatch('SAVE_SCHEDULE', this.recordData)
    },
    selectPosition (item) {
      const data = item.target.dataset
      if (data.positionId) {
        const pos = {
          id: data.positionId,
          name: data.positionName,
          color: data.positionColor
        }
        this.selectedPosition = pos
      }
    },
    deleteSector () {
      const pos = {
        id: -1,
        name: 'Borrar actividad',
        color: 'red'
      }
      this.selectedPosition = pos
    },
    deActivate () {
      const pos = {
        id: 0,
        name: this.text,
        color: '#ccc'
      }
      this.selectedPosition = pos
    },
    loadData () {
      const data = {
        date: this.record._date,
        branch_id: this.record.branch_id
      }
      Store.dispatch('LOAD_SCHEDULE', data)
      Store.dispatch('LOAD_BUDGET_TIMEOFF', this.record._date)
    },
    goProgram () {
      this.$router.push({ name: 'Program' })
    },
    goBack () {
      this.$router.push({ name: 'Budgets' })
    },
    printGrid () {
      this.$nextTick(() => {
        window.print()
      })
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_POSITIONS')
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
.position-color {
  width: 21px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #ccc;
}
.position-group {
  cursor: pointer;
}
.in-line {
  height: 30px;
  display: inline-block;
  margin-left: 14px;
  vertical-align: middle;
}
.delete-sector {
  display: inline-block;
  width: 21px;
  height: 21px;
  border-radius: 4px;
  margin-left: 14px;
  cursor: pointer;
  border: 1px solid red;
}
.de-activate {
  display: inline-block;
  width: 21px;
  height: 21px;
  border-radius: 4px;
  margin-left: 14px;
  cursor: pointer;
  border: 1px solid #ccc;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
