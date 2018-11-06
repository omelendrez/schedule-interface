import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import ChangePassword from '@/components/ChangePassword'
import Header from '@/components/Header'
import Absenteeisms from '@/components/Absenteeisms'
import Absenteeism from '@/components/Absenteeism'
import Branches from '@/components/Branches'
import Branch from '@/components/Branch'
import Budgets from '@/components/Budgets'
import Budget from '@/components/Budget'
import Grid from '@/components/Grid'
import Program from '@/components/Program'
import Sectors from '@/components/Sectors'
import Sector from '@/components/Sector'
import Positions from '@/components/Positions'
import Position from '@/components/Position'
import Timeoffs from '@/components/Timeoffs'
import TimeoffReport from '@/components/TimeoffReport'
import Timeoff from '@/components/Timeoff'
import Employees from '@/components/Employees'
import Employee from '@/components/Employee'
import Users from '@/components/Users'
import User from '@/components/User'
import Reports from '@/components/Reports'
import ConsumedHours from '@/components/ConsumedHours'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/change_password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/absenteeisms',
      name: 'Absenteeisms',
      component: Absenteeisms
    },
    {
      path: '/absenteeism',
      name: 'Absenteeism',
      component: Absenteeism
    },
    {
      path: '/branches',
      name: 'Branches',
      component: Branches
    },
    {
      path: '/branch',
      name: 'Branch',
      component: Branch
    },
    {
      path: '/budgets',
      name: 'Budgets',
      component: Budgets
    },
    {
      path: '/budget',
      name: 'Budget',
      component: Budget
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    },
    {
      path: '/program',
      name: 'Program',
      component: Program
    },
    {
      path: '/sectors',
      name: 'Sectors',
      component: Sectors
    },
    {
      path: '/sector',
      name: 'Sector',
      component: Sector
    },
    {
      path: '/positions',
      name: 'Positions',
      component: Positions
    },
    {
      path: '/position',
      name: 'Position',
      component: Position
    },
    {
      path: '/timeoffs',
      name: 'Timeoffs',
      component: Timeoffs
    },
    {
      path: '/timeoff',
      name: 'Timeoff',
      component: Timeoff
    },
    {
      path: '/timeoff_report',
      name: 'TimeoffReport',
      component: TimeoffReport
    },
    {
      path: '/employees',
      name: 'Employees',
      component: Employees
    },
    {
      path: '/employee',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    },
    {
      path: '/consumed-hours',
      name: 'ConsumedHours',
      component: ConsumedHours
    }
  ]
})
