export function authBegin (state) {
  state.error = null
  state.isLoading = true
  state.user = {}
  state.rawPermission = {}
}

export function authSuccess (state, { token, user }) {
  state.isLoading = false
  state.token = token
  state.user = user
  state.isLoggedIn = true
}

export function authError (state, err) {
  state.error = err
  state.isLoading = false
}

export function authLogout (state) {
  state.user = { }
  state.token = ''
  state.isLoggedIn = false
}

export function getUserInfoBegin (state) {
  state.user = { email: { value: null, status: null } }
  state.isLoading = true
}

export function getUserInfoSuccess (state, user) {
  state.user = user
  state.isLoading = false
}

export function getUserInfoError (state, error) {
  state.error = error
  state.isLoading = false
  state.user = { email: { value: null, status: null } }
}
