<template>
  <b-container class="position">
    <h1>Función</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-form-group horizontal id="sector_id" label="Sector" label-for="sector_id">
        <b-form-select v-model="form.sector_id" :options="sectors" class="mb-3" required />
      </b-form-group>
      <b-form-group horizontal id="name" label="Nombre" label-for="name">
        <b-form-input id="name" v-model.trim="form.name" required></b-form-input>
      </b-form-group>
      <b-form-group horizontal id="color" label="Color" label-for="color">
        <b-form-input id="color" type="color" v-model.trim="form.color" @change="cleanError" required
          class="color-selector"></b-form-input>
      </b-form-group>
      <b-form-group horizontal id="text" label="Texto" label-for="text">
        <b-form-input id="text" type="color" v-model.trim="form.text" @change="cleanError" required
          class="color-selector"></b-form-input>
      </b-form-group>
      <div class="buttons">
        <b-button type="submit" variant="info">Guardar</b-button>
        <b-button type="reset" class="to-right">Volver</b-button>
      </div>
      <b-alert variant="danger" :show="errorShow">{{ errorMsg }}</b-alert>
    </b-form>
  </b-container>
</template>

<script>
import Store from '../store/store'

export default {
  name: 'Position',
  data() {
    return {
      form: {
        id: 0,
        name: '',
        color: '#ffffff',
        text: '#000000',
        sector_id: 0
      },
      show: true,
      errorShow: false,
      errorMsg: ''
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        return
      }
      this.$router.push({ name: 'Positions' })
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    sectors() {
      const sectors = Store.state.sectors.rows
      const options = []
      for (let i = 0; i < sectors.length; i++) {
        options.push({
          value: sectors[i].id,
          text: sectors[i].name
        })
      }
      return options
    },
    item() {
      return Store.state.record
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Store.dispatch('SAVE_POSITION', this.form)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.name = ''
      this.form.sector_id = 0
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.$router.push({ name: 'Positions' })
      })
    },
    cleanError() {
      this.errorShow = false
      this.errorMsg = ''
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    if (this.item) {
      this.form.id = this.item.id
      this.form.name = this.item.name
      this.form.color = this.item.color
      this.form.text = this.item.text
      this.form.sector_id = this.item.sector_id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-selector {
  max-width: 40px;
}
</style>
