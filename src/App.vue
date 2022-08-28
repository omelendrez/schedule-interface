<template>
  <div id="app">
    <router-view />
    <b-modal id="error-modal" hide-footer conent-class="danger" centered>
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
    }
  },
  methods: {
    handleOk() {
      this.$bvModal.hide('error-modal')
      Store.dispatch('RESET_ERROR')
      const user = getPersistedValue(LOCAL_STORAGE_VARS.USER) || {}
      if (!user.id) {
        this.$router.push({ name: 'Login' })
      }
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
  background-color: rgba(0, 0, 0, .05);
}

.table-inactive {
  background-color: rgba(255, 0, 0, .1);
}

.table-selected {
  background-color: rgba(0, 0, 255, .1);
}

.btn {
  border-radius: .3rem;
  padding: 8px 16px;
  margin: 0 6px;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, .5);
}

.container {
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin-top: 2rem;
  padding: 2rem;
  max-width: 50vw;
  background-color: white;
}

.buttons {
  margin-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, .1);
  padding-top: 1rem;
}
</style>
