<template>
  <div>
    <div>
      <h3 class="font-owsald">See talent who match jobs like yours</h3>
      <div class="row">
        <div class="col-8">
          <q-input outlined color="yellow-9" v-model="searchQuery" label="Some name, skill,..."/>
        </div>
      </div>
      <div id="freelancers-project">
        <div id="freelancers">
          <h5>Get proposals from talent like this</h5>
          <div class="row">
            <div class="col-md-6" v-for="freelancer in filteredFreelancers" :key="freelancer.id">
              <div style="margin: 10px" v-if="user.freelancerDTO == null || freelancer.id !== user.freelancerDTO.id">
                <div itemscope="itemscope" itemtype="http://schema.org/Person">
                  <div class="flex">
                    <div><img class="avatar"
                              :src="freelancer.thumbnail ? freelancer.thumbnail : 'data:image/png;base64,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'"
                              alt="Avatar"></div>
                    <div style="margin-left: 16px">
                      <div>
                        <p class="freelancer-name" @click="showPanel(freelancer.id)">{{freelancer.account.username}}</p>
                      </div>
                      <div class="text-muted">
                        <p style="font-size: 16px">
                          {{ freelancer.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="info-income">
                      <div>
                        <strong> {{freelancer.averageIncome}} </strong>
                        <span aria-label="per hour">/hr</span>
                      </div>
                      <div>Average rate</div>
                    </div>
                    <div class="info-income">
                      <div><strong> ${{freelancer.totalEarning}} </strong></div>
                      <div>Total earnings</div>
                    </div>
                    <div class="info-income">
                      <div><strong> {{ freelancer.totalJobDone }} </strong></div>
                      <div>Total jobs</div>
                    </div>
                    <div class="info-income">
                      <div><strong> {{ freelancer.rate }} </strong></div>
                      <div>Rated</div>
                    </div>
                  </div>
                </div>
                <hr>
              </div>
            </div>
            <slideout-panel></slideout-panel>
          </div>
        </div> <!---->
      </div>
    </div>
  </div>
</template>

<script>
import FreelancerDetail from 'pages/FreelancerDetail'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'Freelancers',
  data () {
    return {
      freelancers: [],
      freelancer: {},
      jobs: [],
      searchQuery: this.$route.query.search
    }
  },
  methods: {
    showPanel (id) {
      this.loadFreelancer(id)
    },
    loadFreelancers () {
      axios.get(process.env.SOURCE_URL + '/v1/freelancers').then(res => {
        this.freelancers = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    loadFreelancer (id) {
      axios.get(process.env.SOURCE_URL + '/v1/freelancers/' + id)
        .then(res => {
          this.freelancer = res.data.data
          axios.get(process.env.SOURCE_URL + '/job/list?freelancerId=' + id).then(res => {
            this.jobs = res.data.data
            console.log(this.freelancer)
            this.$showPanel({
              component: FreelancerDetail,
              openOn: 'right',
              width: '1200px',
              cssClass: 'detail-color',
              props: {
                freelancer: this.freelancer,
                jobs: this.jobs
              }
            })
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadFreelancers()
  },
  computed: {
    filteredFreelancers () {
      if (this.searchQuery) {
        return this.freelancers.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v)) ||
          this.searchQuery.toLowerCase().split(' ').every(v => item.language.toLowerCase().includes(v))
        })
      } else {
        return this.freelancers
      }
    },
    ...mapState('auth', [
      'user'
    ])
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
  --size: 60px !important;
}
.freelancer-name {
  font-size: 20px;
  margin-bottom: 5px;
}
.freelancer-name:hover {
  cursor: pointer;
  color: #bd8585;
}
.info-income {
  margin-right: 24px;
  line-height: 25px;
  font-size: 16px;
}
</style>
