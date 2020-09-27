<template>
  <div class="pie">
    <div
      ref="chart"
      style="width:100%;"
      :style="{ height: (dataRes.height || 230) + 'px', ...dataRes.style }"
    ></div>
    <div class="guide">
      <div :style="{ fontSize: dataRes.guide && dataRes.guide.fontSize ? (dataRes.guide.fontSize + 'px') : null }" class="percent"></div>
      <div :style="{ fontSize: dataRes.guide && dataRes.guide.fontSize ? (dataRes.guide.fontSize + 'px') : null }" class="name"></div>
    </div>
  </div>
</template>

<script>
const Options = ({
  dataValue,
  type,
  color,
  radius,
  labelLine = {},
  legend = {},
  showGuide,
  title,
  center,
  label = {}
}) => ({
  title: {
    show: !!title,
    text: title,
    textStyle: {
      color: '#262A30',
      fontSize: 16
    }
  },
  color: color || [
    '#46CAA5',
    '#FEBE56',
    '#62B8FF',
    '#F66670',
    '#64A1FF',
    '#67D2F3',
    '#986ED0',
    '#FFA658'
  ],
  tooltip: {
    show: !showGuide,
    confine: true,
    trigger: 'item',
    formatter: '{b}: {d}%'
  },
  legend: {
    orient: 'vertical',
    top: 'middle',
    right: 'right',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      fontSize: 12,
      color: '#8C8C8C'
    },
    formatter: function (name) {
      return name.length > 8 ? name.substr(0, 7) + '...' : name
    },
    ...legend
  },
  series: [
    {
      name: dataValue.name,
      type: 'pie',
      center: center || ['37%', '55%'],
      radius: radius || (type !== 'fullpie' ? ['50%', '80%'] : ['0', '80%']),
      label: {
        normal: {
          show: true,
          position: 'outer',
          formatter: '{c}',
          color: '#5C626B',
          fontSize: 12,
          ...label.normal
        }
      },
      emphasis: {
        label: {
          show: true,
          ...label.emphasis
        }
      },
      labelLine: {
        show: false,
        length: 15,
        length2: 0,
        ...labelLine
      },
      data: dataValue.value.map(x => ({
        value: x.value,
        name: x.name
      }))
    }
  ]
})
export default {
  name: 'pie-chart',
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

    this.dataRes.showGuide && this.renderGuide(myChart)
    window.addEventListener('resize', function () {
      myChart && myChart.resize()
    })
  },
  methods: {
    renderGuide (myChart) {
      const guide = this.$refs.chart.parentNode.querySelector('.guide')
      const percent = guide.querySelector('.percent')
      const name = guide.querySelector('.name')
      myChart.on('click', ev => {
        percent.innerText = ev.percent + '%'
        percent.style.color = ev.color
        name.innerText = ev.name
      })
    }
  }
}
</script>

<style lang="less">

.pie {
  position: relative;

  .guide {
    position: absolute;
    top: 50%;
    left: 37%;
    width: 30%;
    margin-left: -15%;
    margin-top: -5%;

    .percent {
      text-align: center;
      font-size: 26px;
    }

    .name {
      text-align: center;
      font-size: 14px;
      color: #959ba3;
    }
  }
}
</style>
