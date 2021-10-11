export function fetchDepartmentsBegin (state) {
  state.departments = []
  state.error = null
  state.isLoading = true
}

export function fetchDepartmentsSuccess (state, { data, total, currentPage, filter }) {
  state.departments = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchDepartmentsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchDepartmentBegin (state) {
  state.department = {}
  state.isLoading = true
  state.error = null
}

export function fetchDepartmentSuccess (state, data) {
  state.department = data
  state.error = null
  state.isLoading = false
}

export function fetchDepartmentError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveDepartmentBegin (state) {
  state.error = null
  state.isSaved = false
  state.department = null
  state.isSaving = true
}

export function saveDepartmentSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveDepartmentError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteDepartmentBegin (state) {
  state.error = null
  state.isDeleted = false
  state.department = null
  state.isDeleting = true
}

export function deleteDepartmentSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteDepartmentError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}

export function fetchAllDepartmentsBegin (state) {
  state.allDepartments = []
  state.error = null
  state.isLoading = true
}

export function fetchAllDepartmentsSuccess (state, { data }) {
  state.allDepartments = data
  state.error = null
  state.isLoading = false
}

export function fetchAllDepartmentsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
