import Vue from 'vue'
import Vuex from 'vuex'
import Branches from './../services/branches'

import * as types from '../store/mutation-types'

Vue.use(Vuex)

const state = {
  branches: []
}

export default new Vuex.Store({
  state,
  actions: {
    async [types.LOAD_BRANCHES]({
      commit
    }) {
      const branches = await Branches.fetchBranches()
      commit(types.SET_BRANCHES, {
        payload: branches.data
      })
    }
  },
  mutations: {
    [types.SET_BRANCHES]: (state, {
      payload
    }) => {
      state.branches = payload
    }
  }
})
