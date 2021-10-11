export function fetchServicesBegin (state) {
  state.services = []
  state.error = null
  state.isLoading = true
}

export function fetchServicesSuccess (state, { data, total, currentPage, filter }) {
  state.services = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchServicesError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchServiceBegin (state) {
  state.service = {}
  state.isLoading = true
  state.error = null
}

export function fetchServiceSuccess (state, data) {
  state.service = data
  state.error = null
  state.isLoading = false
}

export function fetchServiceError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveServiceBegin (state) {
  state.error = null
  state.isSaved = false
  state.service = null
  state.isSaving = true
}

export function saveServiceSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveServiceError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteServiceBegin (state) {
  state.error = null
  state.isDeleted = false
  state.service = null
  state.isDeleting = true
}

export function deleteServiceSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteServiceError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}

export function fetchAllServicesBegin (state) {
  state.allServices = []
  state.error = null
  state.isLoading = true
}

export function fetchAllServicesSuccess (state, { data }) {
  state.allServices = data
  state.error = null
  state.isLoading = false
}

export function fetchAllServicesError (state, error) {
  state.error = error
  state.isLoading = false
}
