<template>
  <div id="app">
    <router-view />
    <b-modal id="error-modal" hide-footer>
      <template #modal-title>Error #{{ errorData.code }}</template>
      <div class="d-block text-center">
        <h3>{{ errorData.message }}</h3>
        <p class="my-4">{{ errorData.detail }}</p>
      </div>
      <b-button class="mt-3" variant="danger" block @click="handleOk">Cerrar</b-button>
    </b-modal>
  </div>
</template>

<script>
import Store from './store/store'
import { LOCAL_STORAGE_VARS, getPersistedValue } from './utils'
export default {
  name: 'App',
  data() {
    return {
      errorData: {}
    }
  },
  watch: {
    error() {
      const error = Store.state.error
      if (error) {
        this.$bvModal.show('error-modal')
        this.errorData = error
      }
    }
  },
  computed: {
    error() {
      return Store.state.error
    }
  },
  created() {
    const user = getPersistedValue(LOCAL_STORAGE_VARS.USER) || {}
    if (user.id) {
      Store.dispatch('SET_USER', user)
      Store.dispatch('SET_MENU_OPTION', this.$route.path)
    } else {
      this.$router.push({ name: 'Login' })
      return false
    }
  },
  methods: {
    handleOk() {
      this.$bvModal.hide('error-modal')
      Store.dispatch('RESET_ERROR')
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

.btn {
  border-radius: .3rem;
  padding: 8px 16px;
  margin: 0 6px;
}
</style>
