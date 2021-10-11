<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="payments"
           :columns="columns"
           :is-loading="isLoading"
           :total="total"
           :filter="filter"
           :error="error"
           :is-deleted="isDeleted"
           @request="onRequest"
           @show="showData"
           @delete="handleDelete"
           :is-order="true"
    >
      <template v-slot:filter-top>
        <FilterTable :filtersAttribute="filtersAttribute"
                     @doFilter="handleFilter"
                     @show="showData"
                     :filter-statuses="filterStatuses"
        />
      </template>
      <template v-slot:action="props">
        <div class="q-gutter-sm">
          <q-btn dense
                 color="primary"
                 icon="done"
                 v-if="props.row.status === 2"
                 @click="confirm({id: props.row.id, status: 1})">
            <q-tooltip>
              Confirm
            </q-tooltip>
          </q-btn>
          <q-btn dense
                 color="red"
                 icon="clear"
                 v-if="props.row.status === 2"
                 @click="confirm({id: props.row.id, status: 0})">
            <q-tooltip>
              Cancel
            </q-tooltip>
          </q-btn>
          <q-btn dense
                 color="warning"
                 icon="far fa-eye"
                 @click="showData(props.row.id)"
          >
            <q-tooltip>
              Detail
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </Table>
    <q-dialog v-model="isShow">
      <FormDialog :is-edit="isEdit" :is-large="true" :is-payment="isEdit">
        <Form :payment="payment"
              :is-saved="isSaved"
              :is-edit="isEdit"
              :error="error"
              @save="handleSave"
              @close="handleClose"
              :all-clients="allClients"
              :filter-statuses="filterStatuses"
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
import Form from 'components/payment/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Payments',
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
          name: 'id',
          label: 'Id',
          align: 'center',
          field: 'id'
        },
        {
          name: 'clientName',
          label: 'Client',
          align: 'left',
          field: 'clientName'
        },
        {
          name: 'employeeName',
          label: 'Employee',
          align: 'left',
          field: 'employeeName'
        },
        {
          name: 'totalCost',
          label: 'Total Cost($)',
          align: 'left',
          field: 'totalCost'
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
          label: 'Payment Id',
          field: 'id',
          type: 'text'
        },
        {
          label: 'Client',
          field: 'clientId',
          type: 'select',
          options: []
        },
        {
          label: 'Employee',
          field: 'employeeId',
          type: 'select',
          options: []
        },
        {
          label: 'Status',
          field: 'status',
          type: 'select'
        },
        {
          label: 'Created Date',
          field: 'createdAt',
          type: 'date'
        }
      ]
    }
  },
  async mounted () {
    await this.loadAllClients()
    await this.loadAllEmployees(1)
    this.filtersAttribute
      .find(x => x.field === 'clientId')
      .options = [
        ...this.allClients
      ]
    this.filtersAttribute
      .find(x => x.field === 'employeeId')
      .options = [
        ...this.allEmployees
      ]
  },
  computed: {
    ...mapState('payment', [
      'payments',
      'total',
      'isLoading',
      'payment',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    ...mapState('client', [
      'allClients'
    ]),
    ...mapState('employee', [
      'allEmployees'
    ]),
    filterStatuses () {
      return Constants.OrderStatus
    }
  },
  methods: {
    ...mapActions({
      loadPayments: 'payment/loadPayments',
      loadPayment: 'payment/loadPayment',
      savePayment: 'payment/savePayment',
      clearError: 'payment/clearError',
      loadAllClients: 'client/loadAllClients',
      loadAllEmployees: 'employee/loadAllEmployees'
    }),
    async onRequest ({ data, done }) {
      await this.loadPayments({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.savePayment(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id != null) {
        this.isEdit = true
        await this.loadPayment(id)
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
    },
    async confirm (object) {
      const title = object.status === 1 ? 'Confirm' : 'Cancel'
      this.$q
        .dialog({
          title: 'Confirm',
          message: `Do you sure ${title} this contract?`,
          ok: 'Yes',
          cancel: 'No',
          persistent: true
        })
        .onOk(async () => {
          await this.savePayment(object)
          if (this.error) {
            this.$q.notify({
              color: 'red',
              message: 'Save payment fail'
            })
          } else {
            await this.onRequest({
              data: this.currentPage
            })
            this.$q.notify({
              color: 'green-4',
              message: 'Save payment success'
            })
          }
        })
    }
  }
}
</script>
