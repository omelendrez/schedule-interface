<template>
    <div>

    <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#/">Home</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
        <template v-if="isLogged">
        <b-navbar-nav  v-if="isAdmin">
            <b-nav-item href="#/branches">Locales</b-nav-item>
            <b-nav-item href="#/sectors">Sectores</b-nav-item>
            <b-nav-item href="#/positions">Funciones</b-nav-item>
            <b-nav-item href="#/employees">Empleados</b-nav-item>
            <b-nav-item href="#/users">Usuarios</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                    <em>{{userFullName}}</em>
                </template>
                <b-dropdown-item href="#/login">Cerrar sesión</b-dropdown-item>
            </b-nav-item-dropdown>

        </b-navbar-nav>
        </template>
    </b-collapse>

    </b-navbar>

    <!-- navbar-1.vue -->
    <div v-if="isLogged">
      <b-nav pills>
        <b-nav-item href="#/availability">Disponibilidad</b-nav-item>
        <b-nav-item href="#/budgets">Presupuestos</b-nav-item>
        <b-nav-item href="#/grid">Grilla</b-nav-item>
      </b-nav>
    </div>
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
      return Store.state.user;
    },
    isAdmin() {
      return Store.state.user.profile_id === 1;
    },
    userFullName() {
      return Store.state.user.user_name;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
