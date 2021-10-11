<template>
  <div class="q-pa-md">
    <q-form ref="myForm"
            class="row q-col-gutter-x-sm">
      <div v-for="(formInput, key) in infoFormInputs"
           :key="key"
           class="col-6"
           :class="{'col-sm-4' : formInput.type === 'number', 'q-mb-md': !formInput.rules}">
        <q-input
          :ref="key"
          :type="formInput.type || 'text'"
          outlined
          :label="formInput.label"
          :rules="formInput.rules || []"
          v-model="initialEmployee[key]"
          :error="error && key in error.data.message"
        >
          <template v-slot:error>
            <div v-for="(item, index) in error.data.message[key]" :key="index">
              {{ item }}
            </div>
          </template>
        </q-input>
      </div>
      <q-select
        class="col-12"
        outlined
        :rules="[val => val != null || 'Please choose department for service']"
        v-model="initialEmployee.departmentId"
        :options="allDepartments"
        label="Department"
        option-value="id"
        option-label="name"
        emit-value
        map-options
      />
      <q-toggle
        v-if="isEdit"
        class="col-12"
        size="xl"
        v-model="initialEmployee.status"
        :true-value="1"
        :false-value="0"
        :label="labelToggle"
      />
    </q-form>
    <q-card-actions align="right"
                    class="bg-white text-teal">
      <q-btn flat
             label="Save"
             type="submit"
             @click="onSubmit"/>
      <q-btn flat
             label="Close"
             v-close-popup/>
    </q-card-actions>
  </div>
</template>

<script>

export default {
  name: 'Form',
  props: {
    employee: {
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
    allDepartments: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isMultiple: true,
      infoFormInputs: {
        userName: {
          label: 'Username',
          rules: [val => !!val || 'Please enter employee name']
        },
        email: {
          label: 'Email',
          rules: [val => !!val || 'Please enter employee email']
        },
        phoneNumber: {
          label: 'Phone Number'
        },
        address: {
          label: 'Address'
        }
      },
      initialEmployee: {},
      departmentId: 0
    }
  },
  created () {
    if (this.isEdit) {
      this.initialEmployee = {
        ...this.employee
      }
    }
  },
  computed: {
    labelToggle () {
      return this.initialEmployee.status === 1 ? 'Active' : 'Deactive'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('save', {
            data: this.initialEmployee,
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
        message: this.initialEmployee.id ? `Update ${title}` : `Add new ${title}`
      })
      this.$emit('close')
    }
  }
}
</script>
