export function fetchEmployeesBegin (state) {
  state.employees = []
  state.error = null
  state.isLoading = true
}

export function fetchEmployeesSuccess (state, { data, total, currentPage, filter }) {
  state.employees = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchEmployeesError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchEmployeeBegin (state) {
  state.employee = {}
  state.isLoading = true
  state.error = null
}

export function fetchEmployeeSuccess (state, data) {
  state.employee = data
  state.error = null
  state.isLoading = false
}

export function fetchEmployeeError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveEmployeeBegin (state) {
  state.error = null
  state.isSaved = false
  state.employee = null
  state.isSaving = true
}

export function saveEmployeeSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveEmployeeError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteEmployeeBegin (state) {
  state.error = null
  state.isDeleted = false
  state.employee = null
  state.isDeleting = true
}

export function deleteEmployeeSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteEmployeeError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}

export function fetchAllEmployeesBegin (state) {
  state.allEmployees = []
  state.error = null
  state.isLoading = true
}

export function fetchAllEmployeesSuccess (state, { data }) {
  state.allEmployees = data
  state.error = null
  state.isLoading = false
}

export function fetchAllEmployeesError (state, error) {
  state.error = error
  state.isLoading = false
}
export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
