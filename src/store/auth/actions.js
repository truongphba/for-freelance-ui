import axios from 'axios'
import { httpClient } from 'src/api/http'

export async function authRequest ({ commit, dispatch }, user) {
  const querystring = require('querystring')

  return new Promise((resolve, reject) => {
    commit('authBegin')
    axios({
      url: process.env.SOURCE_URL + '/login',
      data: querystring.stringify({ grant_type: 'password', userName: user.username, password: user.password }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(async resp => {
        const data = resp.data
        await localStorage.setItem(process.env.TOKEN_NAME, data.access_token)
        axios.defaults.headers.common.Authorization = 'Bearer ' + data.access_token
        const response = await httpClient.get('/Employee/EmployeeInfo')
        console.log(response)
        commit('authSuccess', {
          token: data.access_token,
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
