<template>
  <div
    ref="chart"
    style="width:100%;"
    :style="{ height: (dataRes.height || 230) + 'px', ...dataRes.style }"
  ></div>
</template>

<script>
const Colors = ['#62B8FF', '#46CAA5', '#FEBE56', '#F66670'].map(x => ({
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0, color: x // 0% 处的颜色
    },
    {
      offset: 1, color: 'rgba(255,255,255,0)' // 100% 处的颜色
    }
  ]
}))
// [
// new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//   { offset: 0, color: '#62B8FF' },
//   { offset: 1, color: 'rgba(255,255,255,0' }
// ]),
// new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//   { offset: 0, color: '#46CAA5' },
//   { offset: 1, color: 'rgba(255,255,255,0' }
// ]),
// new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//   { offset: 0, color: '#FEBE56' },
//   { offset: 1, color: 'rgba(255,255,255,0' }
// ]),
// new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//   { offset: 0, color: '#F66670' },
//   { offset: 1, color: 'rgba(255,255,255,0' }
// ])
// ]

// const Options = ({ dataX, dataValue, title, grid = {}, xName = '', showArea = false, yAxis={} }) => ({
// 解决multi-line没有坐标轴问题
const Options = ({ dataX, dataValue, title, grid = {}, legend = {}, xName = '', showArea = false, yAxis }) => ({
  title: {
    show: !!title,
    text: title,
    textStyle: {
      color: '#262A30',
      fontSize: 16
    },
    top: 10
  },
  color: ['#0098FF', '#46CAA5', '#EE8C32', '#A884D7'],
  tooltip: {
    trigger: 'axis',
    confine: true,
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    show: true,
    data: dataValue.map(x => x.name),
    top: title ? 50 : 0,
    ...legend
  },
  grid: {
    containLable: true,
    top: title ? 100 : 50,
    bottom: 23,
    left: 50,
    right: 23,
    ...grid
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: dataX,
    name: xName,
    nameTextStyle: {
      verticalAlign: 'top',
      color: 'rgba(0,0,0,0.45)'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0,0,0,0.45)',
        width: 1,
        type: 'solid'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: 'rgba(0,0,0,0.45)',
        type: 'solid'
      }
    },
    axisTick: {
      show: true
    },
    axisLabel: {
      interval: 0,
      textStyle: {
        color: 'rgba(0,0,0,0.45)',
        fontSize: 12
      }
    },
    show: true
  },
  // yAxis: {
  //   type: 'value',
  // axisLine: {
  //   // 纵坐标轴
  //   show: false
  // },
  //   splitLine: {
  //     show: true,
  //     lineStyle: {
  //       color: 'rgba(0,0,0,0.15)',
  //       type: 'solid'
  //     }
  //   },
  // axisTick: {
  //   show: false
  // },
  //   axisLabel: {
  //     textStyle: {
  //       color: 'rgba(0,0,0,0.45)',
  //       fontSize: 12
  //     }
  //   },
  //   show: true,
  //   ...yAxis
  // },
  // 解决没有双纵坐标、没有单位的问题
  yAxis: Array.isArray(yAxis) ? yAxis.map((x) => ({
    axisTick: {
      show: false
    },
    axisLine: {
      // 纵坐标轴
      show: false
    },
    type: 'value',
    ...x
  })) : {
    type: 'value',
    axisLine: {
      // 纵坐标轴
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0,0,0,0.15)',
        type: 'solid'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: 'rgba(0,0,0,0.45)',
        fontSize: 12
      }
    },
    show: true,
    ...yAxis
  },
  series: dataValue.map((x, i) => ({
    ...x,
    name: x.name,
    type: 'line',
    stack: false,
    data: x.value,
    label: {
      normal: {
        position: 'top',
        color: 'rgba(0,0,0,0.45)'
      }
    },
    areaStyle: showArea ? {
      color: Colors[i]
    } : null
  }))
})
export default {
  name: 'multi-line-chart',
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
