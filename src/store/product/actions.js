import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/products'

export async function loadProducts ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchProductsBegin')
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
    const clientResponse = await httpClient.get('Clients/All')
    const clients = clientResponse.data
    const products = response.data
    for (let i = 0; i < products.length; i++) {
      products[i].clientName = await clients.find(client => client.id === products[i].clientId).name
    }
    commit('fetchProductsSuccess', {
      data: products,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchProductsError', error.response)
    return null
  }
}

export async function loadProduct ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchProductBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchProductSuccess', response)
  } catch (error) {
    commit('fetchProductError', error.response)
  }
}

export async function saveProduct ({ commit }, object) {
  commit('saveProductBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, object)
    } else {
      await httpClient.post(endPoint, object)
    }
    commit('saveProductSuccess')
  } catch (error) {
    commit('saveProductError', error.response)
  }
}

export async function deleteProduct ({ commit }, id) {
  commit('deleteProductBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteProductSuccess')
  } catch (error) {
    commit('deleteProductError', error.response)
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}

export async function loadAllProducts ({ commit, dispatch }, clientId) {
  commit('fetchAllProductsBegin')
  try {
    const response = await httpClient.get(`${endPoint}/All?clientId=` + clientId)
    commit('fetchAllProductsSuccess', {
      data: response.data
    })
  } catch (error) {
    commit('fetchAllProductsError', error.response)
    return null
  }
}
