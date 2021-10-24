<template>
  <q-card style="margin: 50px auto;width: 60%; padding: 20px">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Wordpress designer - customize theme to create Gorgeous Business Consulting Website</div>
        <!--        <div class="text-subtitle2">by John Doe</div>-->
      </q-card-section>

      <q-separator dark/>
      <div style="padding-inline: 50px">
        <div v-if="displayRate">
          <div class="text-h6" style="padding-block: 10px">Job Feedback</div>
          <q-separator dark/>
          <div class="text-amber-1" style="padding-block: 10px">
            Client's feedback
          </div>
          <div v-for="(feedback,index) in clientFeedBacks" :key="index">
            <q-rating
                :value="feedback.rate"
                size="2em"
                :max="10"
                color="green"
            />

            <div v-html="feedback.feedback"></div>
          </div>
        </div>
        <q-input v-model="salary" style="max-width: 150px" label="Salary" :disable="isConfirmed"
                 v-if="isEditing"></q-input>
        <div v-else>
          <div class="text-subtitle1">
            Salary : {{ jobDescription }}
          </div>
        </div>
        <q-select style="max-width: 150px" v-model="jobStatus" :options="allJobStatus" label="Job Status"
                  v-if="isEditing"/>
        <div v-else>
          <div class="text-subtitle1">
            Current Job Status : {{ jobStatus.label }}
          </div>
        </div>
        <q-separator dark style="margin-top: 10px"/>
        <div class="text-h6" style="padding-block: 10px">Detail job</div>
        <div class="text-subtitle1">
          Job description :
        </div>
        <div class="text-body1" style="padding-left: 10px">
          {{ jobDescription }}
        </div>
<!--        <div class="text-subtitle1">-->
<!--          Skill required :-->
<!--        </div>-->
<!--        <q-chip dense color="primary" text-color="white" v-for="(value, index) in skills" :key="index">-->
<!--          {{ value }}-->
<!--        </q-chip>-->
        <div class="text-subtitle1">
          {{ isFreelancer ? 'Freelancer' : 'User' }} information :
        </div>

        <div class="text-subtitle2">
          <div style="padding-left: 10px">
            Name : {{ contactInfo.username }}
            <br>
            Email : {{ contactInfo.email }}
          </div>
        </div>
      </div>

      <q-separator dark/>

      <q-card-actions>
        <q-btn flat>Close</q-btn>
      </q-card-actions>
    </q-card>
  </q-card>
</template>

<script>

import axios from 'axios'

export default {
  name: 'DetailJob',
  data () {
    return {
      access_token: localStorage.getItem(process.env.TOKEN_NAME),
      userName: '',
      jobDescription: 'Good morning I am a web designer and I would like to delegate one project. I am looking for someone who master perfectly elementor. Need someone who has got a minimum sense of design, can take initiative and follow up brand identity. Thank you',
      skills: ['Laravel', 'VueJs', 'reactJs'],
      showMessage: '',
      clientFeedBacks: [
        {
          rate: 4,
          feedback: '"It was a pleasure to work with Peter.\n Thanks"'
        },
        {
          rate: 5,
          feedback: '"Peter Griffin .\n Thanks"'
        }
      ],
      displayRate: false,
      salary: 4000,
      jobStatus: {
        label: 'Pending',
        value: 1
      },
      messages: [],
      allJobStatus: [
        {
          label: 'Close',
          value: 0
        },
        {
          label: 'Pending',
          value: 1
        },
        {
          label: 'Doing',
          value: 2
        },
        {
          label: 'Review',
          value: 3
        },
        {
          label: 'Done',
          value: 3
        }
      ],
      isConfirmed: true,
      isEditing: true,
      isFreelancer: true,
      myProfile: {},
      freelancerProfile: {},
      userProfile: {}
    }
  },
  computed: {
    contactInfo: function () {
      if (this.isFreelancer) {
        return {
          username: this.freelancerProfile.name,
          email: this.freelancerProfile.account?.email ?? ''
        }
      }
      return {
        username: this.userProfile.username,
        email: this.userProfile.email
      }
    }
  },
  methods: {
    loadJob () {
      axios.get(process.env.API_URL + '/job/' + this.$route.params.job_id, {
        headers:
            {
              Authorization: 'Bearer' + this.access_token
            }
      }).then(res => {
        const data = res.data
        this.salary = data.salary ?? 0
        this.jobDescription = data.description ?? ''
        this.jobStatus = this.allJobStatus.find(element => element.value === data.status)

        this.getFreelancerProfile(data.freelancerId)
        this.getAccountProfile(data.accountId)
      }).catch(err => {
        console.log(err)
      })
    },
    getMyProfile () {
      axios.get(process.env.API_URL + '/users/information', {
        headers:
            {
              Authorization: 'Bearer' + this.access_token
            }
      }).then(res => {
        this.myProfile = res.data
        if (this.myProfile.role !== 'FREELANCER') {
          this.isFreelancer = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getFreelancerProfile (freelancerId) {
      axios.get('http://localhost:8088/v1/freelancers/' + freelancerId, {
        headers:
            {
              Authorization: 'Bearer' + this.access_token
            }
      }).then(res => {
        this.freelancerProfile = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    getAccountProfile (accountId) {
      axios.get(process.env.API_URL + '/account/' + accountId, {
        headers:
            {
              Authorization: 'Bearer' + this.access_token
            }
      }).then(res => {
        this.userProfile = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.loadJob()
    this.getMyProfile()
  }
}
</script>

<style scoped>

</style>
