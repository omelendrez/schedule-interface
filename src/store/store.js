import Vue from 'vue'
import Vuex from 'vuex'

import Absenteeisms from './../services/absenteeisms'
import Branches from './../services/branches'
import Budgets from './../services/budgets'
import Sectors from './../services/sectors'
import Schedule from './../services/schedule'
import Positions from './../services/positions'
import Profiles from './../services/profiles'
import Status from './../services/status'
import Employees from './../services/employees'
import Users from './../services/users'
import Timeoffs from './../services/timeoffs'

import * as types from '../store/mutation-types'
import * as constants from './constants'

import {
  LOCAL_STORAGE_VARS,
  persistValue,
  removePersistedValues
} from '../utils'

Vue.use(Vuex)

const state = {
  option: false,
  branches: [],
  budgets: [],
  budget: {
    rows: {
      id: 0,
      date: '',
      hours: 0,
      footer: ''
    },
    count: 1
  },
  sectors: [{ rows: [] }],
  positions: [{ rows: [] }],
  positionSector: [],
  profiles: [],
  schedules: [],
  schedule: [],
  timeoffs: [],
  allTimeoffs: [],
  budgetTimeoffs: [],
  absenteeisms: [],
  status: [],
  employees: [],
  employee: [],
  employeesByPosition: [],
  users: [],
  user: [],
  password: [],
  record: [],
  results: [],
  selectedEmployee: [],
  selectedPosition: [],
  reportResults: []
}

export default new Vuex.Store({
  state,
  actions: {
    [types.SET_USER]({ commit }, user) {
      commit(types.SET_USER, {
        payload: user
      })
    },

    [types.SET_MENU_OPTION]({ commit }, option) {
      commit(types.ASSIGN_MENU_OPTION, {
        payload: option
      })
    },

    [types.ADD_ITEM]({ commit }, item) {
      commit(types.SET_RECORD, {
        payload: item
      })
    },

    [types.SET_VALUE]({ commit }, payload) {
      commit(types.SET_AUTOCOMPLETE_VALUE, {
        payload: payload
      })
    },

    [types.RESET_AUTOCOMPLETE]({ commit }) {
      commit(types.RESET_SELECTED)
    },

    async [types.LOGIN]({ commit }, payload) {
      const user = await Users.login(payload)
      // eslint-disable-next-line no-console
      persistValue(LOCAL_STORAGE_VARS.TOKEN, user.data.token)
      delete user.data.token
      persistValue(LOCAL_STORAGE_VARS.USER, user.data)
      commit(types.SET_USER, {
        payload: user.data
      })
    },

    [types.LOGOUT_USER]({ commit }) {
      removePersistedValues()
      commit(types.SET_USER, {
        payload: { id: null }
      })
    },

    async [types.CHANGE_PASSWORD]({ commit }, item) {
      const user = await Users.changePassword(item)
      commit(types.CHANGE_PASSWORD_ALERT, {
        payload: user.data
      })
    },

    async [types.LOAD_BRANCHES]({ commit }) {
      const branches = await Branches.fetchBranches()
      commit(types.SET_BRANCHES, {
        payload: branches.data
      })
    },

    async [types.SAVE_BRANCH]({ commit }, item) {
      const branch = await Branches.saveBranch(item)
      commit(types.SET_RESULTS, {
        payload: branch.data
      })
    },

    async [types.DELETE_BRANCH]({ commit }, item) {
      const branch = await Branches.deleteBranch(item.id)
      commit(types.SET_RESULTS, {
        payload: branch.data
      })
    },

    async [types.LOAD_ABSENTEEISMS]({ commit }) {
      const absenteeisms = await Absenteeisms.fetchAbsenteeisms()
      commit(types.SET_ABSENTEEISMS, {
        payload: absenteeisms.data
      })
    },

    async [types.SAVE_ABSENTEEISM]({ commit }, item) {
      const absenteeism = await Absenteeisms.saveAbsenteeism(item)
      commit(types.SET_RESULTS, {
        payload: absenteeism.data
      })
    },

    async [types.DELETE_ABSENTEEISM]({ commit }, item) {
      const absenteeism = await Absenteeisms.deleteAbsenteeism(item.id)
      commit(types.SET_RESULTS, {
        payload: absenteeism.data
      })
    },

    async [types.LOAD_SECTORS]({ commit }) {
      const sectors = await Sectors.fetchSectors()
      commit(types.SET_SECTORS, {
        payload: sectors.data
      })
    },

    async [types.LOAD_POSITIONS]({ commit }) {
      const positions = await Positions.fetchPositions()
      commit(types.SET_POSITIONS, {
        payload: positions.data
      })
    },

    async [types.LOAD_SECTOR_POSITIONS]({ commit }, item) {
      const positions = await Positions.fetchSectorPositions(item)
      commit(types.SET_SECTOR_POSITIONS, {
        payload: positions.data
      })
    },

    async [types.LOAD_PROFILES]({ commit }) {
      const profiles = await Profiles.fetchProfiles()
      commit(types.SET_PROFILES, {
        payload: profiles.data
      })
    },

    async [types.LOAD_STATUS]({ commit }) {
      const status = await Status.fetchStatus()
      commit(types.SET_STATUS, {
        payload: status.data
      })
    },

    async [types.LOAD_EMPLOYEES]({ commit }) {
      const employees = await Employees.fetchEmployees()
      commit(types.SET_EMPLOYEES, {
        payload: employees.data
      })
    },

    async [types.LOAD_EMPLOYEE]({ commit }, item) {
      const employee = await Employees.fetchEmployee(item)
      commit(types.SET_EMPLOYEE, {
        payload: employee.data
      })
    },

    async [types.LOAD_BRANCH_EMPLOYEES]({ commit }, item) {
      const employees = await Employees.fetchBranchEmployees(item)
      commit(types.SET_EMPLOYEES, {
        payload: employees.data
      })
    },

    async [types.LOAD_EMPLOYEES_BY_POSITION]({ commit }, item) {
      const employees = await Employees.fetchEmployeesByPosition(item)
      commit(types.SET_EMPLOYEES_BY_POSITION, {
        payload: employees.data
      })
    },

    async [types.LOAD_USERS]({ commit }) {
      const users = await Users.fetchUsers()
      commit(types.SET_USERS, {
        payload: users.data
      })
    },

    async [types.LOAD_BUDGETS]({ commit }) {
      const budgets = await Budgets.fetchBudgets()
      commit(types.SET_BUDGETS, {
        payload: budgets.data
      })
    },

    async [types.LOAD_SCHEDULES]({ commit }, payload) {
      const schedules = await Schedule.fetchBudgetSchedules(payload)
      commit(types.SET_SCHEDULES, {
        payload: schedules.data
      })
    },

    async [types.LOAD_SCHEDULE]({ commit }, payload) {
      const schedule = await Schedule.fetchSchedule(payload)
      commit(types.SET_SCHEDULE, {
        payload: schedule.data
      })
    },

    async [types.LOAD_TIMEOFF]({ commit }, payload) {
      const timeoff = await Schedule.fetchTimeoff(payload)
      commit(types.SET_TIMEOFF, {
        payload: timeoff.data
      })
    },

    async [types.LOAD_ALL_TIMEOFFS]({ commit }, payload) {
      const allTimeoffs = await Timeoffs.fetchAll()
      commit(types.SET_ALL_TIMEOFFS, {
        payload: allTimeoffs.data
      })
    },

    async [types.SAVE_SECTOR]({ commit }, item) {
      const sector = await Sectors.saveSector(item)
      commit(types.SET_RESULTS, {
        payload: sector.data
      })
    },

    async [types.DELETE_SECTOR]({ commit }, item) {
      const sector = await Sectors.deleteSector(item.id)
      commit(types.SET_RESULTS, {
        payload: sector.data
      })
    },

    async [types.SAVE_POSITION]({ commit }, item) {
      const position = await Positions.savePosition(item)
      commit(types.SET_RESULTS, {
        payload: position.data
      })
    },

    async [types.DELETE_POSITION]({ commit }, item) {
      const position = await Positions.deletePosition(item.id)
      commit(types.SET_RESULTS, {
        payload: position.data
      })
    },

    async [types.SAVE_USER]({ commit }, item) {
      const user = await Users.saveUser(item)
      commit(types.SET_RESULTS, {
        payload: user.data
      })
    },

    async [types.DELETE_USER]({ commit }, item) {
      const user = await Users.deleteUser(item.id)
      commit(types.SET_RESULTS, {
        payload: user.data
      })
    },

    async [types.SAVE_EMPLOYEE]({ commit }, item) {
      const employee = await Employees.saveEmployee(item)
      commit(types.SET_RESULTS, {
        payload: employee.data
      })
    },

    async [types.DELETE_EMPLOYEE]({ commit }, item) {
      const employee = await Employees.deleteEmployee(item.id)
      commit(types.SET_RESULTS, {
        payload: employee.data
      })
    },

    async [types.SAVE_BUDGET]({ commit }, item) {
      const budget = await Budgets.saveBudget(item)
      commit(types.SET_RESULTS, {
        payload: budget.data
      })
    },

    async [types.DELETE_BUDGET]({ commit }, item) {
      const budget = await Budgets.deleteBudget(item.id)
      commit(types.SET_RESULTS, {
        payload: budget.data
      })
    },

    async [types.SAVE_SCHEDULE]({ commit }, payload) {
      const schedule = await Schedule.saveSchedule(payload)
      commit(types.SET_RESULTS, {
        payload: schedule.data
      })
    },

    async [types.SCHEDULE_VERIFY_INPUT]({ commit }, payload) {
      const schedule = await Schedule.verifySchedule(payload)
      commit(types.SET_RESULTS, {
        payload: schedule.data
      })
    },

    async [types.DELETE_SCHEDULE]({ commit }, item) {
      const schedule = await Schedule.deleteSchedule(item.id)
      commit(types.SET_RESULTS, {
        payload: schedule.data
      })
    },

    async [types.LOAD_POSITION_SECTOR]({ commit }, payload) {
      const position = await Positions.fetchPositionSector()
      commit(types.SET_POSITION_SECTOR, {
        payload: position.data
      })
    },

    async [types.LOAD_TIMEOFFS_BY_DATE]({ commit }, payload) {
      const timeoffs = await Timeoffs.findByDate(payload)
      commit(types.SET_TIMEOFFS_BY_DATE, {
        payload: timeoffs.data
      })
    },

    async [types.LOAD_TIMEOFFS_BY_PERIOD]({ commit }, payload) {
      const timeoffs = await Timeoffs.findByPeriod(payload)
      commit(types.SET_TIMEOFFS_BY_PERIOD, {
        payload: timeoffs.data
      })
    },

    async [types.LOAD_TIMEOFFS]({ commit }, payload) {
      const timeoffs = await Timeoffs.fetchTimeoffs()
      commit(types.SET_TIMEOFFS, {
        payload: timeoffs.data
      })
    },

    async [types.SAVE_TIMEOFF]({ commit }, item) {
      const timeoff = await Timeoffs.saveTimeoff(item)
      commit(types.SET_RESULTS, {
        payload: timeoff.data
      })
    },

    async [types.DELETE_TIMEOFF]({ commit }, item) {
      const timeoff = await Timeoffs.deleteTimeoff(item.id)
      commit(types.SET_RESULTS, {
        payload: timeoff.data
      })
    },

    async [types.LAUNCH_CONSUMED_BY_SECTOR_REPORT]({ commit }, payload) {
      const results = await Schedule.getConsumedBySector(payload)
      commit(types.SET_RESULTS, {
        payload: results.data
      })
    },

    async [types.LAUNCH_BUDGET_VS_CONSUMED]({ commit }) {
      const results = await Schedule.getBudgetVsConsumed()
      commit(types.SET_RESULTS, {
        payload: results.data
      })
    }
  },

  mutations: {
    [types.ASSIGN_MENU_OPTION]: (state, { payload }) => {
      state.option = payload
    },

    [types.SET_USER]: (state, { payload }) => {
      state.user = payload
    },

    [types.SET_BRANCHES]: (state, { payload }) => {
      if (state.user.profile_id !== 1) {
        payload.rows = payload.rows.filter(item => {
          return item.id === state.user.branch_id
        })
        payload.count = payload.rows.length
      }
      state.branches = payload
    },

    [types.SET_ABSENTEEISMS]: (state, { payload }) => {
      state.absenteeisms = payload
    },

    [types.SET_SECTORS]: (state, { payload }) => {
      state.sectors = payload
    },

    [types.SET_POSITIONS]: (state, { payload }) => {
      const formattedRecords = payload.rows.map((p) => (
        {
          ...p,
          div: `<div data-position-id="${p.id}" data-position-name="${p['sector.name']} - ${p.name}" data-position-color="${p.color}" style="background-color:${p.color};width:21px;border-radius:4px;border:1px solid #ccc;cursor:pointer;" class="mx-auto">&nbsp</div>`,
          div2: `<div style="background-color:${p.text};width:21px;border-radius:4px;border:1px solid #ccc" class="mx-auto">&nbsp</div>`,
          'sector.name': p['sector.name']
        }
      ))
      state.positions = {
        rows: formattedRecords,
        count: payload.count
      }
    },

    [types.SET_PROFILES]: (state, { payload }) => {
      state.profiles = payload
    },

    [types.SET_STATUS]: (state, { payload }) => {
      state.status = payload
    },

    [types.SET_EMPLOYEES]: (state, { payload }) => {
      if (state.user.profile_id !== 1) {
        payload.rows = payload.rows.filter(item => {
          return item.branch_id === state.user.branch_id
        })
        payload.count = payload.rows.length
      }

      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : ''
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor
        }
      })

      state.employees = payload
    },

    [types.SET_EMPLOYEE]: (state, { payload }) => {
      state.employee = payload
    },

    [types.SET_EMPLOYEES_BY_POSITION]: (state, { payload }) => {
      const rows = payload.rows.filter(item => {
        return item['employee.branch_id'] === state.budget.rows.branch_id
      })
      const result = {
        count: rows.length,
        rows: rows
      }
      state.employeesByPosition = result
    },

    [types.SET_USERS]: (state, { payload }) => {
      if (state.user.profile_id !== 1) {
        payload.rows = payload.rows.filter(item => {
          return item.branch_id === state.user.branch_id
        })
        payload.count = payload.rows.length
      }
      state.users = payload
    },

    [types.SET_RECORD]: (state, { payload }) => {
      state.record = payload
    },

    [types.SET_BUDGETS]: (state, { payload }) => {
      if (state.user.profile_id !== 1) {
        payload.rows = payload.rows.filter(item => {
          return item.branch_id === state.user.branch_id
        })
        payload.count = payload.rows.length
      }

      const bud = payload.rows
      const weekdays = Budgets.weekdays
      for (let i = 0; i < bud.length; i++) {
        const item = bud[i]
        item.weekday = weekdays[item.weekday]
        if (item.id === state.record.id) {
          item._rowVariant = 'selected'
        }
      }
      payload.rows = bud
      state.budgets = payload
    },

    [types.SET_SCHEDULE]: (state, { payload }) => {
      const rows = payload.schedule.rows
      let hours = 0
      for (let i = 0; i < rows.length; i++) {
        const schedules = rows[i].schedules
        for (let j = 0; j < schedules.length; j++) {
          const sch = schedules[j]
          hours = hours + sch.to - sch.from
        }
      }
      payload.schedule.scheduled = hours
      state.schedule = payload.schedule
      const bud = payload.budget.rows
      const weekdays = Budgets.weekdays
      bud.weekday = weekdays[bud.weekday]
      payload.budget.rows = bud
      state.budget = payload.budget
    },

    [types.SET_SCHEDULES]: (state, { payload }) => {
      const hours = payload.schedule.rows.reduce(
        (prevVal, elem, index, array) => {
          return prevVal + elem.to - elem.from
        },
        0
      )
      payload.schedule['scheduled'] = hours
      const bud = payload.budget.rows
      const weekdays = Budgets.weekdays
      bud.weekday = weekdays[bud.weekday]
      payload.budget.rows = bud
      state.budget = payload.budget
      payload.schedule.rows = payload.schedule.rows.map(item => {
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor
        }
        const to = parseInt(item.to)
        item['_to'] = to > 24 ? to - 24 : to
        const from = parseInt(item.from)
        item['_from'] = from > 24 ? from - 24 : from
        return item
      })
      state.schedules = payload.schedule
      state.results = payload
    },

    [types.SET_RESULTS]: (state, { payload }) => {
      state.results = payload
    },

    [types.SET_TIMEOFFS_BY_DATE]: (state, { payload }) => {
      state.budgetTimeoffs = payload
    },

    [types.SET_TIMEOFFS_BY_PERIOD]: (state, { payload }) => {
      const rows = payload.rows.map(item => {
        switch (parseInt(item.week_day)) {
          case 0:
            item.week_day = 'Lun'
            break
          case 1:
            item.week_day = 'Mar'
            break
          case 2:
            item.week_day = 'Mie'
            break
          case 3:
            item.week_day = 'Jue'
            break
          case 4:
            item.week_day = 'Vie'
            break
          case 5:
            item.week_day = 'Sáb'
            break
          case 6:
            item.week_day = 'Dom'
            break
        }
        return item
      })
      payload.rows = rows
      state.timeoffs = payload
    },

    [types.CHANGE_PASSWORD_ALERT]: (state, { payload }) => {
      state.password = payload
    },

    [types.SET_TIMEOFF]: (state, { payload }) => {
      state.timeoffs = payload
    },

    [types.SET_ALL_TIMEOFFS]: (state, { payload }) => {
      state.allTimeoffs = payload
    },

    [types.SET_TIMEOFFS]: (state, { payload }) => {
      if (state.user.profile_id !== 1) {
        payload.rows = payload.rows.filter(item => {
          return item['employee.branch_id'] === state.user.branch_id
        })
        payload.count = payload.rows.length
      }
      state.timeoffs = payload
    },

    [types.SET_AUTOCOMPLETE_VALUE]: (state, { payload }) => {
      switch (payload.type) {
        case 'employee':
          state.selectedEmployee = payload.selected
          break
        case 'position':
          state.selectedPosition = payload.selected
          break
      }
    },

    [types.RESET_SELECTED]: state => {
      state.selectedEmployee = []
      state.selectedPosition = []
    },

    [types.SET_POSITION_SECTOR]: (state, { payload }) => {
      const positions = payload.rows
      const formatted = []
      let record = {}
      for (let i = 0; i < positions.length; i++) {
        record = {
          text: `${positions[i]['sector.name']} / ${positions[i].name}`,
          value: positions[i].id
        }
        formatted.push(record)
      }
      state.positionSector = formatted
    }
  }
})
