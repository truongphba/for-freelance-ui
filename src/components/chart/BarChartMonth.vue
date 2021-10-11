<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChartMonth',
  extends: Bar,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    chartColors: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  mounted () {
    const months = this.chartData.map(d => d.date)
    const totals = this.chartData.map(d => d.total)
    console.log(totals)
    const { borderColor, pointColor, pointBackgroundColor, backgroundColor } = this.chartColors
    this.options.tooltips = {
      callbacks: {
        label: function (tooltipItem, data) {
          return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
      }
    }
    this.options.scales = {
      yAxes: [
        {
          ticks: {
            callback: function (label, index, labels) {
              var addCommas = function (nStr) {
                nStr += ''
                var x = nStr.split('.'),
                  x1 = x[0],
                  x2 = x.length > 1 ? '.' + x[1] : ''
                var rgx = /(\d+)(\d{3})/
                while (rgx.test(x1)) {
                  x1 = x1.replace(rgx, '$1' + ',' + '$2')
                }
                return x1 + x2
              }
              return addCommas(label)
            }
          }
        }
      ]
    }
    this.renderChart({
      labels: months,
      datasets: [
        {
          label: 'Total Cost',
          data: totals,
          borderColor: borderColor,
          pointColor: pointColor,
          pointBackgroundColor: pointBackgroundColor,
          backgroundColor: backgroundColor
        }
      ]
    },
    this.options)
  }
}
</script>

<style scoped>
</style>
