<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated class="bg-yellow-9 text-white">
      <div class="row">
        <div class="col">
          <q-toolbar>
            <q-toolbar-title>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
              </q-avatar>
              FFLance
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="col">
          <q-toolbar style="justify-content: right">
            <q-btn label="Login" rounded type="submit" outline color="white" class="text-white q-px-lg q-mx-sm"/>
            <q-btn label="Signup" rounded type="submit" color="white" class="text-yellow-9 q-px-lg q-mx-sm"/>
          </q-toolbar>
        </div>
      </div>
    </q-header>
    <q-page-container class="container">
      <router-view/>
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      left: false,
      iconArrow: null,
      show: null,
      permission: {}
    }
  },
  async mounted () {
    this.iconArrow = 'expand_less'
    this.show = false
    console.log(this.user)
  },
  methods: {
    // ...mapActions({
    //   authLogout: 'auth/logout'
    // }),
    signOut () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push('/login')
        })
    },
    changeIconArrow: function () {
      if (this.iconArrow === 'expand_less') {
        this.show = true
        this.iconArrow = 'expand_more'
      } else {
        this.show = false
        this.iconArrow = 'expand_less'
      }
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ])
  }
}
</script>

<style>
.q-drawer__content {
  background-color: #304156;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: #1976d2;
}
.container{
  max-width: 70%;
  margin: auto;
}
</style>
