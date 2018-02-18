import Vue from "vue";
import Vuex from "vuex";

import Avaliability from "./../services/availability";
import Branches from "./../services/branches";
import Budgets from "./../services/budgets";
import Sectors from "./../services/sectors";
import Schedule from "./../services/schedule";
import Positions from "./../services/positions";
import Profiles from "./../services/profiles";
import Status from "./../services/status";
import Employees from "./../services/employees";
import Users from "./../services/users";

import * as types from "../store/mutation-types";

Vue.use(Vuex);

const state = {
  option: false,
  availability: [],
  branches: [],
  budgets: [],
  budget: {
    rows: {
      id: 0,
      date: "",
      hours: 0,
      footer: ""
    },
    count: 1
  },
  sectors: [{ rows: [] }],
  positions: [{ rows: [] }],
  positionSector: [],
  profiles: [],
  schedules: [],
  status: [],
  employees: [],
  employee: [],
  users: [],
  user: [],
  password: [],
  record: [],
  results: []
};

export default new Vuex.Store({
  state,
  actions: {
    [types.SET_MENU_OPTION]({ commit }, option) {
      commit(types.ASSIGN_MENU_OPTION, {
        payload: option
      });
    },

    [types.ADD_ITEM]({ commit }, item) {
      commit(types.SET_RECORD, {
        payload: item
      });
    },

    async [types.LOGIN]({ commit }, payload) {
      const user = await Users.login(payload);
      commit(types.SET_USER, {
        payload: user.data
      });
    },

    [types.LOGOUT_USER]({ commit }) {
      commit(types.SET_USER, {
        payload: { id: null }
      });
    },

    async [types.CHANGE_PASSWORD]({ commit }, item) {
      const user = await Users.changePassword(item);
      commit(types.CHANGE_PASSWORD_ALERT, {
        payload: user.data
      });
    },

    async [types.LOAD_BRANCHES]({ commit }) {
      const branches = await Branches.fetchBranches();
      commit(types.SET_BRANCHES, {
        payload: branches.data
      });
    },
    async [types.LOAD_SECTORS]({ commit }) {
      const sectors = await Sectors.fetchSectors();
      commit(types.SET_SECTORS, {
        payload: sectors.data
      });
    },

    async [types.LOAD_POSITIONS]({ commit }) {
      const positions = await Positions.fetchPositions();
      commit(types.SET_POSITIONS, {
        payload: positions.data
      });
    },

    async [types.LOAD_SECTOR_POSITIONS]({ commit }, item) {
      const positions = await Positions.fetchSectorPositions(item);
      commit(types.SET_POSITIONS, {
        payload: positions.data
      });
    },

    async [types.LOAD_PROFILES]({ commit }) {
      const profiles = await Profiles.fetchProfiles();
      commit(types.SET_PROFILES, {
        payload: profiles.data
      });
    },

    async [types.LOAD_STATUS]({ commit }) {
      const status = await Status.fetchStatus();
      commit(types.SET_STATUS, {
        payload: status.data
      });
    },

    async [types.LOAD_EMPLOYEES]({ commit }) {
      const employees = await Employees.fetchEmployees();
      commit(types.SET_EMPLOYEES, {
        payload: employees.data
      });
    },

    async [types.LOAD_EMPLOYEE]({ commit }, item) {
      const employee = await Employees.fetchEmployee(item);
      commit(types.SET_EMPLOYEE, {
        payload: employee.data
      });
    },

    async [types.LOAD_BRANCH_EMPLOYEES]({ commit }, item) {
      const employees = await Employees.fetchBranchEmployees(item);
      commit(types.SET_EMPLOYEES, {
        payload: employees.data
      });
    },

    async [types.LOAD_USERS]({ commit }) {
      const users = await Users.fetchUsers();
      commit(types.SET_USERS, {
        payload: users.data
      });
    },

    async [types.LOAD_AVAILABILITY]({ commit }) {
      const availability = await Avaliability.fetchAvailability();
      commit(types.SET_AVAILABILITY, {
        payload: availability.data
      });
    },

    async [types.LOAD_BUDGETS]({ commit }) {
      const budgets = await Budgets.fetchBudgets();
      commit(types.SET_BUDGETS, {
        payload: budgets.data
      });
    },

    async [types.LOAD_SCHEDULES]({ commit }, payload) {
      const schedules = await Schedule.fetchBudgetSchedules(payload);
      commit(types.SET_SCHEDULES, {
        payload: schedules.data
      });
    },

    async [types.SAVE_BRANCH]({ commit }, item) {
      const branch = await Branches.saveBranch(item);
      commit(types.SET_RESULTS, {
        payload: branch.data
      })
    },

    async [types.DELETE_BRANCH]({ commit }, item) {
      const branch = await Branches.deleteBranch(item.id);
      commit(types.SET_RESULTS, {
        payload: branch.data
      })
    },

    async [types.SAVE_SECTOR]({ commit }, item) {
      const sector = await Sectors.saveSector(item);
      commit(types.SET_RESULTS, {
        payload: sector.data
      })
    },

    async [types.DELETE_SECTOR]({ commit }, item) {
      const sector = await Sectors.deleteSector(item.id);
      commit(types.SET_RESULTS, {
        payload: sector.data
      })
    },

    async [types.SAVE_POSITION]({ commit }, item) {
      const position = await Positions.savePosition(item);
      commit(types.SET_RESULTS, {
        payload: position.data
      });
    },

    async [types.DELETE_POSITION]({ commit }, item) {
      const position = await Positions.deletePosition(item.id);
      commit(types.SET_RESULTS, {
        payload: position.data
      })
    },

    async [types.SAVE_USER]({ commit }, item) {
      const user = await Users.saveUser(item);
      commit(types.SET_RESULTS, {
        payload: user.data
      });
    },

    async [types.DELETE_USER]({ commit }, item) {
      const user = await Users.deleteUser(item.id);
      commit(types.SET_RESULTS, {
        payload: user.data
      });
    },

    async [types.SAVE_EMPLOYEE]({ commit }, item) {
      const employee = await Employees.saveEmployee(item);
      commit(types.SET_RESULTS, {
        payload: employee.data
      });
    },

    async [types.DELETE_EMPLOYEE]({ commit }, item) {
      const employee = await Employees.deleteEmployee(item.id);
      commit(types.SET_RESULTS, {
        payload: employee.data
      })
    },

    async [types.SAVE_AVAILABILITY]({ commit }, item) {
      const availability = await Avaliability.saveAvailability(item);
      commit(types.SET_RESULTS, {
        payload: availability.data
      })
    },

    async [types.SAVE_BUDGET]({ commit }, item) {
      const budget = await Budgets.saveBudget(item);
      commit(types.SET_RESULTS, {
        payload: budget.data
      })
    },

    async [types.DELETE_BUDGET]({ commit }, item) {
      const budget = await Budgets.deleteBudget(item.id);
      commit(types.SET_RESULTS, {
        payload: budget.data
      })
    },

    async [types.SAVE_SCHEDULE]({ commit }, payload) {
      const schedule = await Schedule.saveSchedule(payload);
      commit(types.SET_RESULTS, {
        payload: schedule.data
      });
    },

    async [types.SCHEDULE_VERIFY_INPUT]({ commit }, payload) {
      const schedule = await Schedule.verifySchedule(payload);
      commit(types.SET_RESULTS, {
        payload: schedule.data
      });
    },

    async [types.DELETE_SCHEDULE]({ commit }, item) {
      const schedule = await Schedule.deleteSchedule(item.id);
      commit(types.SET_RESULTS, {
        payload: schedule.data
      });
    },

    async [types.LOAD_POSITION_SECTOR]({ commit }, payload) {
      const position = await Positions.fetchPositionSector();
      commit(types.SET_POSITION_SECTOR, {
        payload: position.data
      });
    }

  },

  mutations: {
    [types.ASSIGN_MENU_OPTION]: (state, { payload }) => {
      state.option = payload;
    },

    [types.SET_USER]: (state, { payload }) => {
      state.user = payload;
    },

    [types.SET_BRANCHES]: (state, { payload }) => {
      state.branches = payload;
    },

    [types.SET_SECTORS]: (state, { payload }) => {
      state.sectors = payload;
    },

    [types.SET_POSITIONS]: (state, { payload }) => {
      const positions = payload.rows;
      const records = []
      let record = {}
      for (let i = 0; i < positions.length; i++) {
        record = {
          id: positions[i].id,
          created_at: positions[i].created_at,
          name: positions[i].name,
          color: positions[i].color,
          div: `<div style="background-color:${positions[i].color};width:90px;border-radius:4px;" class="mx-auto">&nbsp;</div>`,
          sector_id: positions[i].sector_id,
          updated_at: positions[i].updated_at,
          "sector.name": positions[i]["sector.name"]
        }
        records.push(record)
      }
      state.positions = {
        rows: records,
        count: payload.count
      }
    },

    [types.SET_PROFILES]: (state, { payload }) => {
      state.profiles = payload;
    },

    [types.SET_STATUS]: (state, { payload }) => {
      state.status = payload;
    },

    [types.SET_EMPLOYEES]: (state, { payload }) => {
      state.employees = payload;
    },

    [types.SET_EMPLOYEE]: (state, { payload }) => {
      state.employee = payload;
    },

    [types.SET_USERS]: (state, { payload }) => {
      state.users = payload;
    },

    [types.SET_RECORD]: (state, { payload }) => {
      state.record = payload;
    },

    [types.SET_AVAILABILITY]: (state, { payload }) => {
      state.availability = payload;
    },

    [types.SET_BUDGETS]: (state, { payload }) => {
      const bud = payload.rows
      const weekdays = Budgets.weekdays
      for (let i = 0; i < bud.length; i++) {
        bud[i].weekday = weekdays[bud[i].weekday]
      }
      payload.rows = bud
      state.budgets = payload;
    },

    [types.SET_SCHEDULES]: (state, { payload }) => {
      const hours = payload.schedule.rows.reduce((prevVal, elem, index, array) => { return prevVal + elem.to - elem.from; }, 0);
      payload.schedule["scheduled"] = hours;
      const bud = payload.budget.rows
      const weekdays = Budgets.weekdays
      bud.weekday = weekdays[bud.weekday]
      payload.budget.rows = bud
      state.budget = payload.budget;
      state.schedules = payload.schedule;
      state.results = payload;
    },

    [types.SET_RESULTS]: (state, { payload }) => {
      state.results = payload;
    },

    [types.CHANGE_PASSWORD_ALERT]: (state, { payload }) => {
      state.password = payload;
    },

    [types.SET_POSITION_SECTOR]: (state, { payload }) => {
      const positions = payload.rows
      const formatted = []
      let record = {}
      for (let i = 0; i < positions.length; i++) {
        record = {
          text: `${positions[i]["sector.name"]} / ${positions[i].name}`,
          value: positions[i].id
        }
        formatted.push(record)
      }
      state.positionSector = formatted;
    }

  }
});
