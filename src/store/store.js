import Vue from 'vue'
import Vuex from 'vuex'

import Branches from './../services/branches'
import Sectors from './../services/sectors'
import Positions from './../services/positions'
import Employees from './../services/employees'
import Users from './../services/users'

import * as types from '../store/mutation-types'

Vue.use(Vuex)

const state = {
  branches: [],
  sectors: [],
  positions: [],
  employees: [],
  users: [],
  user: [],
  record: []
}

export default new Vuex.Store({
  state,
  actions: {
    async [types.LOGIN]({
      commit
    }, payload) {
      const user = await Users.login(payload)
      if (!user.id) {
        commit(types.SET_USER, {
          payload: user.data
        })
      }
    },

    async [types.LOGOUT_USER]({
      commit
    }) {
      commit(types.RESET_USER)
    },

    async [types.LOAD_BRANCHES]({
      commit
    }) {
      const branches = await Branches.fetchBranches()
      commit(types.SET_BRANCHES, {
        payload: branches.data
      })
    },
    async [types.LOAD_SECTORS]({
      commit
    }) {
      const sectors = await Sectors.fetchSectors()
      commit(types.SET_SECTORS, {
        payload: sectors.data
      })
    },

    async [types.LOAD_POSITIONS]({
      commit
    }) {
      const positions = await Positions.fetchPositions()
      commit(types.SET_POSITIONS, {
        payload: positions.data
      })
    },

    async [types.LOAD_EMPLOYEES]({
      commit
    }) {
      const employees = await Employees.fetchEmployees()
      commit(types.SET_EMPLOYEES, {
        payload: employees.data
      })
    },

    async [types.LOAD_USERS]({
      commit
    }) {
      const users = await Users.fetchUsers()
      commit(types.SET_USERS, {
        payload: users.data
      })
    },

    [types.ADD_ITEM]({
      commit
    }, item) {
      commit(types.SET_RECORD, {
        payload: item
      })
    },

    [types.SAVE_BRANCH]({
      commit
    }, item) {
      Branches.saveBranch(item)
    },

    [types.DELETE_BRANCH]({
      commit
    }, item) {
      Branches.deleteBranch(item.id)
    }
  },

  mutations: {
    [types.SET_USER]: (state, {
      payload
    }) => {
      state.user = payload
    },

    [types.RESET_USER]: (state) => {
      state.user = {}
    },

    [types.SET_BRANCHES]: (state, {
      payload
    }) => {
      state.branches = payload
    },

    [types.SET_SECTORS]: (state, {
      payload
    }) => {
      state.sectors = payload
    },

    [types.SET_POSITIONS]: (state, {
      payload
    }) => {
      state.positions = payload
    },

    [types.SET_EMPLOYEES]: (state, {
      payload
    }) => {
      state.employees = payload
    },

    [types.SET_USERS]: (state, {
      payload
    }) => {
      state.users = payload
    },

    [types.SET_RECORD]: (state, {
      payload
    }) => {
      state.record = payload
    }
  }
})
