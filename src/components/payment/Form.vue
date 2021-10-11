<template>
  <div>
  <div class="q-pa-md" v-if="!isEdit">
    <q-form ref="myForm">

        <q-select
                  ref="clientId"
          outlined
          :rules="[val => !!val || 'Please choose client for contracting']"
          v-model="initialPayment.clientId"
          :options="allClients"
          label="Client"
          option-value="id"
          option-label="name"
          emit-value
          map-options
                  :disable="isEdit"
                  v-if="isFirstStep"
        />
        <template v-else>
          <div class="row">
            <q-btn @click="addDetail" color="secondary q-mb-md">Add more detail</q-btn>
          </div>
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
          <div class="row" v-if="isEdit">
            <q-select
              ref="status"
              outlined
              :rules="[val => !!val || 'Please choose client for contracting']"
              v-model="initialPayment.status"
              :options="filterStatuses"
              label="Status"
              option-value="value"
              option-label="label"
              emit-value
              map-options
             class="col-3"
            />
          </div>
        </template>
    </q-form>
    <q-card-actions align="right"
                    class="bg-white text-teal">
      <q-btn flat
             label="Next"
             @click="nextStep" v-if="isFirstStep"/>
     <template v-else>
       <q-btn flat
              label="Back"
              @click="isFirstStep = true"/>
       <q-btn flat
              label="Save"
              type="submit"
              @click="onSubmit"/>
     </template>
      <q-btn flat
             label="Close"
             v-close-popup/>
    </q-card-actions>
  </div>
  <div class="q-pa-md" v-else>
      <div class="text-h6">Payment Detail</div>
      <Table :data="initialPaymentDetails"
             :columns="paymentDetailColumns"
             :is-loading="isLoading"
             :total="initialPaymentDetails.length"
             :error="error"
             :isHidePagination="true"
             :is-flat="true"
      />
      <div class="q-mt-md q-pl-md">
        <div>
          <span class="text-bold">Total Cost: </span>
          {{ initialPayment.totalCost | formatInteger }} $
        </div>
      </div>
    <slot/>
  </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import Table from 'src/components/common/Table'

export default {
  name: 'Form',
  components: {
    Table
  },
  props: {
    payment: {
      type: Object,
      default: () => {
      }
    },
    isSaved: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    error: {
      type: Object,
      default: () => {
      }
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    allClients: {
      type: Array,
      default: () => []
    },
    filterStatuses: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      isFirstStep: true,
      isMultiple: true,
      initialPayment: {},
      initialPaymentDetails: [
        {
          productId: null,
          serviceId: null,
          amoutEmployee: null,
          startDate: null,
          endDate: null
        }
      ],
      paymentDetailColumns: [
        {
          name: 'productName',
          label: 'Product',
          align: 'center',
          field: 'productName'
        },
        {
          name: 'serviceName',
          align: 'center',
          label: 'Service',
          field: 'serviceName'
        },
        {
          name: 'amoutEmployee',
          align: 'center',
          label: 'Number of employees',
          field: 'amoutEmployee'
        },
        {
          name: 'startDate',
          align: 'center',
          label: 'Start Date',
          field: 'startDate'
        },
        {
          name: 'endDate',
          align: 'center',
          label: 'End Date',
          field: 'endDate'
        }
      ]
    }
  },
  created () {
    if (this.isEdit) {
      this.initialPayment = {
        ...this.payment
      }
      this.initialPaymentDetails = this.payment.paymentDetails
    }
  },
  computed: {
    ...mapState('product', [
      'allProducts'
    ]),
    ...mapState('payment', [
      'isLoading'
    ]),
    ...mapState('service', [
      'allServices'
    ])
  },
  methods: {
    ...mapActions({
      loadAllProducts: 'product/loadAllProducts',
      loadAllServices: 'service/loadAllServices'
    }),
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.initialPayment.employeeId = 1
          this.initialPayment.amoutEmployee = parseInt(this.initialPayment.amoutEmployee)
          this.initialPayment.detail = this.initialPaymentDetails
          this.$emit('save', {
            data: this.initialPayment,
            done: () => {
              if (!this.error || this.error.status !== 422) {
                this.handleSubmit()
              }
            }
          })
        }
      })
    },
    handleSubmit () {
      const title = this.error ? 'Failed' : 'Success'
      this.$q.notify({
        color: this.error ? 'red' : 'green-4',
        message: this.initialPayment.id ? `Update ${title}` : `Add new ${title}`
      })
      this.$emit('close')
    },
    async nextStep () {
      await this.$refs.clientId.validate()
      if (!this.$refs.clientId.hasError) {
        await this.loadAllProducts(this.initialPayment.clientId)
        await this.loadAllServices()
        this.isFirstStep = false
      }
    },
    addDetail () {
      this.initialPaymentDetails.push({
        productId: null,
        serviceId: null,
        amoutEmployee: null,
        startDate: null,
        endDate: null
      })
    }
  }
}
</script>
