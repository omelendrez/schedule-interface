<template>
  <b-container class="reports" fluid>
    <Header />
    <b-card-group deck class="cards">
      <b-card class="card">
        <b-button class="card-text" variant="info" size="lg" href="#/consumed-hours"> Reporte de horas consumidas
        </b-button>
      </b-card>
      <b-card class="card">
        <b-button class="card-text" variant="info" size="lg" href="#/budget-actual"> Comparativa Presupuestado vs.
          Consumido </b-button>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'

export default {
  name: 'Reportes',
  data() {
    return {
    }
  },
  Store,
  components: {
    Header
  },
  computed: {
    isLogged() {
      return Store.state.user.id
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cards {
  margin-top: 32px;
}

.card {
  text-align: center;
}
</style>
