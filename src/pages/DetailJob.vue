<template>
  <div>
    <h3 class="font-owsald">See what job you had</h3>
    <div class="row">
      <div class="col-md-7">
        <div class="q-mr-md">
          <p class="text-h4 text-yellow-9">{{ job.subject }}</p>
          <div>
            <q-input prefix="$"
                     type="number"
                     v-model="job.salary"
                     label="Salary"
                     :disable="salaryDisable"/>
            <q-btn v-if="!salaryDisable" @click="submitJob()" label="Change" type="button" color="yellow-9" class="q-mt-md"/>
          </div>
          <p class="q-mt-md" v-html="job.description">
          </p>
          <div class="info">
           <div class="row">
             <div class="col-md-4">
               <div class="flex">
                 <div class="q-mr-sm">
                   <q-icon name="far fa-user"></q-icon>
                 </div>
                <div>
                  <p class="q-mb-none">Name</p>
                  <p class="info-text q-mt-none">{{ userProfile.username }}</p>
                </div>
               </div>
             </div>
             <div class="col-md-4">
               <div class="flex">
                 <div class="q-mr-sm">
                   <q-icon name="far fa-envelope"></q-icon>
                 </div>
                 <div>
                   <p class="q-mb-none">Email</p>
                   <p class="info-text q-mt-none">{{ userProfile.email }}</p>
                 </div>
               </div>
             </div>
             <div class="col-md-4">
               <div class="flex">
                 <div class="q-mr-sm">
                   <q-icon name="far fa-clock"></q-icon>
                 </div>
                 <div>
                   <p class="q-mb-none">Timeline</p>
                   <p class="info-text q-mt-none">{{ new Date(job.response_date).toISOString().split('T')[0] }}</p>
                 </div>
               </div>
             </div>
           </div>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div>
          <q-card bordered class="my-card q-mb-md">
            <q-card-section>
              <div class="text-subtitle2">Status: <span>{{ statusConst[job.status] }}</span></div>
            </q-card-section>
            <q-separator inset />
            <q-card-section>
              <div v-if="job.status === 1">
                <div v-if="isFreelancer">
                  <q-btn @click="submitJob(2)" label="Get job" type="button" color="primary" class="full-width bg-yellow-9"/>
                  <p class="skip" @click="submitJob(0)">No, skip this job</p>
                </div>
                <div v-else>
                  Freelancer is confirming job.
                </div>
              </div>
              <div v-else-if="job.status === 2">
                <div v-if="isFreelancer">
                  <q-input
                           v-model="job.result"
                           label="Link"/>
                  <q-btn @click="submitJob(3)" label="Hand in" type="button" color="yellow-9" class="q-mt-md full-width"/>
                </div>
                <div v-else>
                  Freelancer is doing job.
                </div>
              </div>
              <div v-else-if="job.status === 3">
                <div v-if="isFreelancer">
                  <q-input
                    v-model="job.result"
                    label="Link"
                    disable/>
                </div>
                <div v-else>
                  <q-input
                    v-model="job.result"
                    label="Link"
                    disable/>
                  <q-btn @click="submitJob(4)" label="Done" type="button" color="yellow-9" class="q-mt-md full-width"/>
                  <q-btn @click="submitJob(2)" label="Reject" type="button" color="white" text-color="black" class="q-mt-md full-width"/>
                </div>
              </div>
              <div v-else-if="job.status === 4">
                  <q-input
                    v-model="job.result"
                    label="Link"
                    disable/>
              </div>
              <div v-else>
                This job is canceled.
              </div>
            </q-card-section>
          </q-card>
          <q-card  style="padding: 20px">
            <div>
              <div style="height: 300px;overflow-y: auto; display: flex;
  justify-content: flex-end;
  flex-direction: column;">
                <div  v-for="message in messages"
                      :key="message.id" >
                  <div v-if="message.username == user.username" style="float: right">
                    <p class="bg-purple-6 q-pa-sm text-white" style="border-radius: 5px;display: inline-block">{{ message.text }}</p>
                  </div>
                  <div v-else>
                    <p style="font-size: 11px; color: darkgray; margin-bottom: 0">{{message.username}}</p>
                    <p class="bg-cyan-8 q-pa-sm text-white" style="border-radius: 5px;display: inline-block">{{ message.text }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-9">
                  <q-input
                    color="yellow-9"
                    v-model="showMessage"
                    outlined
                    class="q-mr-md"
                  />
                </div>
                <div class="col-md-3">
                  <q-btn color="primary"  @click="sendMessage" label="Send" class="full-width full-height"/>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex'
import fire from 'src/api/firebase'

export default {
  name: 'DetailJob',
  data () {
    return {
      access_token: localStorage.getItem(process.env.TOKEN_NAME),
      isFreelancer: false,
      userProfile: {},
      job: {},
      statusConst: {
        0: 'Cancel',
        1: 'Pending',
        2: 'Doing',
        3: 'Review',
        4: 'Done'
      },
      showMessage: '',
      messages: [],
      isConfirm: true
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    salaryDisable () {
      if (this.job.status === 1) {
        return this.isFreelancer
      } else {
        return true
      }
    }
  },
  methods: {
    loadJob () {
      axios.get(process.env.API_URL + '/job/' + this.$route.params.job_id, {
        headers:
            {
              Authorization: 'Bearer ' + this.access_token
            }
      }).then(res => {
        this.job = res.data
        if (this.job.freelancerId === this.user.id) {
          this.isFreelancer = true
        }
        const viewMessage = this
        const itemsRef = fire.database().ref('room/' + this.job.id)
        itemsRef.on('value', snapshot => {
          const data = snapshot.val()
          const messages = []
          Object.keys(data).forEach(key => {
            messages.push({
              id: key,
              username: data[key].username,
              text: data[key].text
            })
          })
          viewMessage.messages = messages
        })
        this.getAccountProfile()
      }).catch(err => {
        console.log(err)
      })
    },
    getAccountProfile () {
      const id = this.isFreelancer === true ? this.job.accountId : this.job.freelancerId
      axios.get(process.env.API_URL + '/account/' + id, {
        headers:
            {
              Authorization: 'Bearer ' + this.access_token
            }
      }).then(res => {
        this.userProfile = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    sendMessage () {
      const message = {
        text: this.showMessage,
        username: this.user.username
      }
      fire
        .database()
        .ref('room/' + this.job.id)
        .push(message)
      this.showMessage = ''
    },
    submitJob (status = null) {
      if (status) {
        this.job.status = status
      }
      axios.post(process.env.API_URL + '/job/update', this.job, {
        headers: {
          Authorization: 'Bearer ' + this.access_token
        }
      }).then(res => {
      }).catch(err => {
        console.log(err)
      })
    }
  },
  async mounted () {
    await this.loadJob()
  }
}
</script>

<style scoped>
p{
  font-size:16px;
}
.text-h4{
  font-size:35px;
}
.info{
  border-top: 1px solid darkgray;
  padding-top: 10px;
}
.info-text{
  font-size: 13px;
  color: darkgray;
}
.skip{
  font-size: 16px;
  color: darkgray;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 0;
}
</style>
