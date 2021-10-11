<script>
import { Pie } from 'vue-chartjs'

export default {
  name: 'PieChartServiceTotal',
  extends: Pie,
  props: ['data', 'options'],
  mounted () {
    // this.options.tooltips = {
    //   callbacks: {
    //     label: function (tooltipItem, data) {
    //       console.log(tooltipItem)
    //       return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    //     }
    //   }
    // }
    this.renderChart(this.data, this.options)
  }
}
</script>

<style scoped>
</style>
