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
            <h4 class="text-center my-font text-weight-bold">Login to For Freelance</h4>
            <q-form class="q-gutter-md" @submit="login">
              <div class="text-red text-body1 text-center">{{ this.error }}</div>
              <q-input filled v-model="email" label="Email" lazy-rules/>

              <q-input type="password" filled v-model="password" label="Password" lazy-rules/>

              <div>
                <q-btn label="Login" rounded type="button" color="primary" @click="login" class="full-width bg-yellow-9"/>
              </div>
            </q-form>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <p class="text-center text-blue-grey-13">Don't have an FFLance account?</p>
            <div class="text-center">
              <q-btn label="Signup" rounded outline  type="submit" color="yellow-9"  class="q-px-xl" to="register"/>
            </div>
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
      email: '',
      password: '',
      error: ''
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
  },
  methods: {
    ...mapActions({
      authRequest: 'auth/authRequest'
    }),
    async login () {
      const { email, password } = this
      this.authRequest({ email, password })
        .then(() => {
          this.$router.push({ name: 'homepage' })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.error = 'Email or Password is incorrect!'
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
q-page-container{

}
</style>
