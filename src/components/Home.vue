<template>
  <b-container class="home" fluid>
    <Header />
    <b-jumbotron header="Turnos" lead="Administrador de programación de turnos"  bg-variant="info" text-variant="white" border-variant="dark">
    </b-jumbotron>
  </b-container>
</template>

<script>
import Header from "./Header";
import Store from "../store/store";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Header
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
