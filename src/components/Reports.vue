<template>
  <b-container class="reports" fluid>
    <Header />
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Total horas por sector" active>
          <HoursPerSector />
        </b-tab>
      </b-tabs>
    </b-card>

  </b-container>
</template>

<script>
import Store from '../store/store'
import Header from './Header'
import HoursPerSector from '@/components/HoursPerSector'

export default {
  name: 'Reportes',
  data () {
    return {
    }
  },
  Store,
  components: {
    Header,
    HoursPerSector
  },
  computed: {
    isLogged () {
      return Store.state.user.id
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.path)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reports {
}
</style>
