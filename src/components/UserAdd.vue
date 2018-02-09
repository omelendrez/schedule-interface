<template>
  <b-container class="user-add">
    <Header />
    <h1>Usuario</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="form.show" id="addForm">

      <b-form-group id="profile_id" description="Seleccione un perfil." label="Perfil" label-for="profile_id">
        <b-form-select v-model="form.profile_id" :options="profiles" class="mb-3" />
      </b-form-group>

      <b-form-group id="user_name" description="Ingrese el nombre de usuario." label="Nombre de usuario" label-for="user_name" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
        <b-form-input id="user_name" :state="state" v-model.trim="form.user_name"></b-form-input>
      </b-form-group>

      <b-form-group id="full_name" description="Ingrese el nombre de usuario." label="Nombre completo" label-for="full_name">
        <b-form-input id="full_name" :state="state" v-model.trim="form.full_name"></b-form-input>
      </b-form-group>

      <b-form-group id="status_id" description="Seleccione un status." label="Status" label-for="status_id">
        <b-form-select v-model="form.status_id" :options="status" class="mb-3" />
      </b-form-group>

      <b-button type="submit" variant="primary">Guardar</b-button>
      <b-button type="reset" variant="info" class="to-right">Volver</b-button>

    </b-form>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Header from "./Header";
export default {
  name: "UserAdd",
  data() {
    return {
      form: {
        id: 0,
        user_name: "",
        full_name: "",
        profile_id: 0,
        show: true
      }
    };
  },
  components: {
    Header
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    profiles() {
      const profiles = Store.state.profiles.rows;
      const options = [];
      for (let i = 0; i < profiles.length; i++) {
        options.push({
          value: profiles[i].id,
          text: profiles[i].name
        });
      }
      return options;
    },
    status() {
      const status = Store.state.status.rows;
      const options = [];
      for (let i = 0; i < status.length; i++) {
        options.push({
          value: status[i].id,
          text: status[i].name
        });
      }
      return options;
    },
    item() {
      return Store.state.record;
    },
    state() {
      return this.form.user_name.length >= 6;
    },
    invalidFeedback() {
      if (this.form.user_name.length > 6) {
        return "";
      }
      if (this.form.user_name.length > 0) {
        return "Ingrese al menos 6 caracteres";
      }
    },
    validFeedback() {
      return this.state ? "Válido" : "";
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("SAVE_USER", this.form);
      setTimeout(() => {
        this.$router.push({ name: "Users" });
      }, 500);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.user_name = "";
      this.form.full_name = "";
      this.form.profile_id = 0;
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Users" });
      });
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    if (this.item) {
      this.form.id = this.item.id;
      this.form.user_name = this.item.user_name;
      this.form.full_name = this.item.full_name;
      this.form.profile_id = this.item.profile_id;
      this.form.status_id = this.item.status_id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-add {
  background-color: white;
  padding-bottom: 60px;
}
input,
select {
  max-width: 40%;
}
.to-right {
  float: right;
}
</style>
