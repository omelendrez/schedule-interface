<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Store from './store/store'
import { LOCAL_STORAGE_VARS, getPersistedValue } from './utils'
export default {
  name: 'App',
  created() {
    const user = getPersistedValue(LOCAL_STORAGE_VARS.USER) || {}
    if (user.id) {
      Store.dispatch('SET_USER', user)
    }
  }
}
</script>

<style>
body {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol' !important;
  font-size: 14px;
}

.table-inactive {
  color: red;
}

.table-selected {
  background-color: #f5f3ee;
}
</style>
