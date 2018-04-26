<template>
  <div>

    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/">
        <i class="fas fa-home text-primary"></i>
        Turnos Big Six
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <template v-if="isLogged">

          <b-navbar-nav class="admin">
            <b-nav-item v-if="isAdmin" v-bind:active="menuOption === '/branches'" href="#/branches">Locales</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/sectors'" href="#/sectors">Sectores</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/positions'" href="#/positions">Funciones</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/employees'" class="_employees" href="#/employees">Empleados</b-nav-item>
            <b-nav-item v-if="isAdmin" v-bind:active="menuOption === '/users'" href="#/users">Usuarios</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLogged">
            <b-nav-item v-bind:active="menuOption === '/budgets'" href="#/budgets">Presupuestos</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/timeoffs'" href="#/timeoffs">Francos</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="isLogged">
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <i class="fas fa-user text-success"></i>
                <strong>{{userFullName}}</strong>
              </template>
              <b-dropdown-item href="#/login">Cerrar sesión</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#/change_password">Cambiar password</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </template>

      </b-collapse>

    </b-navbar>

  </div>

</template>

<script>
import Store from '../store/store'

export default {
  name: 'Header',
  data () {
    return {
      tab: 0
    }
  },
  computed: {
    menuOption () {
      return Store.state.option
    },
    isLogged () {
      return Store.state.user.id
    },
    isAdmin () {
      return Store.state.user.profile_id === 1
    },
    userFullName () {
      return Store.state.user.full_name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin {
  margin: 0 auto;
}
</style>
