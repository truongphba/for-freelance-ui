<template>
  <div>
    <div>
      <h3>See talent who match jobs like yours</h3>
      <div id="freelancers-project">
        <div id="freelancers">
          <h5>Get proposals from talent like this</h5>
          <div>
            <div style="margin-bottom: 24px;">
              <div itemscope="itemscope" itemtype="http://schema.org/Person">
                <div class="flex">
                  <div><img class="avatar"
                            src="https://www.upwork.com/profile-portraits/c1r2xSNC9gGbTgcYBA1f5Vt81p2u8aXLa_Hszw7b5XE6zMy4OxtKdG1f6AUXTb2M3e"
                            alt="Avatar"></div>
                  <div style="margin-left: 16px">
                    <div>
                      <p class="freelancer-name" v-on:click.prevent="showPanel">Dylan G.</p>
                      <slideout-panel></slideout-panel>
                    </div>
                    <div class="text-muted">
                      <p style="font-size: 16px">
                        Expert Web Developer | Graphic Designer | Integration Specialist
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div style="margin-right: 24px;">
                    <p>
                      <strong> $100.00 </strong>
                      <span aria-label="per hour"> /hr</span>
                    </p>
                    <p>Average rate</p>
                  </div>
                  <div style="margin-right: 24px;">
                    <p><strong> $8,940.84 </strong></p>
                    <p>Total earnings</p>
                  </div>
                  <div style="margin-right: 24px;">
                    <p><strong> 100% </strong></p>
                    <p>Job success</p>
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
export default {
  name: 'Freelancers',
  methods: {
    showPanel () {
      this.$showPanel({
        component: FreelancerDetail,
        openOn: 'right',
        props: {}
      })
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
</style>
