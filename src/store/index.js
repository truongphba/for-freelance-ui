import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

import auth from './auth'
import VueSlideoutPanel from 'vue2-slideout-panel'

Vue.use(Vuex)
Vue.use(VueSlideoutPanel)

export default function () {
  const store = new Vuex.Store({
    modules: {
      auth
    },
    plugins: [createPersistedState({ key: process.env.DATA_NAME })],
    strict: process.env.DEBUGGING
  })

  window.onstorage = function (e) {
    if (e.key === process.env.TOKEN_NAME) {
      if (e.newValue) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + e.newValue
      } else {
        axios.defaults.headers.common.Authorization = null
      }
    } else if (e.key === process.env.USER_NAME) {
      if (e.newValue) {
        store.commit('auth/authSuccess', JSON.parse(e.newValue))
      } else {
        store.commit('auth/authLogout')
      }
    }
  }
  return store
}
