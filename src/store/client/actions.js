import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/Clients'

export async function loadClients ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchClientsBegin')
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
    console.log(response)
    commit('fetchClientsSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchClientsError', error.response)
    return null
  }
}

export async function loadClient ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchClientBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchClientSuccess', response)
  } catch (error) {
    commit('fetchClientError', error.response)
  }
}

export async function saveClient ({ commit }, object) {
  commit('saveClientBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, object)
    } else {
      await httpClient.post(endPoint, object)
    }
    commit('saveClientSuccess')
  } catch (error) {
    commit('saveClientError', error.response)
  }
}

export async function deleteClient ({ commit }, id) {
  commit('deleteClientBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteClientSuccess')
  } catch (error) {
    commit('deleteClientError', error.response)
  }
}

export async function loadAllClients ({ commit, dispatch }) {
  commit('fetchAllClientsBegin')
  try {
    const response = await httpClient.get(`${endPoint}/All`)
    commit('fetchAllClientsSuccess', {
      data: response.data
    })
  } catch (error) {
    commit('fetchAllClientsError', error.response)
    return null
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
