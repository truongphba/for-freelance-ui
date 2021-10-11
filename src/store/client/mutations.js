export function fetchClientsBegin (state) {
  state.clients = []
  state.error = null
  state.isLoading = true
}

export function fetchClientsSuccess (state, { data, total, currentPage, filter }) {
  state.clients = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchClientsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchClientBegin (state) {
  state.client = {}
  state.isLoading = true
  state.error = null
}

export function fetchClientSuccess (state, data) {
  state.client = data
  state.error = null
  state.isLoading = false
}

export function fetchClientError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveClientBegin (state) {
  state.error = null
  state.isSaved = false
  state.client = null
  state.isSaving = true
}

export function saveClientSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveClientError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteClientBegin (state) {
  state.error = null
  state.isDeleted = false
  state.client = null
  state.isDeleting = true
}

export function deleteClientSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteClientError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}

export function fetchAllClientsBegin (state) {
  state.allClients = []
  state.error = null
  state.isLoading = true
}

export function fetchAllClientsSuccess (state, { data }) {
  state.allClients = data
  state.error = null
  state.isLoading = false
}

export function fetchAllClientsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
