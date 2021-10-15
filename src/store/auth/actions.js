import axios from 'axios'
import { httpClient } from 'src/api/http'

export async function authRequest ({ commit, dispatch }, user) {
  return new Promise((resolve, reject) => {
    commit('authBegin')
    axios({
      url: process.env.SOURCE_URL + '/login',
      data: JSON.stringify({ email: user.email, password: user.password }),
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(async resp => {
        const data = resp.data
        await localStorage.setItem(process.env.TOKEN_NAME, data.accessToken)
        axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken
        const response = await httpClient.get('/users/information')
        commit('authSuccess', {
          token: data.accessToken,
          user: response
        })
        resolve(resp)
      })
      .catch(err => {
        commit('authError', err)
        localStorage.removeItem(process.env.TOKEN_NAME)
        reject(err)
      })
  })
}
export async function register ({ commit, dispatch }, user) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.SOURCE_URL + '/register',
      data: JSON.stringify({ email: user.email, password: user.password, username: user.username }),
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
  })
}
export async function logout ({ commit }) {
  if (localStorage.getItem(process.env.TOKEN_NAME)) {
    try {
      await httpClient.get('/logout')
    } catch (error) {
    }
  }
  commit('authLogout')
  localStorage.removeItem(process.env.TOKEN_NAME)
  localStorage.removeItem(process.env.USER_NAME)
}
