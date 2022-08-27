<template>
  <b-container class="home" fluid>
    <Header />
    <b-jumbotron header="Turnos" lead="Administrador de programación de turnos" border-variant="dark">
      <div class="info">Hola {{ user.full_name.split(' ')[0] }}!</div>
      <b-img thumbnail fluid alt="Turnos" src="../static/img/work-schedule.jpg" />
    </b-jumbotron>
  </b-container>
</template>

<script>
import Header from './Header'
import Store from '../store/store'

export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    Header
  },
  computed: {
    isLogged() {
      return Store.state.user.id
    },
    user() {
      return Store.state.user
    }
  },
  created() {
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
.info {
  margin-bottom: 16px;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  width: 200px;
  background-color: red;
  text-align: center;
  color: #fff;
  padding: 6px;
  border-radius: 6px;
  box-shadow: 5px 5px 5px #aaaaaa;
}
</style>
