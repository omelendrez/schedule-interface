<template>
  <div class="home">
    Home
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  created() {
    if (!this.$root.$data.logged) {
      // root = main.js
      this.$router.push({ name: "Branches" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
