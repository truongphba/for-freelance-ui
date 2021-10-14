<template>
  <div>
    <div style="margin-top: 100px; margin-inline: 50px">
      <div style="border: solid 1px;  border-radius: 5px">
        <div class="flex " style="padding: 20px;">
          <div><img class="avatar"
                    :src="freelancer.thumbnail"
                    alt="Avatar"></div>
          <div style="margin-left: 16px; ">
            <div>
              <p class="freelancer-name">{{ freelancer.name }}</p>
            </div>
            <div class="text-muted" style="margin-bottom: 5px">
              <i class="fas fa-map-marker-alt"></i>
              <span style="font-size: 18px">
                {{ freelancer.address }}
              </span>
            </div>
            <div style="font-size: 18px">
              <span style="margin-right: 10px">{{ freelancer.rate }} % </span>
              <span>Rated</span>
            </div>
          </div>
        </div>
        <hr style="margin: unset">
        <div class="row">
          <div class="col-4" style="border-right: solid 1px">
            <div style="padding-inline: 20px">
              <div style="margin: 5px 0; font-size: 16px">
                <span><strong>Gender: </strong></span>{{freelancer.gender}}
              </div>
              <div style="margin: 5px 0; font-size: 16px">
                <span><strong>Experience: </strong></span>{{freelancer.experience}}
              </div>
              <div style="margin: 5px 0; font-size: 16px">
                <span><strong>Average Income: </strong></span>{{freelancer.averageIncome}}$/h
              </div>
            </div>
            <hr>
            <div style="padding-inline: 20px">
              <div class="flex" style="justify-content: space-around">
                <div>
                  <p><strong>10000 $</strong></p>
                  <p>Total Earnings</p>
                </div>
                <div>
                  <p><strong>12</strong></p>
                  <p>Total Jobs</p>
                </div>
                <div>
                  <p><strong>123</strong></p>
                  <p>Total Hours</p>
                </div>
              </div>
            </div>
            <hr>
          </div>
          <div class="col-6" style="padding-inline: 20px">
            <div style="margin: 5px 0; font-size: 24px">
              <strong>{{freelancer.title}}</strong>
            </div>
            <div style="width: 480px; font-size: 16px">
              {{ freelancer.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FreelancerDetail',
  props: {
    freelancer_id: Number
  },
  data () {
    return {
      freelancer: {}
    }
  },
  methods: {
    loadFreelancer () {
      axios.get(process.env.API_URL + '/v1/freelancers/' + this.freelancer_id, { headers: { Authorization: 'Bearer 056abcf5-5b4d-4639-847b-9058086999c5' } })
        .then(res => {
          this.freelancer = res.data.data
        }).catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadFreelancer()
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
</style>
