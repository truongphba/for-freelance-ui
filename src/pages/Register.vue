<template>
  <q-layout>
    <q-header elevated class="bg-yellow-9 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          FFLance
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card
          class="login-form"
          v-bind:style="$q.platform.is.mobile?{'width': '80%'}:{'width':'30%'}"
        >
          <q-card-section>
            <h4 class="text-center my-font text-weight-bold">Get your free account</h4>
            <q-form class="q-gutter-md" @submit="register">
              <div class="text-red text-body1 text-center">{{ this.error }}</div>
              <q-input filled v-model="username" label="Full Name" lazy-rules/>
              <q-input filled v-model="email" label="Email" lazy-rules/>
              <q-input type="password" filled v-model="password" label="Password" lazy-rules/>
              <div>
                <q-btn label="Register" rounded type="button" @click="submit" color="primary" class="full-width bg-yellow-9"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
    <q-footer elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center" style="font-size: 12px">
          © 2021 FFLance® Global Inc.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      error: ''
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions({
      register: 'auth/register'
    }),
    async submit () {
      const { username, email, password } = this
      this.register({ username, email, password })
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.error = 'Register fail!'
        })
    }
  }
}
</script>

<style>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background: linear-gradient(145deg, rgb(25, 169, 182) 15%, #19a9b6 70%) no-repeat 50% 50%;
}

.login-form {
  position: absolute;
}

</style>
