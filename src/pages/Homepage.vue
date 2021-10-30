<template>
  <div style="padding-bottom: 100px">
    <div class="row">
      <div class="col-md-7">
        <h1 class="font-owsald text-yellow-9 q-mb-md" style="font-size: 7rem">Join the world's
          work marketplace</h1>
        <p class="slogan">Find great talent. Build your business.<br>
          Take your career to the next level.</p>
        <div class="row">
          <div class="col-8">
            <q-input outlined color="yellow-9" v-model="search" label="Some name, skill,..."/>
          </div>
          <div class="col-4">
            <q-btn label="Find Talent" rounded type="button" size="20px" color="yellow-9"
                 @click="getSearch"  class="q-mx-lg q-px-lg full-height"/>
          </div>
        </div>
        <p class="trusted">Trusted by</p>
        <div>
          <img src="~assets/images/aptech.jpg" style="width: 100px; height: auto">
        </div>
      </div>
      <div class="col-md-5 flex flex-center">
        <img style="width: 100%" src="~assets/images/banner.webp"/>
      </div>
    </div>
    <div class="section">
      <div class="for-client">
        <div style="width: 40%">
          <p style="color: white; font-size: 25px; font-weight: bold">For clients</p>
          <h3 style="color: white; font-size: 100px;line-height: 85px;margin-top: 80px;margin-bottom: 0">Find talent your way</h3>
          <p style="color: white; margin-top: 50px; font-size: 20px">Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.</p>
        </div>
        <div class="row q-mt-xl">
          <div class="col-4">
            <div class="for-client-box bg-yellow-9" style="margin-right: 20px">
              <p>Let us help you find the right talent</p>
              <p>Find talent <q-icon name="fas fa-arrow-right" /></p>
            </div>
          </div>
          <div class="col-4">
            <div class="for-client-box bg-yellow-9 soon" style="margin: 0 20px">
              <p>Post a job and hire a pro</p>
              <p>Coming soon...</p>
            </div>
          </div>
          <div class="col-4">
            <div class="for-client-box bg-yellow-9 soon" style="margin-left: 20px">
              <p>Browse and buy project</p>
              <p>Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section hire-talent">
      <div class="row">
        <div class="col">
          <p class="hire-title">Hire a pro
            for any skill</p>
          <ul class="hire-ul">
            <li>Front-End Developer</li>
            <li>Back-End Developer</li>
            <li>Data Mining</li>
            <li>Mobile App Developer</li>
            <li>DevOps Engineering</li>
            <li>Full stack Developer</li>
          </ul>
        </div>
        <div class="col">
          <div>
            <img src="https://tapchiphunuvn.com/wp-content/uploads/2020/12/Freelancer-3.jpg" style="width: 100%;height: auto;border-radius: 10px">
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="for-talent">
       <div class="row">
         <div class="col">
           <img src="https://www.upwork.com/static/assets/Brontes/c19d17f4/img/find-great-work.935b155.jpg" style="height: 100%;width: 100%">
         </div>
         <div class="col">
          <div style="padding: 40px">
           <div style="width: 80%">
             <p style="color: white; font-size: 25px; font-weight: bold">For talent</p>
             <h3 style="color: white; font-size: 100px;line-height: 90px;margin-top: 30px;margin-bottom: 0">Find great
               work</h3>
             <p style="color: white; font-size: 20px;margin-top: 50px">Meet clients you’re excited to work with and take
               your career or business to new heights</p>
           </div>
            <div style="margin-top: 100px; border-top: solid 1px white;">
              <div class="row" style="padding: 20px 0">
                <div class="col">
                  <p style="color: white; font-size: 20px; margin-right: 20px">Find opportunities for every stage of your freelance career</p>
                </div>
                <div class="col">
                  <p style="color: white; font-size: 20px; margin: 0 20px">Control when, where, and how you work</p>
                </div>
                <div class="col">
                  <p style="color: white; font-size: 20px; margin-left: 20px">Explore different ways to earn</p>
                </div>
              </div>
              <q-btn label="Become Freelance" outline rounded type="submit" size="20px" color="white"
                     class="q-px-lg" to="/register-freelancer"/>
            </div>
          </div>
         </div>
       </div>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <div class="col">
          <p class="hire-title">What they’re
             saying</p>
          <div style="margin-left: 30%;margin-top: 100px;width: 350px">
            <div>
              <img src="~assets/images/feedback-1.webp" style="width: 100%; height: auto;border-radius: 10px">
            </div>
            <p class="feedback">“The freelance talent we work with are more productive than we ever thought possible.”</p>
            <div class="feedback-author">
              <p>Cara Bedford</p>
              <p>Director of Strategic Marketing, CompuVision</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div style="margin-top: 20px;margin-left: 10%;width: 350px">
            <div>
              <img src="~assets/images/feedback-2.webp" style="width: 100%; height: auto;border-radius: 10px">
            </div>
            <p class="feedback">“My relationship with Cara & CompuVision keeps on growing. The projects get larger and more technical every year.”</p>
            <div class="feedback-author">
              <p>Sam Crockett</p>
              <p>Independent Web Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Homepage',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions({
      getInfo: 'auth/getInfo'
    }),
    getSearch () {
      window.location.href = `/freelancers?search=${this.search}`
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style scoped>
.slogan {
  font-size: 30px;
  color: #5c4e37;
}

.trusted {
  margin-top: 50px;
  font-size: 15px;
  color: #5c4e37;
}

.section {
  margin-top: 50px;
}

.for-client {
  background: url("~assets/images/find-talent.webp") no-repeat;
  background-size: 100% 100%;
  padding: 30px;
  border-radius: 10px;
}
.for-client-box{
  color: white;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  height: 200px;
}
.for-client-box.soon{
  background: darkgray!important;
  opacity: 0.5;
}

.for-client-box:not(.soon):hover{
  color: #f9a825;
  background: white!important;
}
.for-client-box p:first-child{
  margin-bottom: 30px;
  font-size: 30px;
}
.hire-title{
  font-size: 80px;
  line-height: 90px;
}
.hire-talent{
  margin: 70px 10% 0 10%;
}
.hire-ul{
  margin-top: 30px;
  padding: 0;
  list-style-type: none;
}
.hire-ul li{
  cursor: pointer;
  font-size: 35px;
  color: #5c4e37;
}
.hire-ul li:hover{
  color:#f9a825;
}
.for-talent{
  background: #7cb342;
  border-radius: 10px;
}
.feedback{
  color: #f9a825;
  font-size: 30px;
}
.feedback-author{
  border-top: 1px solid gray;
}
.feedback-author p{
  margin: 0;
}
.feedback-author p:first-child{
  margin-top: 20px;
  font-size: 18px;
}
.feedback-author p:last-child{
  color: darkgray;
  font-size: 18px;
}
</style>
