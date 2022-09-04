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
      Store.dispatch('LOAD_BRANCHES')
      Store.dispatch('LOAD_EMPLOYEES')
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
  font-weight: 400;
  background-color: rgba(0, 0, 0, .05);
}

@media print {
  body {
    background-color: white;
  }
}

.table-inactive {
  color: rgba(0, 0, 0, .4);
}

.table-selected {
  background-color: rgba(0, 255, 0, .3);
}

.btn {
  border-radius: .3rem;
  padding: 8px 16px;
  margin: 0 6px;
  min-width: 100px;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, .5);
}

.container {
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 2rem;
  max-width: 50vw;
  background-color: white;
  margin-top: 60px;
}

.buttons {
  border-top: 1px solid rgba(0, 0, 0, .1);
  padding-top: 1rem;
}
</style>
