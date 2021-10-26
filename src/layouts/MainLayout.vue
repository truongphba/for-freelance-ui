<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated class="bg-yellow-9 text-white">
      <div class="row">
        <div class="col">
          <q-toolbar>
            <q-toolbar-title>
              <router-link to="/" tag="div" style="cursor: pointer">
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
              </q-avatar>
              FFLance
              </router-link>
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="col">
          <q-toolbar style="justify-content: right" v-if="Object.keys(user).length === 0">
            <q-btn label="Login" rounded type="submit" outline color="white" class="text-white q-px-lg q-mx-sm" to="/login"/>
            <q-btn label="Signup" rounded type="submit" color="white" class="text-yellow-9 q-px-lg q-mx-sm" to="/register"/>
          </q-toolbar>
          <q-toolbar style="justify-content: right" v-else>
            <q-btn stretch flat label="Find Talent"  to="/freelancers"/>
            <q-separator dark vertical />
            <q-btn stretch flat label="My Jobs" to="/jobs"/>
            <q-separator dark vertical />
            <q-btn stretch flat label="About Us" />
            <q-separator dark vertical />
              <q-avatar style="cursor: pointer; margin-left: 20px">
                <img src="~assets/images/no-ava.png">
                <q-menu style="width: 200px">
                  <q-list style="width: 200px">
                    <q-item >
                      <q-item-section>
                        <p style="margin: 0">{{ user.username }}</p>
                        <template v-if="freelancer && Object.keys(freelancer).length !== 0">
                          <p style="font-size: 13px;color: darkgray; margin: 0">Freelancer</p>
                        </template>
                        <template v-else>
                          <router-link to="/register-freelancer" tag='p' style="font-size: 13px;color: darkgray; margin: 0; text-decoration: underline; cursor: pointer">Become Freelancer</router-link>
                        </template>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item >
                      <q-item-section>
                        <p style="margin: 0"><q-icon style="margin-right: 10px" name="fas fa-wallet" />Balance: <span class="text-green">0$</span></p>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
                      <q-item-section><p style="margin: 0"><q-icon style="margin-right: 10px" name="fas fa-user-cog" /> Setting</p></q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
                      <q-item-section @click="signOut"><p style="margin: 0"><q-icon style="margin-right: 10px" name="fas fa-sign-out-alt" /> Logout</p></q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-avatar>
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
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      left: false,
      iconArrow: null,
      show: null,
      permission: {},
      freelancer: {}
    }
  },
  async mounted () {
    this.iconArrow = 'expand_less'
    this.show = false
    this.checkRole()
  },
  methods: {
    ...mapActions({
      authLogout: 'auth/logout'
    }),
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
    },
    checkRole () {
      axios.get(process.env.SOURCE_URL + '/v1/freelancers/account/' + this.user.id).then(res => {
        this.freelancer = res.data.data
        console.log(res.data.data)
      }).catch(err => {
        console.log(err)
      })
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
