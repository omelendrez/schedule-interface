<template>
    <div>

    <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#/">Turnos Big Six</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <template v-if="isLogged">

          <b-navbar-nav  v-if="isAdmin" class="admin">
            <b-nav-item href="#/branches">Locales</b-nav-item>
            <b-nav-item href="#/sectors">Sectores</b-nav-item>
            <b-nav-item href="#/positions">Funciones</b-nav-item>
            <b-nav-item href="#/employees">Empleados</b-nav-item>
            <b-nav-item href="#/users">Usuarios</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLogged">
            <b-nav-item href="#/availability">Disponibilidad</b-nav-item>
            <b-nav-item href="#/budgets">Presupuestos</b-nav-item>
            <b-nav-item href="#/grid">Grilla</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="isLogged">
            <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
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
import Store from "../store/store";

export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    isAdmin() {
      return Store.state.user.profile_id === 1;
    },
    userFullName() {
      return Store.state.user.full_name;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin {
  margin: 0 auto;
}
</style>
