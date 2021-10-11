import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/Services'

export async function loadServices ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchServicesBegin')
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
    const departmentsResponse = await httpClient.get('Departments/All')
    const departments = departmentsResponse.data
    const services = response.data
    for (let i = 0; i < services.length; i++) {
      services[i].departmentName = await departments.find(department => department.id === services[i].departmentId).name
    }
    commit('fetchServicesSuccess', {
      data: services,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchServicesError', error.response)
    return null
  }
}

export async function loadService ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchServiceBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchServiceSuccess', response)
  } catch (error) {
    commit('fetchServiceError', error.response)
  }
}

export async function saveService ({ commit }, object) {
  commit('saveServiceBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, object)
    } else {
      await httpClient.post(endPoint, object)
    }
    commit('saveServiceSuccess')
  } catch (error) {
    commit('saveServiceError', error.response)
  }
}

export async function deleteService ({ commit }, id) {
  commit('deleteServiceBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteServiceSuccess')
  } catch (error) {
    commit('deleteServiceError', error.response)
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
export async function loadAllServices ({ commit, dispatch }) {
  commit('fetchAllServicesBegin')
  try {
    const response = await httpClient.get(`${endPoint}/All`)
    commit('fetchAllServicesSuccess', {
      data: response.data
    })
  } catch (error) {
    commit('fetchAllServicesError', error.response)
    return null
  }
}
