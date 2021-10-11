import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/Payments'

export async function loadPayments ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchPaymentsBegin')
  try {
    cleanFilter(filter)
    const currentPage = {
      page: page,
      limit: limit
    }
    const queryParams = new URLSearchParams({
      ...filter,
      ...currentPage
    }).toString()
    const response = await httpClient.get(`${endPoint}?${queryParams}`)
    const clientsResponse = await httpClient.get('/Clients/All')
    const clients = clientsResponse.data
    const employeesResponse = await httpClient.get('/Employees/All')
    const employees = employeesResponse.data
    const payments = response.data
    for (let i = 0; i < payments.length; i++) {
      payments[i].clientName = await clients.find(client => client.id === payments[i].clientId).name
      payments[i].employeeName = await employees.find(employee => employee.id === payments[i].employeeId).userName
    }
    commit('fetchPaymentsSuccess', {
      data: payments,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchPaymentsError', error.response)
    return null
  }
}

export async function loadPayment ({ commit, dispatch }, id) {
  try {
    commit('fetchPaymentBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    const productResponse = await httpClient.get('Products/All')
    const products = productResponse.data
    const serviceResponse = await httpClient.get('Services/All')
    const services = serviceResponse.data
    for (let i = 0; i < response.paymentDetails.length; i++) {
      response.paymentDetails[i].startDate = await response.paymentDetails[i].startDate.split('T')[0]
      response.paymentDetails[i].endDate = await response.paymentDetails[i].endDate.split('T')[0]
      response.paymentDetails[i].productName = await products.find(product => product.id === response.paymentDetails[i].productId).name
      response.paymentDetails[i].serviceName = await services.find(service => service.id === response.paymentDetails[i].serviceId).name
    }
    commit('fetchPaymentSuccess', response)
  } catch (error) {
    commit('fetchPaymentError', error.response)
  }
}

export async function savePayment ({ commit }, object) {
  commit('savePaymentBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, object)
    } else {
      await httpClient.post(endPoint, object)
    }
    commit('savePaymentSuccess')
  } catch (error) {
    console.log(error)
    commit('savePaymentError', error.response)
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
