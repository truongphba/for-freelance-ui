<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="clients"
           :columns="columns"
           :is-loading="isLoading"
           :total="total"
           :filter="filter"
           :error="error"
           :is-deleted="isDeleted"
           @request="onRequest"
           @show="showData"
           @showDetail="showDetail"
           @showFormProduct="showFormProduct"
           @delete="handleDelete"
           :is-client="isClient"
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
        <Form :client="client"
              :is-saved="isSaved"
              :is-edit="isEdit"
              :error="error"
              @save="handleSave"
              @close="handleClose"
        />
      </FormDialog>
    </q-dialog>
    <q-dialog v-model="isShowDetail" full-width>
      <q-card class="detail" v-if="client">
        <q-card-section>
         <div class="row">
           <div class="col-md-4 q-pa-md">
             <div class="row">
               <div class="col-md-6">
                 <div class="text-h6" >Client Detail</div>
               </div>
               <div class="col-md-6">
                 <q-btn @click="showFormProduct(client.id)"
                        color="green"
                        label="Add new product"
                 />
               </div>
             </div>
             <div class="row">
               <div class="col-md-6">
                 <p><strong>Id: </strong>{{ client.id }}</p>
               </div>
               <div class="col-md-6">
                 <p><strong>Name: </strong>{{ client.name }}</p>
               </div>
               <div class="col-md-6">
                 <p><strong>Phone Number: </strong>{{ client.phoneNumber }}</p>
               </div>
               <div class="col-md-6">
                 <p><strong>Tax Code: </strong>{{ client.taxCode }}</p>
               </div>
               <div class="col-md-6">
                 <p><strong>Client Code: </strong>{{ client.clientCode }}</p>
               </div>
               <div class="col-md-6">
                 <p><strong>Email: </strong>{{ client.email }}</p>
               </div>
               <div class="col-md-6">
                 <p><strong>Client Source: </strong>{{ client.clientSource }}</p>
               </div>
               <div class="col-md-12">
                 <p><strong>Address: </strong>{{ client.address }}</p>
               </div>
               <div class="col-md-12">
                 <p><strong>Description: </strong>{{ client.description }}</p>
               </div>
             </div>
             <div class="q-mt-lg">
               <q-table
                 class="my-sticky-header-table"
                 title="Product"
                 :data="allProducts"
                 :columns="columnsProduct"
                 row-key="name"
                 flat
                 bordered
               >
                 <template v-slot:body="props">
                   <q-tr :props="props">
                     <q-td key="name" :props="props">
                       {{ props.row.name }}
                     </q-td>
                     <q-td key="action" :props="props">
                       <q-btn dense
                              color="green"
                              icon="fas fa-chevron-right"
                              @click="addContact(props.row.id)"
                       >
                         <q-tooltip>
                           Add to contract
                         </q-tooltip>
                       </q-btn>
                     </q-td>
                   </q-tr>
                 </template>
               </q-table>
             </div>
           </div>
           <div class="col-md-8 contact q-pa-md">
             <div class="text-h6" >Add new contract</div>
             <q-form ref="myForm">
             <template v-for="(initialPaymentDetail, index) in initialPaymentDetails">
               <div :key="index" class="row q-col-gutter-x-sm">
                 <q-select class="col"
                           outlined
                           :rules="[val => val != null || 'Please choose product for contracting']"
                           v-model="initialPaymentDetail.productId"
                           :options="allProducts"
                           label="Product"
                           option-value="id"
                           option-label="name"
                           emit-value
                           map-options
                 />
                 <q-select class="col"
                           outlined
                           :rules="[val => val != null || 'Please choose service for contracting']"
                           v-model="initialPaymentDetail.serviceId"
                           :options="allServices"
                           label="Service"
                           option-value="id"
                           option-label="name"
                           emit-value
                           map-options
                 />
                 <q-input
                   class="col"
                   :ref="initialPaymentDetail.amoutEmployee"
                   :type="'number'"
                   outlined
                   :label="'Number of employees'"
                   :rules="[val => val > 0 || 'Please number of employees must be better than 0',val => !!val || 'Please enter number of employees' ]"
                   v-model="initialPaymentDetail.amoutEmployee"
                   :error="error && initialPaymentDetail.amoutEmployee in error.data.message"
                 />
                 <q-input
                   class="col"
                   :ref="initialPaymentDetail.startDate"
                   outlined
                   v-model="initialPaymentDetail.startDate"
                   type="date"
                   label="Start Date"
                   :rules="[val => !!val || 'Please enter start date for contracting']"
                   :error="error && initialPaymentDetail.startDate in error.data.message"
                 />
                 <q-input
                   class="col"
                   :ref="initialPaymentDetail.endDate"
                   outlined
                   v-model="initialPaymentDetail.endDate"
                   type="date"
                   label="End Date"
                   :rules="[val => !!val || 'Please enter end date for contracting']"
                   :error="error && initialPaymentDetail.endDate in error.data.message"
                 />
               </div>
             </template>
             </q-form>
           </div>
         </div>
        </q-card-section>
        <q-card-actions align="right"
                        class="bg-white text-teal">
          <template>
            <q-btn v-if="initialPaymentDetails.length" flat
                   label="Save"
                   type="submit"
                   @click="onSubmit"/>
          </template>
          <q-btn flat
                 label="Close"
                 v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isShowFormProduct">
      <q-card class="detail" style=" width: 80%;max-width: 80%;">
        <q-card-section>
          <div class="text-h6 q-mb-lg" >Add Product</div>
          <q-form ref="productForm"
                  class="row q-col-gutter-x-sm">
            <div v-for="(formInput, key) in infoFormInputs"
                 :key="key"
                 class="col-6"
                 :class="{'col-sm-6' : formInput.type === 'number', 'q-mb-md': !formInput.rules}">
              <q-input
                :ref="key"
                :type="formInput.type || 'text'"
                outlined
                :label="formInput.label"
                :rules="formInput.rules || []"
                v-model="initialProduct[key]"
                :error="error && key in error.data.message"
              >
                <template v-slot:error>
                  <div v-for="(item, index) in error.data.message[key]" :key="index">
                    {{ item }}
                  </div>
                </template>
              </q-input>
            </div>
            <div class="col-12 q-mb-lg">
              <label>Description</label>
              <q-editor
                v-model="initialProduct.description"
                :dense="$q.screen.lt.md"
                :toolbar="[
            [
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                list: 'only-icons',
                options: ['left', 'center', 'right', 'justify']
              }
            ],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1','size-2','size-3','size-4','size-5','size-6','size-7']
              },
              'removeFormat'
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
            ['undo', 'redo'],
            ['fullscreen']
          ]"
                :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="right"
                        class="bg-white text-teal">
          <template>
            <q-btn flat
                   label="Save"
                   type="submit"
                   @click="onSubmitProduct"/>
          </template>
          <q-btn flat
                 label="Close"
                 v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from 'src/components/common/Table'
import FormDialog from 'src/components/common/FormDialog'
import FilterTable from 'src/components/common/FilterTable'
import Form from 'components/client/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Clients',
  components: {
    Form,
    Table,
    FormDialog,
    FilterTable
  },
  data () {
    return {
      isShow: false,
      isShowDetail: false,
      isShowFormProduct: false,
      isEdit: false,
      isDetail: false,
      isClient: true,
      filter: {},
      columns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name'
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          align: 'left',
          field: 'phoneNumber'
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
      columnsProduct: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name'
        },
        {
          name: 'action',
          label: '',
          align: 'center'
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
      ],
      initialPayment: {},
      initialProduct: {
        description: ''
      },
      initialPaymentDetails: [],
      infoFormInputs: {
        name: {
          label: 'Name',
          rules: [val => !!val || 'Please enter Product name']
        }
      }
    }
  },
  computed: {
    ...mapState('client', [
      'clients',
      'total',
      'isLoading',
      'client',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    ...mapState('product', [
      'allProducts'
    ]),
    ...mapState('service', [
      'allServices'
    ]),
    filterStatuses () {
      return Constants.Status
    }
  },
  methods: {
    ...mapActions({
      loadClients: 'client/loadClients',
      loadAllProducts: 'product/loadAllProducts',
      loadAllServices: 'service/loadAllServices',
      loadClient: 'client/loadClient',
      saveClient: 'client/saveClient',
      deleteClient: 'client/deleteClient',
      clearError: 'client/clearError',
      savePayment: 'payment/savePayment',
      saveProduct: 'product/saveProduct'
    }),
    async onRequest ({ data, done }) {
      await this.loadClients({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveClient(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id != null) {
        this.isEdit = true
        await this.loadClient(id)
      }
      this.isShow = true
    },
    async showDetail (id) {
      await this.clearError()
      if (id != null) {
        await this.loadClient(id)
        await this.loadAllProducts(id)
        await this.loadAllServices()
      }
      this.initialPaymentDetails = []
      this.isShowDetail = true
    },
    async showFormProduct (id) {
      if (id != null) {
        await this.loadClient(id)
      }
      this.initialProduct = {
        description: ''
      }
      this.isShowFormProduct = true
    },
    async handleDelete ({ id, done }) {
      await this.deleteClient(id)
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
    addContact (productId) {
      this.initialPaymentDetails.push({
        productId: productId,
        serviceId: null,
        amoutEmployee: null,
        startDate: null,
        endDate: null
      })
    },
    onSubmit () {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          this.initialPayment.employeeId = 1
          this.initialPayment.clientId = await this.client.id
          this.initialPayment.detail = this.initialPaymentDetails
          await this.savePayment(this.initialPayment)
          if (!this.error || this.error.status !== 422) {
            const title = this.error ? 'Failed' : 'Success'
            this.$q.notify({
              color: this.error ? 'red' : 'green-4',
              message: this.initialPayment.id ? `Update ${title}` : `Add new ${title}`
            })
            this.isShowDetail = false
            window.location.href = '/payments'
          }
        }
      })
    },
    onSubmitProduct () {
      this.$refs.productForm.validate().then(async success => {
        if (success) {
          this.initialProduct.clientId = await this.client.id
          await this.saveProduct(this.initialProduct)
          if (!this.error || this.error.status !== 422) {
            const title = this.error ? 'Failed' : 'Success'
            this.$q.notify({
              color: this.error ? 'red' : 'green-4',
              message: this.initialPayment.id ? `Update ${title}` : `Add new ${title}`
            })
            await this.loadClient(this.initialProduct.clientId)
            await this.loadAllProducts(this.initialProduct.clientId)
            await this.loadAllServices()
            this.isShowFormProduct = false
          }
        }
      })
    }
  }
}
</script>
<style scoped>
p{
  margin: 5px 0;
}
.contact{
  border-left: 1px solid darkgray;
}
</style>
