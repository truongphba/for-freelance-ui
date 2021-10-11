<template>
  <q-page class="q-py-sm q-pl-sm">
    <q-card flat bordered class="q-pa-none q-ma-none" style="display: flex; justify-content: space-between;background: transparent;
    border: none;">
      <q-card-section v-if="totalByMonth.length > 0" class="shadow-1" style="width: 49% ;background:white;">
        <div class="text-h6" style="margin-bottom: 20px">Revenue Statistics</div>
        <bar-chart-month :chart-data="totalByMonth" :options="chartOptions" :chart-colors="revenueChartColor"
                   label="Total Cost By Month"></bar-chart-month>
      </q-card-section>
      <q-card-section v-if="countPaymentInMonth.length > 0" class="shadow-1" style="width: 49% ;background:white;">
        <div class="text-h6" style="margin-bottom: 20px">Contract statistics</div>
        <bar-chart-count-payment :chart-data="countPaymentInMonth" :options="chartOptions" :chart-colors="revenueChartColor"
                         label="Total Cost By Month"></bar-chart-count-payment>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="q-pa-none q-ma-none" style="display: flex; justify-content: space-between;background: transparent;
    border: none; margin-top: 15px">
      <q-card-section v-if="chartDataServiceTotal.labels.length > 0" class="shadow-1" style="width: 49% ;background:white;">
        <div class="text-h6" style="margin-bottom: 20px">Percentage of revenue by service</div>
        <pie-chart-service-total :data="chartDataServiceTotal" :options="chartOptionsServiceTotal"
                         label="Total Cost By Month"></pie-chart-service-total>
      </q-card-section>
      <q-card-section v-if="chartDataServiceCount.labels.length > 0" class="shadow-1" style="width: 49% ;background:white;">
        <div class="text-h6" style="margin-bottom: 20px">Percentage contract by service</div>
        <pie-chart-service-count :data="chartDataServiceCount" :options="chartOptionsServiceCount"
                                 label="Total Cost By Month"></pie-chart-service-count>
      </q-card-section>
    </q-card>
    <q-separator/>
  </q-page>
</template>

<script>
import axios from 'axios'
import BarChartMonth from 'components/chart/BarChartMonth'
import BarChartCountPayment from 'components/chart/BarChartCountPayment'
import PieChartServiceTotal from 'components/chart/PieChartServiceTotal'
import PieChartServiceCount from 'components/chart/PieChartServiceCount'
export default {
  name: 'Dashboard',
  components: {
    BarChartMonth,
    BarChartCountPayment,
    PieChartServiceTotal,
    PieChartServiceCount
  },
  data () {
    return {
      revenueChartColor: {
        borderColor: '#077187',
        pointColor: '#0E1428',
        pointBackgroundColor: '#AFD6AC',
        backgroundColor: '#74A57F'
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      totalByMonth: [],
      countPaymentInMonth: [],
      yearServicePayment: [],
      chartOptionsServiceTotal: {
        hoverBorderWidth: 20
      },
      chartDataServiceTotal: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: []
          }
        ]
      },
      totalCost: '',
      chartOptionsServiceCount: {
        hoverBorderWidth: 20
      },
      chartDataServiceCount: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: []
          }
        ]
      }
    }
  },
  created () {
    this.getChartByMonth()
    this.chartCountPaymentInMonth()
    this.pieChartServiceTotal()
    this.pieChartServiceCount()
  },
  methods: {
    async getChartByMonth () {
      const { data } = await axios.get(process.env.API_URL + '/Chart/yearPayment')
      data.totalCost.forEach(d => {
        const date = d.createDate
        const total = d.totalCost
        this.totalByMonth.push({ date, total })
      })
    },
    async chartCountPaymentInMonth () {
      const { data } = await axios.get(process.env.API_URL + '/Chart/yearPayment')
      data.totalCount.forEach(d => {
        const date = d.createDate
        const count = d.count
        this.countPaymentInMonth.push({ date, count })
      })
    },
    async pieChartServiceTotal () {
      const { data } = await axios.get(process.env.API_URL + '/Chart/serviceTotalCost')
      this.chartDataServiceTotal.labels = ['In-Bound', 'Out-Bound', 'Tele-Marketing']
      this.chartDataServiceTotal.datasets[0].data = Object.values(data)
      this.totalCost = data.totalCost
    },
    async pieChartServiceCount () {
      const { data } = await axios.get(process.env.API_URL + '/Chart/serviceTotalCount')
      const InBound = data.inBound / data.totalCount * 100
      const OutBound = data.outBound / data.totalCount * 100
      const Tele = data.tele / data.totalCount * 100
      this.chartDataServiceCount.labels = ['In-Bound', 'Out-Bound', 'Tele-Marketing']
      this.chartDataServiceCount.datasets[0].data.push(InBound, OutBound, Tele)
    }
  }
}
</script>
