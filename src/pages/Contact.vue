<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="contacts"
           :columns="columns"
           :is-loading="isLoading"
           :total="total"
           :filter="filter"
           :error="error"
           @request="onRequest"
           :is-order="true"
    >
      <template v-slot:filter-top>
        <FilterTable :filtersAttribute="filtersAttribute"
                     @doFilter="handleFilter"
                     @show="showData"
                     :filter-statuses="filterStatuses"
                     :has-add-new="hasAddNew"
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
        </div>
      </template>
    </Table>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from 'src/components/common/Table'
import FilterTable from 'src/components/common/FilterTable'
import { Constants } from 'src/utils/const'

export default {
  name: 'Contact',
  components: {
    Table,
    FilterTable
  },
  data () {
    return {
      hasAddNew: false,
      isShow: false,
      filter: {},
      columns: [
        {
          name: 'name',
          label: 'Client Name',
          align: 'left',
          field: 'name'
        },
        {
          name: 'phoneNumber',
          align: 'left',
          label: 'Phone Number',
          field: 'phoneNumber'
        },
        {
          name: 'email',
          align: 'left',
          label: 'Email',
          field: 'email'
        },
        {
          name: 'companyName',
          align: 'center',
          label: 'Company Name',
          field: 'companyName'
        },
        {
          name: 'description',
          align: 'center',
          label: 'Description',
          field: 'description'
        },
        {
          name: 'status',
          align: 'center',
          label: 'Status',
          field: 'status'
        },
        {
          name: 'created_at',
          align: 'center',
          label: 'Created At',
          field: 'createdAt'
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
    ...mapState('contact', [
      'contacts',
      'total',
      'isLoading',
      'contact',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    filterStatuses () {
      return Constants.OrderStatus
    }
  },
  methods: {
    ...mapActions({
      loadContacts: 'contact/loadContacts',
      clearError: 'contact/clearError',
      saveContact: 'contact/saveContact'
    }),
    async onRequest ({ data, done }) {
      await this.loadContacts({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    handleFilter (filter) {
      this.filter = { ...filter }
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
          await this.saveContact(object)
          if (this.error) {
            this.$q.notify({
              color: 'red',
              message: 'Save contact fail'
            })
          } else {
            await this.onRequest({
              data: this.currentPage
            })
            this.$q.notify({
              color: 'green-4',
              message: 'Save contact success'
            })
          }
        })
    },
    async showData () {
      await this.clearError()
      this.isShow = true
    }
  }
}
</script>
