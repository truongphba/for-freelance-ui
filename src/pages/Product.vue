<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="products"
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
        <Form :product="product"
              :all-clients="allClients"
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
import Form from 'components/product/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Products',
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
          name: 'description',
          label: 'Description',
          align: 'left',
          field: 'description'
        },
        {
          name: 'clientName',
          label: 'Client',
          align: 'left',
          field: 'clientName'
        },
        {
          name: 'created_at',
          align: 'center',
          label: 'Created At',
          field: 'created_at'
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
          field: 'name',
          type: 'text'
        },
        {
          label: 'Status',
          field: 'status',
          type: 'select'
        },
        {
          label: 'Client',
          field: 'clientId',
          type: 'select',
          options: []
        }
      ]
    }
  },
  async mounted () {
    await this.loadAllClients()
    this.filtersAttribute
      .find(x => x.field === 'clientId')
      .options = [
        ...this.allClients
      ]
  },
  computed: {
    ...mapState('product', [
      'products',
      'total',
      'isLoading',
      'product',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    ...mapState('client', [
      'allClients'
    ]),
    filterStatuses () {
      return Constants.Status
    }
  },
  methods: {
    ...mapActions({
      loadProducts: 'product/loadProducts',
      loadProduct: 'product/loadProduct',
      saveProduct: 'product/saveProduct',
      deleteProduct: 'product/deleteProduct',
      loadAllClients: 'client/loadAllClients',
      clearError: 'product/clearError'
    }),
    async onRequest ({ data, done }) {
      await this.loadProducts({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveProduct(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id) {
        this.isEdit = true
        await this.loadProduct(id)
      }
      this.isShow = true
    },
    async handleDelete ({ id, done }) {
      await this.deleteProduct(id)
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
    filterFn (val, update, option) {
      if (val === '') {
        update(() => {
          this.options = option
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = option.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
