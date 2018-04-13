<template>
  <b-container class="home" fluid>
    <Header />
    <b-jumbotron header="Turnos" lead="Administrador de programación de turnos" border-variant="dark">
      <div>
        <b-img thumbnail fluid alt="Turnos" src="../static/img/work-schedule.jpg" />
      </div>
    </b-jumbotron>
  </b-container>
</template>

<script>
import Header from './Header'
import Store from '../store/store'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    Header
  },
  computed: {
    isLogged () {
      return Store.state.user.id
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return false
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
    Store.dispatch('LOAD_BRANCHES')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
