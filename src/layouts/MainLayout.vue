<template>
  <q-layout view="lHh LpR lFf">
    <q-header reveal elevated class="bg-primary">
      <q-toolbar>
        <q-btn @click="left = !left" flat round dense icon="menu" class="q-mr-sm"/>
        <q-toolbar-title>{{ $route.meta.title }}</q-toolbar-title>
        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-btn flat round dense icon="fas fa-sign-out-alt" @click="signOut"/>
      </q-toolbar>

    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      side="left"
      elevated
    >
      <div style="height: calc(100% - 117px);padding:10px">
        <q-toolbar>
          <q-avatar>
          </q-avatar>
          <q-toolbar-title>Excellon</q-toolbar-title>
        </q-toolbar>
        <hr/>
        <q-scroll-area style="height:100%;">
          <q-list padding>
            <q-item v-if="user.departmentId === 1"
              active-class="tab-active"
              exact
              :to="{name: 'dashboard'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="dashboard"/>
              </q-item-section>

              <q-item-section>Dashboard</q-item-section>
            </q-item>
            <q-item v-if="user.departmentId === 1 || user.departmentId === 3"
              active-class="tab-active"
              :to="{name: 'departments'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-user-tag"/>
              </q-item-section>

              <q-item-section>Department</q-item-section>
            </q-item>
            <q-item v-if="user.departmentId === 1 || user.departmentId === 3"
              active-class="tab-active"
              :to="{name: 'employees'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-users"/>
              </q-item-section>

              <q-item-section>Employee</q-item-section>
            </q-item>
            <q-item v-if="user.departmentId === 1"
              active-class="tab-active"
              :to="{name: 'services'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-globe"/>
              </q-item-section>

              <q-item-section>Service</q-item-section>
            </q-item>
            <q-item v-if="user.departmentId === 1 || user.departmentId === 2"
              active-class="tab-active"
              :to="{name: 'clients'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-user-friends"/>
              </q-item-section>

              <q-item-section>Client</q-item-section>
            </q-item>
            <q-item v-if="user.departmentId === 1 || user.departmentId === 2"
              active-class="tab-active"
              :to="{name: 'products'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-luggage-cart"/>
              </q-item-section>

              <q-item-section>Products</q-item-section>
            </q-item>
            <q-item v-if="user.departmentId === 1 || user.departmentId === 4"
              active-class="tab-active"
              :to="{name: 'payments'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-money-check-alt"/>
              </q-item-section>

              <q-item-section>Payment</q-item-section>
            </q-item>
            <q-item v-if="user.departmentId === 1 || user.departmentId === 4"
                    active-class="tab-active"
                    :to="{name: 'contacts'}"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-id-card"/>
              </q-item-section>

              <q-item-section>Contacts</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view/>
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
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

body {
  background: #f1f1f1 !important;
}
</style>
