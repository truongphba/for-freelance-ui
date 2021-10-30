<template>
  <div class="q-pa-md items-start q-gutter-md">
    <h3 class="font-owsald" style="margin-top: 50px">Add Fund</h3>
    <q-card push bordered class="my-card">
      <q-card-section>
        <q-select style="margin-top: 10px" outlined v-model="amount" :options="amount_option"
                  label="Choose the amount"/>
      </q-card-section>

      <q-card-section>
        <q-btn style="margin: 0px 120px" rounded color="green" label="ADD FUNDS" @click="addFund"/>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'AddFund',
  data () {
    return {
      success: false,
      text: '',
      payment: 'Manual',
      payment_option: [
        'Credit or debit card', 'Paypal'
      ],
      amount: '',
      amount_option: [
        50, 100, 200, 500, 1000, 2000
      ]
    }
  },
  props: ['user'],
  methods: {
    addFund () {
      if (this.amount !== '') {
        this.$router.push({ path: '/add-fund-detail/' + this.amount })
      }
    }
  }
}
</script>

<style scoped>
.my-card {
  margin: 40px auto;
  width: 100%;
  max-width: 400px
}
</style>
