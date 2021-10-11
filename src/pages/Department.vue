<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="departments"
           :columns="columns"
           :is-loading="isLoading"
           :total="total"
           :filter="filter"
           :error="error"
           :is-deleted="isDeleted"
           @request="onRequest"
           @show="showData"
           @delete="handleDelete"
    >
      <template v-slot:filter-top>
        <FilterTable :filtersAttribute="filtersAttribute"
                     @doFilter="handleFilter"
                     @show="showData"
                     :filter-statuses="filterStatuses"
        />
      </template>
    </Table>
    <q-dialog v-model="isShow">
      <FormDialog :is-edit="isEdit" :is-large="true">
        <Form :department="department"
              :is-saved="isSaved"
              :is-edit="isEdit"
              :error="error"
              @save="handleSave"
              @close="handleClose"
        />
      </FormDialog>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from 'src/components/common/Table'
import FormDialog from 'src/components/common/FormDialog'
import FilterTable from 'src/components/common/FilterTable'
import Form from 'components/department/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Departments',
  components: {
    Form,
    Table,
    FormDialog,
    FilterTable
  },
  data () {
    return {
      isShow: false,
      isEdit: false,
      isDetail: false,
      filter: {},
      columns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name'
        },
        {
          name: 'created_at',
          align: 'left',
          label: 'Created At',
          field: 'createdAt'
        },
        {
          name: 'status',
          align: 'center',
          label: 'Status',
          field: 'status'
        },
        {
          name: 'action',
          align: 'left',
          label: 'Action'
        }
      ],
      filtersAttribute: [
        {
          label: 'Search',
          field: 'keyword',
          type: 'text'
        },
        {
          label: 'Status',
          field: 'status',
          type: 'select'
        }
      ]
    }
  },
  computed: {
    ...mapState('department', [
      'departments',
      'total',
      'isLoading',
      'department',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    filterStatuses () {
      return Constants.Status
    }
  },
  methods: {
    ...mapActions({
      loadDepartments: 'department/loadDepartments',
      loadDepartment: 'department/loadDepartment',
      saveDepartment: 'department/saveDepartment',
      deleteDepartment: 'department/deleteDepartment',
      clearError: 'department/clearError'
    }),
    async onRequest ({ data, done }) {
      await this.loadDepartments({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveDepartment(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id != null) {
        this.isEdit = true
        await this.loadDepartment(id)
      }
      this.isShow = true
    },
    async handleDelete ({ id, done }) {
      await this.deleteDepartment(id)
      if (done) {
        done()
      }
      await this.onRequest({
        data: this.currentPage
      })
    },
    handleFilter (filter) {
      this.filter = { ...filter }
    },
    async handleClose () {
      await this.onRequest({
        data: this.currentPage
      })
      this.isShow = false
    }
  }
}
</script>
