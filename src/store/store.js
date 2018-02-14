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
  profiles: [],
  schedules: [],
  status: [],
  employees: [],
  users: [],
  user: [],
  password: [],
  record: [],
  results: []
};

export default new Vuex.Store({
  state,
  actions: {
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

    [types.ADD_ITEM]({ commit }, item) {
      commit(types.SET_RECORD, {
        payload: item
      });
    },

    [types.SAVE_BRANCH]({ commit }, item) {
      Branches.saveBranch(item);
    },

    [types.DELETE_BRANCH]({ commit }, item) {
      Branches.deleteBranch(item.id);
    },

    [types.SAVE_SECTOR]({ commit }, item) {
      Sectors.saveSector(item);
    },

    [types.DELETE_SECTOR]({ commit }, item) {
      Sectors.deleteSector(item.id);
    },

    [types.SAVE_POSITION]({ commit }, item) {
      Positions.savePosition(item);
    },

    [types.DELETE_POSITION]({ commit }, item) {
      Positions.deletePosition(item.id);
    },

    [types.SAVE_USER]({ commit }, item) {
      Users.saveUser(item);
    },

    [types.DELETE_USER]({ commit }, item) {
      Users.deleteUser(item.id);
    },

    async [types.SAVE_EMPLOYEE]({ commit }, item) {
      const employee = Employees.saveEmployee(item);
      commit(types.SET_RESULTS, {
        payload: employee.data
      });
    },

    [types.DELETE_EMPLOYEE]({ commit }, item) {
      Employees.deleteEmployee(item.id);
    },

    [types.SAVE_AVAILABILITY]({ commit }, item) {
      Avaliability.saveAvailability(item);
    },

    [types.SAVE_BUDGET]({ commit }, item) {
      Budgets.saveBudget(item);
    },

    [types.DELETE_BUDGET]({ commit }, item) {
      Budgets.deleteBudget(item.id);
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
    }
  },

  mutations: {
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
      state.positions = payload;
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
      state.budgets = payload;
    },

    [types.SET_SCHEDULES]: (state, { payload }) => {
      const hours = payload.schedule.rows.reduce(function(
        prevVal,
        elem,
        index,
        array
      ) {
        return prevVal + elem.to - elem.from;
      },
      0);
      payload.schedule["scheduled"] = hours;
      state.schedules = payload.schedule;
      state.budget = payload.budget;
      state.results = payload;
    },

    [types.SET_RESULTS]: (state, { payload }) => {
      state.results = payload;
    },

    [types.CHANGE_PASSWORD_ALERT]: (state, { payload }) => {
      state.password = payload;
    }
  }
});
