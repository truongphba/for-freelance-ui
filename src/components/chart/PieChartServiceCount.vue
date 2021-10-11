<script>
import { Pie } from 'vue-chartjs'

export default {
  name: 'PieChartServiceCount',
  extends: Pie,
  props: ['data', 'options'],
  async mounted () {
    this.options.tooltips = {
      borderWidth: '10px',
      hoverBackgroundColor: 'red',
      hoverBorderWidth: '10px'
      // callbacks: {
      //   label: function (tooltipItem, data) {
      //     console.log(tooltipItem.datasetIndex, data.datasets[0].data[tooltipItem.datasetIndex])
      //     // // return tooltipItem.yLabel
      //     // return true
      //   }
      // }
    }
    this.renderChart(this.data,
    //   {
    //   borderWidth: '10px',
    //   hoverBackgroundColor: 'red',
    //   hoverBorderWidth: '10px'
    // },
      this.options)
  }
}
</script>

<style scoped>
</style>
