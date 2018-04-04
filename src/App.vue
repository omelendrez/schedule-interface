<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html {
  font-size: medium;
}
body {
  background-color: rgb(240, 240, 240) !important;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol" !important;
}
.table-inactive {
  color: red;
}
.table-selected {
  background-color: #f5f3ee;
}
</style>
