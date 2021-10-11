<template>
  <div class="q-gutter-sm row">
    <div v-for="item in filtersAttribute" :key="item.field">
      <q-input
          clearable
          v-if="item.type === 'text'"
          outlined
          dense
          debounce="300"
          v-model="myFilter[item.field]"
          :label="item.label">
      </q-input>

      <q-input
          clearable
          v-if="item.type === 'number'"
          type="number"
          outlined
          dense
          debounce="300"
          v-model.number="myFilter[item.field]"
          :label="item.label">
      </q-input>

      <q-input v-if="item.type === 'date'"
               clearable
               outlined
               dense
               :value="myFilter[item.field] ? myFilter[item.field].from + '-' +myFilter[item.field].to : ''"
               :label="item.label">
        <template v-slot:append>
          <q-icon name="event"
                  class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy"
                           transition-show="scale"
                           transition-hide="scale">
              <q-date v-model="myFilter[item.field]"
                      color="primary"
                      mask="DD/MM/YYYY"
                      range
                      @input="closeDatePicker">
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-select clearable
                dense
                outlined
                v-model="myFilter[item.field]"
                :options="item.options || filterStatuses"
                :label="item.label"
                :option-value="item.options ? 'id' : 'value'"
                :option-label="item.options ? (item.field === 'employeeId' ?  'userName' : 'name') : 'label'"
                emit-value
                map-options
                v-if="item.type === 'select'"
                style="width: 170px"
      />
    </div>

    <q-btn label="Clear filter"
           color="purple-7"
           @click="clearFilter"
    />

    <q-btn @click="showData()"
           color="green"
           label="Add new"
           v-if="hasAddNew"
    />

  </div>
</template>

<script>
import 'src/utils/filter'

export default {
  name: 'FilterTable',
  props: {
    filtersAttribute: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Object,
      default: () => {}
    },
    permissionName: {
      type: String,
      default: ''
    },
    hideButton: {
      type: Boolean,
      default: false
    },
    filterStatuses: {
      type: Array,
      default: () => {}
    },
    hasAddNew: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      myFilter: {},
      test: ''
    }
  },
  watch: {
    myFilter: {
      handler (val) {
        console.log(val)
        let newDate = ''
        if (val.createdAt) {
          newDate = val.createdAt.from + '_' + val.createdAt.to
          val = {
            ...val,
            createdAt: newDate
          }
        }
        this.$emit('doFilter', val)
      },
      deep: true
    }
  },
  methods: {
    clearFilter () {
      this.myFilter = {}
    },
    showData () {
      this.$emit('show')
    },
    closeDatePicker () {
      this.$refs.qDateProxy[0].hide()
    }
  }
}
</script>
