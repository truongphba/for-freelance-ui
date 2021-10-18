<template>
  <q-card style="margin: 50px auto;width: 60%; padding: 20px">
    <q-card class="my-card bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">Wordpress designer - customize theme to create Gorgeous Business Consulting Website</div>
        <!--        <div class="text-subtitle2">by John Doe</div>-->
      </q-card-section>

      <q-separator dark/>
      <div style="padding-inline: 50px">
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

        <q-separator dark style="margin-top: 10px"/>
        <div class="text-h6" style="padding-block: 10px">Detail job</div>
        <div class="text-subtitle1">
          Job description
        </div>
        <div class="text-body1" style="padding-left: 10px">
          {{ jobDescription }}
        </div>
        <div class="text-subtitle1">
          Skill required
        </div>
        <q-chip dense color="primary" text-color="white" v-for="(value, index) in skills" :key="index">
          {{ value }}
        </q-chip>
      </div>

      <q-separator dark/>

      <q-card-actions>
        <q-btn flat>Close</q-btn>
      </q-card-actions>
    </q-card>
  </q-card>
</template>

<script>
export default {
  name: 'DetailJob',
  data () {
    return {
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
      messages: []
    }
  }
}
</script>

<style scoped>

</style>
