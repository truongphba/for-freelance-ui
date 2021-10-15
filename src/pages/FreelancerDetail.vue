<template>
  <div>
    <div style="margin: 76px 20px 60px">
      <div style="border: solid 1px gainsboro;  border-radius: 5px; background: white">
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
              <star-rating :value="freelancer.rate" :disabled="true"></star-rating>
            </div>
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
                  <div><strong>10000 $</strong></div>
                  <div>Total Earnings</div>
                </div>
                <div style="margin-right: 20px;">
                  <div><strong>12</strong></div>
                  <div>Total Jobs</div>
                </div>
                <div>
                  <div><strong>123</strong></div>
                  <div>Total Hours</div>
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
                        <div>
                          <div class="text-h6">Need experienced React Engineer — Data Analytics — US venture-funded startup</div>
                          <div class="text-gray">Rate: 5.00 - Aug 30, 2021 - Sep 2, 2021</div>
                          <div class="feedback">
                            "The team stayed on budget and created exactly what we wanted. This was the second time I've used this freelancer, and won't be the last. Would recommend, with utmost confidence."
                          </div>
                          <div class="row mt-20 mt-lg-10 text-gray">
                            <div class="col-4">
                              <strong>$1,600.00</strong>
                            </div>
                            <div class="col-4">
                              <strong>$40.00</strong>
                              <span>/ hr</span></div>
                            <div class="col-4">
                              <strong>40</strong>
                              <span>hours</span>
                            </div> <!---->
                          </div>
                        </div>
                        <hr style="border: 0.5px solid gainsboro;">
                        <div>
                          <div class="text-h6">Need experienced React Engineer — Data Analytics — US venture-funded startup</div>
                          <div class="text-gray">Aug 30, 2021 - Sep 2, 2021</div>
                          <div class="text-gray">No feedback given</div>
                          <div class="row mt-20 mt-lg-10 text-gray">
                            <div class="col-4">
                              <strong>$1,600.00</strong>
                            </div>
                            <div class="col-4">
                              <strong>$40.00</strong>
                              <span>/ hr</span></div>
                            <div class="col-4">
                              <strong>40</strong>
                              <span>hours</span>
                            </div> <!---->
                          </div>
                        </div>
                        <hr style="border: 0.5px solid gainsboro;">
                        <div>
                          <div class="text-h6">Need experienced React Engineer — Data Analytics — US venture-funded startup</div>
                          <div class="text-gray">Rate: 5.00 - Aug 30, 2021 - Sep 2, 2021</div>
                          <div class="row mt-20 mt-lg-10 text-gray">
                            <div class="col-4">
                              <strong>$1,600.00</strong>
                            </div>
                            <div class="col-4">
                              <strong>$40.00</strong>
                              <span>/ hr</span></div>
                            <div class="col-4">
                              <strong>40</strong>
                              <span>hours</span>
                            </div> <!---->
                          </div>
                        </div>
                      </q-tab-panel>

                      <q-tab-panel name="in_progress">
                        <div>
                          <div class="text-h6">Need experienced React Engineer — Data Analytics — US venture-funded startup</div>
                          <div class="row mt-20 mt-lg-10 text-gray">
                            <div class="col-4">
                              <strong>$1,600.00</strong>
                            </div>
                            <div class="col-4">
                              <strong>$40.00</strong>
                              <span>/ hr</span></div>
                            <div class="col-4">
                              <strong>40</strong>
                              <span>hours</span>
                            </div> <!---->
                          </div>
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
  </div>
</template>

<script>
import axios from 'axios'
import StarRating from 'components/StarRating'

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
      tab: 'completed'
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
.feedback {
  line-height: 2;
  font-style: italic;
  font-size: 16px
}
.text-gray{
  color: gray;
}
</style>
