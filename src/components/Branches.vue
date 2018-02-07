<template>
  <div class="branches">
    <b-table striped hover :items="branches.rows"></b-table>
  </div>
</template>

<script>
import Store from "../store/store";

export default {
  name: "Branches",
  data() {
    return {};
  },
  computed: {
    branches() {
      return Store.state.branches;
    }
  },
  created() {
    Store.dispatch("LOAD_BRANCHES");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
