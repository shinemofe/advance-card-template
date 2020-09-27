<template>
  <div
    ref="chart"
    style="width:100%;"
    :style="{ height: (dataRes.height || 230) + 'px', ...dataRes.style }"
  ></div>
</template>

<script>
const Colors = ['#62B8FF', '#46CAA5', '#FEBE56', '#F66670']
const Options = ({
  dataValue,
  // showLegend,
  title,
  xAxis,
  yAxis,
  barRadius = 15,
  barWidth = 15,
  grid = {},
  tooltip = {},
  legend = {}
}) => ({
  title: {
    show: !!title,
    text: title,
    textStyle: {
      color: '#262A30',
      fontSize: 16
    }
  },
  tooltip: {
    confine: true,
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    ...tooltip
  },
  legend: {
    // show: showLegend,
    // show:dataValue.showLegend ? dataValue.showLegend : false,
    show: true,
    data: dataValue.map(x => x.name),
    top: title ? 50 : 0,
    ...legend
  },
  grid: {
    containLable: true,
    bottom: 20,
    top: 26,
    left: 30,
    right: 30,
    ...grid
  },
  xAxis: xAxis.map((x, i) => ({
    type: 'category',
    boundaryGap: true,
    // data: xAxis[i]
    ...x
  })),
  yAxis: yAxis.map((x) => ({
    type: 'value',
    ...x
  })),
  series: dataValue.map((x, i) => ({
    ...x,
    data: x.value,
    stack: false,
    itemStyle: {
      normal: {
        barBorderRadius: barRadius,
        color: x.colorIdx === undefined ? Colors[i] : Colors[x.colorIdx]
      }
    },
    yAxisIndex: i,
    barWidth
  }))
})
export default {
  name: 'mix-chart',
  props: {
    dataRes: Object
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = window.echarts.init(this.$refs.chart, null, { renderer: 'svg' })
    // 指定图表的配置项和数据
    var option = Options(this.dataRes)

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true)
    this.myChart = myChart

    window.addEventListener('resize', function () {
      myChart && myChart.resize()
    })
  },
  watch: {
    dataRes: function (data) {
      // 指定图表的配置项和数据
      var option = Options(data)

      if (this.dataRes.dataValue.length > 1) {
        delete option.tooltip.formatter
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="less">
</style>
