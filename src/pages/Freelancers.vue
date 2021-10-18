<template>
  <div>
    <div>
      <h3>See talent who match jobs like yours</h3>
      <div class="row">
        <div class="col-8">
          <q-input outlined color="yellow-9" v-model="searchQuery" label="Some name, skill,..."/>
        </div>
      </div>
      <div id="freelancers-project">
        <div id="freelancers">
          <h5>Get proposals from talent like this</h5>
          <div v-for="freelancer in filteredFreelancers" :key="freelancer.id">
            <div style="margin-bottom: 24px;">
              <div itemscope="itemscope" itemtype="http://schema.org/Person">
                <div class="flex">
                  <div><img class="avatar"
                            :src="freelancer.thumbnail"
                            alt="Avatar"></div>
                  <div style="margin-left: 16px">
                    <div>
                      <p class="freelancer-name" v-on:click.prevent="showPanel(freelancer.id)">{{freelancer.name}}</p>
                      <slideout-panel></slideout-panel>
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
                      <span aria-label="per hour"> /hr</span>
                    </div>
                    <div>Average rate</div>
                  </div>
                  <div class="info-income">
                    <div><strong> $8,940.84 </strong></div>
                    <div>Total earnings</div>
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
        </div> <!---->
      </div>
    </div>
  </div>
</template>

<script>
import FreelancerDetail from 'pages/FreelancerDetail'
import axios from 'axios'
export default {
  name: 'Freelancers',
  data () {
    return {
      freelancers: [],
      searchQuery: ''
    }
  },
  methods: {
    showPanel (id) {
      this.$showPanel({
        component: FreelancerDetail,
        openOn: 'right',
        width: '1200px',
        cssClass: 'detail-color',
        props: {
          freelancer_id: id
        }
      })
    },
    loadFreelancers () {
      axios.get('http://localhost:8088/v1/freelancers').then(res => {
        this.freelancers = res.data.data
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
    }
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
