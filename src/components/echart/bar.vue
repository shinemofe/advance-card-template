<template>
  <div
    ref="chart"
    style="width:100%;"
    :style="{ height: (dataRes.height || 230) + 'px', ...dataRes.style }"
  ></div>
</template>

<script>
const Colors = [
  '#62B8FF', '#46CAA5', '#FEBE56', '#F66670'
]
const Options = ({
  dataX,
  dataY,
  dataValue,
  showLine,
  showLegend,
  hideLabel,
  title,
  barRadius = 15,
  barWidth = 15,
  yAxis = {},
  xAxis = {},
  xRotate = 0,
  yRotate = 0,
  barGap = 0,
  xName = '',
  barDirection = 'horizontal',
  yLineType = 'solid',
  grid = {},
  tooltip = {},
  label = {},
  legend = {},
  axisLabelTextStyle = {}
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
      type: 'shadow'
    },
    formatter: '{b0}' + xName + ': {c0}',
    ...tooltip
  },
  legend: {
    show: !!showLegend,
    itemWidth: 10,
    itemHeight: 10,
    ...legend
  },
  grid: {
    containLable: true,
    bottom: 20,
    top: 26,
    left: 50,
    right: 20,
    ...grid
  },
  xAxis: {
    type: barDirection === 'horizontal' ? 'value' : 'category',
    show: !!showLine,
    name: xName,
    nameTextStyle: {
      verticalAlign: 'top',
      color: 'rgba(0,0,0,0.45)'
    },
    data: barDirection === 'vertical' ? dataX : [],
    splitLine: {
      show: barDirection === 'horizontal',
      lineStyle: {
        color: 'rgba(0,0,0,0.15)'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0,0,0,0.15)'
      }
    },
    axisLabel: {
      rotate: xRotate,
      interval: 0,
      textStyle: {
        color: 'rgba(0,0,0,0.45)',
        fontSize: 12,
        ...axisLabelTextStyle
      }
    },
    ...xAxis
  },
  yAxis:
    !dataY || !dataY.length
      ? {
        type: barDirection === 'horizontal' ? 'category' : 'value',
        data: barDirection === 'horizontal' ? dataX : [],
        axisLine: {
          show: false
        },
        splitLine: {
          show: barDirection === 'vertical',
          lineStyle: {
            color: 'rgba(0,0,0,0.15)',
            type: yLineType
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          rotate: yRotate,
          textStyle: {
            color: 'rgba(0,0,0,0.45)',
            fontSize: 12
          }
        },
        show: true,
        ...yAxis
      }
      : dataY.map(x => ({
        type: barDirection === 'horizontal' ? 'category' : 'value',
        data: barDirection === 'horizontal' ? dataX : [],
        axisLine: {
          show: false
        },
        splitLine: {
          show: barDirection === 'vertical'
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          rotate: yRotate,
          textStyle: {
            color: 'rgba(0,0,0,0.45)',
            fontSize: 12
          }
        },
        show: true,
        ...x
      })),
  series: dataValue.map((x, i) => ({
    name: x.title,
    data: x.value,
    type: 'bar',
    stack: x.stack || false,
    barGap,
    label: {
      normal:
        barDirection === 'horizontal'
          ? {
            show: !hideLabel,
            position: 'insideLeft',
            color: '#fff',
            ...label
          }
          : {
            show: !hideLabel,
            position: 'top',
            color: '#000'
          }
    },
    itemStyle: {
      normal: {
        barBorderRadius: barRadius,
        color: x.colorIdx === undefined ? Colors[i] : Colors[x.colorIdx]
      }
    },
    barWidth
  }))
})
export default {
  name: 'bar-chart',
  props: {
    dataRes: Object
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = window.echarts.init(this.$refs.chart, null, { renderer: 'svg' })
    // 指定图表的配置项和数据
    var option = Options(this.dataRes)

    if (this.dataRes.dataValue.length > 1) {
      delete option.tooltip.formatter
    }
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
