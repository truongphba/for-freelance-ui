<template>
  <div>
    <h3 class="font-owsald">My Owner Jobs</h3>
    <q-tabs
      v-model="tab"
      class="text-yellow-9 q-mb-md"
    >
      <q-tab name="pending" icon="far fa-clock" label="Pending" />
      <q-tab name="processing" icon="fas fa-running" label="Processing" />
      <q-tab name="success" icon="far fa-check-circle" label="Success" />
    </q-tabs>
    <q-card bordered >
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pending">
          <q-card-section >
            <div class="text-h4">Jobs in pending</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
          <div  v-if="pendingJobs.length > 0">
            <div class="job" v-for="job in pendingJobs" :key="job.id">
              <div class="row">
                <div class="col-md-8">
                  <p class="title">{{ job.subject }}</p>
                  <p><strong>Salary:</strong> {{ job.salary }}$</p>
                  <p><strong>Response Date:</strong> {{ new Date(job.response_date).toISOString().split('T')[0]  }}</p>
                  <p v-html="shortDes(job.description)"></p>
                </div>
                <div class="col-md-4 text-right">
                  <q-btn type="button" @click="goDetail(job.id)" color="primary" class="white">Go to detail <q-icon style="margin-left: 10px" name="fas fa-arrow-right"/></q-btn>
                </div>
              </div>
            </div>
          </div>
            <div v-else>
              You have no job.
            </div>
          </q-card-section>
        </q-tab-panel>

        <q-tab-panel name="processing">
          <q-card-section>
          <div class="text-h4">Jobs in processing</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div  v-if="processingJobs.length > 0">
            <div class="job" v-for="job in processingJobs" :key="job.id">
              <div class="row">
                <div class="col-md-8">
                  <p class="title">{{ job.subject }}</p>
                  <p><strong>Salary:</strong> {{ job.salary }}$</p>
                  <p><strong>Response Date:</strong> {{ new Date(job.response_date).toISOString().split('T')[0]  }}</p>
                  <p v-html="shortDes(job.description)"></p>
                </div>
                <div class="col-md-4 text-right">
                  <q-btn type="button" @click="goDetail(job.id)" color="primary" class="white">Go to detail <q-icon style="margin-left: 10px" name="fas fa-arrow-right"/></q-btn>
                </div>
              </div>
            </div>
            </div>
            <div v-else>
              You have no job.
            </div>
          </q-card-section>
        </q-tab-panel>

        <q-tab-panel name="success">
          <q-card-section>
          <div class="text-h4">Jobs success</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div  v-if="successJobs.length > 0">
            <div class="job" v-for="job in successJobs" :key="job.id">
              <div class="row">
                <div class="col-md-8">
                  <p class="title">{{ job.subject }}</p>
                  <p><strong>Salary:</strong> {{ job.salary }}$</p>
                  <p><strong>Response Date:</strong> {{ new Date(job.response_date).toISOString().split('T')[0]  }}</p>
                  <p v-html="shortDes(job.description)"></p>
                </div>
                <div class="col-md-4 text-right">
                  <q-btn type="button" @click="goDetail(job.id)" color="primary" class="white">Go to detail <q-icon style="margin-left: 10px" name="fas fa-arrow-right"/></q-btn>
                </div>
              </div>
            </div>
            </div>
            <div v-else>
              You have no job.
            </div>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'ListJob',
  data () {
    return {
      tab: 'processing',
      jobs: []
    }
  },
  methods: {
    loadJobs () {
      axios.get(process.env.SOURCE_URL + '/job/list?accountId=' + this.user.id).then(res => {
        this.jobs = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    shortDes (description) {
      return description.length > 2000 ? description.slice(0, 1500) + '...' : description
    },
    goDetail (id) {
      window.location.href = '/job/' + id
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    pendingJobs () {
      return this.jobs.filter(function (el) {
        return el.status === 1
      })
    },
    processingJobs () {
      return this.jobs.filter(function (el) {
        return el.status === 3 || el.status === 2
      })
    },
    successJobs () {
      return this.jobs.filter(function (el) {
        return el.status === 4
      })
    }
  },
  mounted () {
    this.loadJobs()
  }
}
</script>

<style scoped>
  p{
    margin-top: 0;
    margin-bottom: 10px;
  }
  .text-h4{
    border-bottom: 1px solid darkgray;
    padding-bottom: 20px;
  }
  .title{
    font-size: 20px;
    font-weight: bold;
  }
  .job{
    border-bottom: 1px solid darkgrey;
    padding: 20px 0;
  }
</style>
