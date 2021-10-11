import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/contacts'

export async function loadContacts ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchContactsBegin')
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
    console.log(response.data)
    commit('fetchContactsSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchContactsError', error.response)
    return null
  }
}

export async function saveContact ({ commit }, object) {
  commit('saveContactBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, object)
    }
    commit('saveContactSuccess')
  } catch (error) {
    console.log(error)
    commit('saveContactError', error.response)
  }
}
export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
