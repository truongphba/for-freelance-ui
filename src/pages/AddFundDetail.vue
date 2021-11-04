<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card push bordered class="my-card">
      <q-card-section style="text-align: center; font-size: 24px;">
        <strong>{{ $route.params.amount }} $</strong>
      </q-card-section>

      <div id="paypal-button" class="d-flex justify-content-center text-center mb-3"></div>
    </q-card>
  </div>
</template>

<script>
import { loadScript } from '@paypal/paypal-js'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddFundDetail',
  methods: {
    ...mapActions({
      getInfo: 'auth/getInfo'
    }),
    addFund: async function (amount, userId) {
      let paypal
      try {
        paypal = await loadScript({ sdkBaseURL: 'https://www.paypalobjects.com/api/checkout.js' })
        paypal.Button.render({
          env: 'sandbox',
          style: {
            size: 'large',
            color: 'gold',
            shape: 'pill',
            label: 'checkout'
          },
          payment: function (data, actions) {
            return actions.request.post(process.env.SOURCE_URL + '/job/payment/create-payment?amount=' + amount)
              .then(function (res) {
                return res.id
              })
          },
          onAuthorize: function (data, actions) {
            return actions.request.get(process.env.API_URL + '/job/payment/execute-payment?amount=' + amount + '&accountId=' + userId)
              .then(function (res) {
                window.location.replace('/add-fund/success')
              })
          }
        }, '#paypal-button')
      } catch (error) {
        console.error('failed to load the PayPal JS SDK script', error)
      }
    }
  },
  mounted () {
    this.addFund(this.$route.params.amount, this.user.id)
  },
  computed: {
    ...mapState('auth', [
      'user'
    ])
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
