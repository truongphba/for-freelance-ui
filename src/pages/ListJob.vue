<template>
  <div>
    <h3 class="font-owsald">My Jobs</h3>
    <q-tabs
      v-model="tab"
      class="text-yellow-9 q-mb-md"
    >
      <q-tab name="pending" icon="far fa-clock" label="Pending" />
      <q-tab name="processing" icon="fas fa-running" label="Processing" />
      <q-tab name="success" icon="far fa-check-circle" label="Success" />
    </q-tabs>
    <q-card bordered >
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pending">
          <q-card-section >
            <div class="text-h4">Jobs in pending</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-card-section>
        </q-tab-panel>

        <q-tab-panel name="processing">
          <q-card-section>
          <div class="text-h4">Jobs in processing</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-card-section>
        </q-tab-panel>

        <q-tab-panel name="success">
          <q-card-section>
          <div class="text-h4">Jobs success</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ListJob',
  data () {
    return {
      tab: 'processing'
    }
  }
}
</script>

<style scoped>
  .text-h4{
    border-bottom: 1px solid darkgray;
    padding-bottom: 20px;
  }
</style>
