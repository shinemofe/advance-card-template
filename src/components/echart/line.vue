<template>
  <div class="width-100" :style="style">
    <div class="lc-sub-title mt10" v-if="dataRes.showHead">
      <div class="lc-sub-title-left pl15">
        <span class="lc-sub-title-num">{{ total }}</span>
        <span class="lc-sub-title-unit ml5 f14">{{ dataRes.unit }}</span>
      </div>
      <div class="lc-sub-title-right f14 mr10">
        <div class="mt10" :class="isYoYIncrease ? 'lc-c-up' : 'lc-c-down'">
          <span class="lc-c-gray mr5">同比</span>
          <i class="iconfont f12" :class="isYoYIncrease ? 'icon-up' : 'icon-down'"></i>
          {{ YoY }}
        </div>
        <div class="mt10 ml10" :class="isYoYIncrease ? 'lc-c-up' : 'lc-c-up'">
          <span class="lc-c-gray mr5">环比</span>
          <i class="iconfont f12" :class="isQoQIncrease ? 'icon-up' : 'icon-down'"></i>
          {{ QoQ }}
        </div>
      </div>
    </div>
    <div
      ref="chart"
      style="width:100%;"
      :style="{ height: (dataRes.height || 230) + 'px', ...dataRes.style }"
    ></div>
  </div>
</template>

<script>
const Options = ({ dataX, dataValue, title, grid = {}, yAxis, xName = '', xRotate = 0, color }) => ({
  title: {
    show: !!title,
    text: title,
    textStyle: {
      color: color || '#262A30',
      fontSize: 16
    }
  },
  tooltip: {
    trigger: 'axis',
    confine: true,
    formatter: '{b0}' + xName + ': {c0}'
  },
  legend: {
    show: false
  },
  grid: {
    containLable: true,
    bottom: 23,
    top: 23,
    left: 50,
    right: 20,
    ...grid
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: dataX,
    name: xName,
    nameTextStyle: {
      verticalAlign: 'top',
      color: color || 'rgba(0,0,0,0.45)'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: color || 'rgba(0,0,0,0.45)',
        width: 1,
        type: 'solid'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: color || 'rgba(0,0,0,0.45)',
        type: 'solid'
      }
    },
    axisTick: {
      show: true
    },
    axisLabel: {
      rotate: xRotate,
      textStyle: {
        color: color || 'rgba(0,0,0,0.45)',
        fontSize: 12
      }
    },
    show: true
  },
  yAxis: {
    min: dataValue.yMin ? dataValue.yMin : 0,
    type: 'value',
    axisLine: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: color || 'rgba(0,0,0,0.45)',
        type: 'solid'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: color || 'rgba(0,0,0,0.45)',
        fontSize: 12
      }
    },
    show: true,
    ...yAxis
  },
  series: [
    {
      name: dataValue.title,
      data: dataValue.value,
      type: 'line',
      smooth: true,
      label: {
        normal: {
          show: true,
          position: 'top',
          color: color || 'rgba(0,0,0,0.45)'
        }
      },
      areaStyle: {
        color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: color || '#95befc' },
          { offset: 1, color: 'rgba(255,255,255,0)' }
        ])
      },
      itemStyle: {
        normal: {
          lineStyle: {
            color: color || 'rgba(50, 145, 255, 1)',
            opacity: 1,
            width: 2
          },
          opacity: 1,
          color: 'rgba(255,255,255,1)',
          borderColor: color || 'rgba(50, 145, 255, 1)',
          borderWidth: 2
        }
      },
      symbolSize: 8,
      symbol: 'circle',
      max: 965
    }
  ]
})
export default {
  name: 'line-chart',
  props: {
    dataRes: Object,
    width: Number
  },
  data () {
    return {
      style: { width: this.width + 'px' },
      total: '',
      YoY: '',
      QoQ: '',
      isYoYIncrease: true,
      isQoQIncrease: true
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = window.echarts.init(this.$refs.chart, null, { renderer: 'svg' })
    // 指定图表的配置项和数据
    var option = Options(this.dataRes)
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true)

    if (this.dataRes.showHead) {
      this.total = this.dataRes.dataValue.value.reduce((t, c) => {
        t += c
        return t
      }, 0)

      var YoY = parseFloat(this.dataRes.YoY)
      var QoQ = parseFloat(this.dataRes.QoQ)
      this.isYoYIncrease = YoY > 0
      this.isQoQIncrease = QoQ > 0
      this.YoY = Math.abs(YoY) + '%'
      this.QoQ = Math.abs(QoQ) + '%'
    }

    window.addEventListener('resize', function () {
      myChart && myChart.resize()
    })
  }
}
</script>

<style lang="less">
.lc-sub-title {
  display: flex;

  &-left {
    color: #3291ff;
    flex: 1;
  }

  &-num {
    font-size: 30px;
  }

  &-right {
    display: flex;
    white-space: nowrap;
    align-items: center;

    > div {
      flex: 1;
    }
  }

  .lc-c-gray {
    color: #5c626b;
  }

  .lc-c-up {
    color: #2dc888;
  }

  .lc-c-down {
    color: #d81e06;
  }
}
</style>
