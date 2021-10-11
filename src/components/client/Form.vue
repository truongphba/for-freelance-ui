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
          v-model="initialClient[key]"
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
          v-model="initialClient.description"
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
      <q-toggle
        v-if="isEdit"
        class="col-12"
        size="xl"
        v-model="initialClient.status"
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
    client: {
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
    }
  },
  data () {
    return {
      isMultiple: true,
      infoFormInputs: {
        name: {
          label: 'Name',
          rules: [val => !!val || 'Please enter client name']
        },
        address: {
          label: 'Address'
        },
        phoneNumber: {
          label: 'PhoneNumber'
        },
        taxCode: {
          label: 'Tax Code'
        },
        clientCode: {
          label: 'Client Code'
        },
        email: {
          label: 'Email'
        },
        pointOfContact: {
          label: 'Client Source'
        }
      },
      initialClient: {
        description: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.initialClient = {
        ...this.client
      }
    }
  },
  computed: {
    labelToggle () {
      return this.initialClient.status === 1 ? 'Active' : 'Deactive'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('save', {
            data: this.initialClient,
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
        message: this.initialClient.id ? `Update ${title}` : `Add new ${title}`
      })
      this.$emit('close')
    }
  }
}
</script>
