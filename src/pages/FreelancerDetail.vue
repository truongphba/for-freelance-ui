<template>
  <div>
    <div style="margin: 76px 20px 60px">
      <div style="border: solid 1px gainsboro;  border-radius: 5px; background: white">
        <div class="flex">
          <div class="flex " style="padding: 20px; width: 90%">
            <div><img class="avatar"
                      :src="freelancer.thumbnail ? freelancer.thumbnail : 'data:image/png;base64,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'"
                      alt="Avatar"></div>
            <div style="margin-left: 16px; ">
              <div>
                <p class="freelancer-name">{{ freelancer.account.username }}</p>
              </div>
              <div class="text-muted" style="margin-bottom: 5px">
                <i class="fas fa-map-marker-alt"></i>
                <span style="font-size: 18px">
                {{ freelancer.address }}
              </span>
              </div>
              <div style="font-size: 18px">
                <star-rating :read-only="true" :increment="0.5" :rating="freelancer.rate" v-bind:star-size="20"></star-rating>
              </div>
            </div>
          </div>
          <div style="padding-top: 5%;" v-if="access_token">
            <button class="connect-btn" @click="prompt = true">Connect</button>
          </div>
        </div>
        <hr style="margin: unset; border: 0.5px solid gainsboro;">
        <div class="row">
          <div class="col-4" style="border-right: solid 1px gainsboro;">
            <div style="padding-inline: 20px; line-height: 32px;">
              <div style="margin: 5px 0; font-size: 16px">
                <span><strong>Gender: </strong></span>{{ freelancer.gender }}
              </div>
              <div style="margin: 5px 0; font-size: 16px">
                <span><strong>Experience: </strong></span>{{ freelancer.experience }}
              </div>
              <div style="margin: 5px 0; font-size: 16px">
                <span><strong>Average Income: </strong></span>{{ freelancer.averageIncome }}$/h
              </div>
            </div>
            <hr style="border: 0.5px solid gainsboro;">
            <div style="padding-inline: 20px">
              <div class="flex" style="justify-content: flex-start; line-height: 25px; font-size: 16px;">
                <div style="margin-right: 20px;">
                  <div><strong>{{freelancer.totalEarning}}$</strong></div>
                  <div>Total Earnings</div>
                </div>
                <div style="margin-right: 20px;">
                  <div><strong>{{ freelancer.totalJobDone }}</strong></div>
                  <div>Total Jobs</div>
                </div>
              </div>
            </div>
            <hr style="border: 0.5px solid gainsboro;">
          </div>
          <div class="col-8">
            <div style="margin: 5px 0; font-size: 24px; padding-inline: 20px">
              <strong>{{ freelancer.title }}</strong>
            </div>
            <div style="width: 480px; font-size: 16px; padding-inline: 20px">
              {{ freelancer.description }}
            </div>
            <hr style="border: 0.5px solid gainsboro;">
            <div>
              <div style="font-size: 24px; padding-inline: 20px">
                <strong>Work History</strong>
              </div>
              <div style="margin-top: 50px">
                <div class="q-gutter-y-md">
                  <q-card style="box-shadow: unset">
                    <q-tabs
                      v-model="tab"
                      dense
                      class="text-grey"
                      active-color="primary"
                      indicator-color="primary"
                      align="justify"
                      narrow-indicator
                    >
                      <q-tab name="completed" label="Completed Jobs"/>
                      <q-tab name="in_progress" label="In Progress"/>
                    </q-tabs>

                    <q-separator/>

                    <q-tab-panels v-model="tab" animated>
                      <q-tab-panel name="completed" style="line-height: 3">
                        <div v-if="successJobs.length > 0">
                          <div v-for="jobDetail in successJobs" :key="jobDetail.id">
                            <div>
                              <div class="text-h6">{{ jobDetail.subject }}</div>
                              <div class="text-gray"><star-rating :read-only="true" :increment="0.5" :rating="jobDetail.rate" v-bind:star-size="20"></star-rating><strong>Response Date:</strong> {{ new Date(jobDetail.response_date).toISOString().split('T')[0]  }} </div>
                              <div class="feedback">
                                {{ jobDetail.comment ? jobDetail.comment : 'No feedback given'}}
                              </div>
                              <div class="mt-20 mt-lg-10 text-gray">
                                <strong>Salary:</strong> {{ jobDetail.salary }}
                              </div>
                            </div>
                            <hr style="border: 0.5px solid gainsboro;">
                          </div>
                        </div>
                        <div v-else>
                          No job had completed.
                        </div>
                      </q-tab-panel>

                      <q-tab-panel name="in_progress">
                        <div v-if="processingJobs.length > 0">
                        <div v-for="jobDetail in processingJobs" :key="jobDetail.id">
                          <div>
                            <div class="text-h6">{{ jobDetail.subject }}</div>
                            <div class="mt-20 mt-lg-10 text-gray">
                              <strong>Salary:</strong>  {{ jobDetail.salary }}
                            </div>
                          </div>
                          <hr style="border: 0.5px solid gainsboro;">
                        </div>
                        </div>
                        <div v-else>
                          No job in processing.
                        </div>
                      </q-tab-panel>

                    </q-tab-panels>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 750px">
        <q-card-section>
          <div class="text-h4">Create Job</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-h6">Subject</div>
          <q-input dense v-model="job.subject" autofocus @keyup.enter="prompt = false" :rules="[val => !!val || 'Field is required']"/>
          <div class="text-h6">Description</div>
          <q-editor
            v-model="job.description"
            :definitions="{bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}}"
            :rules="[val => !!val || 'Field is required']"
          />
          <div class="text-h6">Salary</div>
          <q-input dense v-model="job.salary" autofocus @keyup.enter="prompt = false" type="number" min="0" :rules="[val => !!val || 'Field is required', val => val >= 0 || 'Salary must greater than 0']"/>
          <div class="text-h6">Response Date</div>
          <q-input filled v-model="job.response_date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="job.response_date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Create Job" v-close-popup @click="createJob"/>
        </q-card-actions>
        <q-card-section class="q-pt-none">
          <p style="font-size: 24px; border-bottom: 1px solid darkgrey">Your canceled job</p>
        <div  v-if="canceledJobs.length > 0">
          <div class="job" v-for="job in canceledJobs" :key="job.id">
            <div class="row">
              <div class="col-md-8">
                <p class="title">{{ job.subject }}</p>
                <p><strong>Salary:</strong> {{ job.salary }}$</p>
                <p><strong>Response Date:</strong> {{ new Date(job.response_date).toISOString().split('T')[0]  }}</p>
              </div>
              <div class="col-md-4 text-right">
                <q-btn type="button" @click="copyJob(job.id)" color="yellow-9" class="text-white">Fill</q-btn>
              </div>
            </div>
          </div>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
import { mapState } from 'vuex'

export default {
  name: 'FreelancerDetail',
  components: {
    StarRating
  },
  props: {
    freelancer_id: Number
  },
  data () {
    return {
      freelancer: {},
      tab: 'completed',
      access_token: localStorage.getItem(process.env.TOKEN_NAME),
      prompt: false,
      job: {
        subject: '',
        description: '',
        salary: 0,
        response_date: '',
        type: ''
      },
      options: [
        'Hour', 'Product'
      ],
      jobs: [],
      jobsUser: []
    }
  },
  methods: {
    loadFreelancer () {
      axios.get('http://localhost:8088/v1/freelancers/' + this.freelancer_id)
        .then(res => {
          this.freelancer = res.data.data
          axios.get(process.env.SOURCE_URL + '/job/list?freelancerId=' + this.freelancer.id).then(res => {
            this.jobs = res.data.data
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
    },
    loadJobsUser () {
      axios.get(process.env.SOURCE_URL + '/job/list?accountId=' + this.user.id).then(res => {
        this.jobsUser = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    createJob () {
      axios.post(process.env.API_URL + '/job', {
        salary: this.job.salary,
        subject: this.job.subject,
        description: this.job.description,
        accountId: this.user.id,
        freelancerId: this.freelancer_id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.access_token
        }
      }).then(res => {
        this.$router.push({ path: '/job/' + res.data.data.id })
      }).catch(err => {
        console.log(err)
      })
    },
    copyJob (id) {
      const copyJob = this.canceledJobs.filter(function (el) {
        return el.id === id
      })[0]
      this.job.subject = copyJob.subject
      this.job.description = copyJob.description
      this.job.response_date = copyJob.response_date
      this.job.salary = copyJob.salary
      console.log(this.job)
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    processingJobs () {
      return this.jobs.filter(function (el) {
        return el.status === 3 || el.status === 2 || el.status === 1
      })
    },
    successJobs () {
      return this.jobs.filter(function (el) {
        return el.status === 4
      })
    },
    canceledJobs () {
      return this.jobsUser.filter(function (el) {
        return el.status === 0
      })
    }
  },
  created () {
    this.loadFreelancer()
    this.loadJobsUser()
  }
}
</script>

<style scoped>
.avatar {
  --avatar-color: var(--bg-3);
  display: inline-flex;
  width: var(--size);
  height: var(--size);
  max-width: var(--size);
  max-height: var(--size);
  overflow: hidden;
  -o-object-fit: cover;
  object-fit: cover;
  color: var(--avatar-color);
  vertical-align: middle;
  border-radius: 50%;
  --size: 80px !important;
}

.freelancer-name {
  font-size: 24px;
  margin-bottom: 5px;
}
.feedback {
  line-height: 2;
  font-style: italic;
  font-size: 16px
}
.text-gray{
  color: gray;
}
.connect-btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 20px;
}
.connect-btn:hover {
  cursor: pointer;
}
.job{
  border-bottom: 1px solid darkgrey;
  padding: 20px 0;
}
.title{
  font-size: 15px;
  font-weight: bold;
}
</style>
