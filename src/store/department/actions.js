import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/Departments'

export async function loadDepartments ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchDepartmentsBegin')
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
    commit('fetchDepartmentsSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchDepartmentsError', error.response)
    return null
  }
}

export async function loadDepartment ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchDepartmentBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchDepartmentSuccess', response)
  } catch (error) {
    commit('fetchDepartmentError', error.response)
  }
}

export async function saveDepartment ({ commit }, object) {
  commit('saveDepartmentBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, object)
    } else {
      await httpClient.post(endPoint, object)
    }
    commit('saveDepartmentSuccess')
  } catch (error) {
    commit('saveDepartmentError', error.response)
  }
}

export async function deleteDepartment ({ commit }, id) {
  commit('deleteDepartmentBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteDepartmentSuccess')
  } catch (error) {
    commit('deleteDepartmentError', error.response)
  }
}

export async function loadAllDepartments ({ commit, dispatch }) {
  commit('fetchAllDepartmentsBegin')
  try {
    const response = await httpClient.get(`${endPoint}/All`)
    commit('fetchAllDepartmentsSuccess', {
      data: response.data
    })
  } catch (error) {
    commit('fetchAllDepartmentsError', error.response)
    return null
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
