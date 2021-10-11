export function fetchPaymentsBegin (state) {
  state.payments = []
  state.error = null
  state.isLoading = true
}

export function fetchPaymentsSuccess (state, { data, total, currentPage, filter }) {
  state.payments = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchPaymentsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchPaymentBegin (state) {
  state.payment = {}
  state.isLoading = true
  state.error = null
}

export function fetchPaymentSuccess (state, data) {
  state.payment = data
  state.error = null
  state.isLoading = false
}

export function fetchPaymentError (state, error) {
  state.error = error
  state.isLoading = false
}

export function savePaymentBegin (state) {
  state.error = null
  state.isSaved = false
  state.payment = null
  state.isSaving = true
}

export function savePaymentSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function savePaymentError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
