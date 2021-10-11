import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/Employees'

export async function loadEmployees ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchEmployeesBegin')
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
    const employees = response.data
    for (let i = 0; i < employees.length; i++) {
      employees[i].departmentName = await departments.find(department => department.id === employees[i].departmentId).name
    }
    commit('fetchEmployeesSuccess', {
      data: employees,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchEmployeesError', error.response)
    return null
  }
}

export async function loadEmployee ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchEmployeeBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchEmployeeSuccess', response)
  } catch (error) {
    commit('fetchEmployeeError', error.response)
  }
}

export async function saveEmployee ({ commit }, object) {
  commit('saveEmployeeBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, object)
    } else {
      await httpClient.post('/Employee/Register', object)
    }
    commit('saveEmployeeSuccess')
  } catch (error) {
    commit('saveEmployeeError', error.response)
  }
}

export async function deleteEmployee ({ commit }, id) {
  commit('deleteEmployeeBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteEmployeeSuccess')
  } catch (error) {
    commit('deleteEmployeeError', error.response)
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}

export async function loadAllEmployees ({ commit, dispatch }, departmentId) {
  commit('fetchAllEmployeesBegin')
  try {
    const response = await httpClient.get(`${endPoint}/All?departmentId=` + departmentId)
    commit('fetchAllEmployeesSuccess', {
      data: response.data
    })
  } catch (error) {
    commit('fetchAllEmployeesError', error.response)
    return null
  }
}
