<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="services"
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
        <Form :service="service"
              :is-saved="isSaved"
              :is-edit="isEdit"
              :error="error"
              :all-departments="allDepartments"
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
import Form from 'components/service/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Services',
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
          name: 'price',
          align: 'center',
          label: 'Price ($)',
          field: 'price'
        },
        {
          name: 'departmentName',
          label: 'Department',
          align: 'left',
          field: 'departmentName'
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
        },
        {
          label: 'Department',
          field: 'departmentId',
          type: 'select',
          options: []
        }
      ]
    }
  },
  async mounted () {
    await this.loadAllDepartments()
    this.filtersAttribute
      .find(x => x.field === 'departmentId')
      .options = [
        ...this.allDepartments
      ]
  },
  computed: {
    ...mapState('service', [
      'services',
      'total',
      'isLoading',
      'service',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    ...mapState('department', [
      'allDepartments'
    ]),
    filterStatuses () {
      return Constants.Status
    }
  },
  methods: {
    ...mapActions({
      loadServices: 'service/loadServices',
      loadService: 'service/loadService',
      saveService: 'service/saveService',
      deleteService: 'service/deleteService',
      clearError: 'service/clearError',
      loadAllDepartments: 'department/loadAllDepartments'
    }),
    async onRequest ({ data, done }) {
      await this.loadServices({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveService(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id != null) {
        this.isEdit = true
        await this.loadService(id)
      }
      this.isShow = true
    },
    async handleDelete ({ id, done }) {
      await this.deleteService(id)
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
