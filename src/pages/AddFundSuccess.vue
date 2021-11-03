<template>
  <div class="q-pa-md items-start q-gutter-md">
    <h3 class="font-owsald" style="margin-top: 50px">Add fund success</h3>
    <q-card  style="width: 50%;margin: auto" push bordered class="my-card">
      <q-card-section class="text-center">
      <p style="font-size: 20px">Your current balance is: {{ user.amount }}$</p>
        <q-btn label="Go to homepage" to="/" rounded type="button" size="20px" color="yellow-9"
               class="q-px-xl"/>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddFundSuccess',
  computed: {
    ...mapState('auth', [
      'user'
    ])
  }
}
</script>

<style scoped>

</style>
