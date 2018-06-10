<template>
  <b-container class="absenteeism">
    <h1>Ausentismo</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-form-group horizontal id="name" label="Nombre" label-for="name">
        <b-form-input id="name" v-model.trim="form.name" required></b-form-input>
      </b-form-group>
      <div class="buttons">
        <b-button type="submit" variant="info">Guardar</b-button>
        <b-button type="reset" class="to-right">Volver</b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import Store from '../store/store'

export default {
  name: 'Absenteeism',
  data () {
    return {
      show: true,
      form: {
        name: '',
        id: 0
      }
    }
  },
  watch: {
    results () {
      const results = Store.state.results
      if (results.error) {
        return
      }
      this.$router.push({ name: 'Absenteeisms' })
    }
  },
  computed: {
    results () {
      return Store.state.results
    },
    isLogged () {
      return Store.state.user.id
    },
    item () {
      return Store.state.record
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      Store.dispatch('SAVE_ABSENTEEISM', this.form)
    },
    onReset (evt) {
      evt.preventDefault()
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.$router.push({ name: 'Absenteeisms' })
      })
    }
  },
  created () {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    if (this.item) {
      this.form.name = this.item.name
      this.form.id = this.item.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.absenteeism {
  background-color: white;
  padding: 60px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
  padding-top: 40px;
}
.to-right {
  float: right;
}
.buttons {
  margin: 0 auto;
}
</style>
