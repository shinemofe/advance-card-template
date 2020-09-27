<template>
  <div>
    <!-- 图表 -->
    <echarts
      id="33333333"
      name="demo_tab1_1-33333333"
      :label="d.echart.label"
      :echart-name="d.echart.componentName"
      :echart-data="d.echart.dataRes"
    >
      <!-- 自定义表格组件 -->
      <xm-table v-bind="d.table" />
    </echarts>
  </div>
</template>

<script>
import Echarts from '../../components/echart'
import XmTable from '../../components/table'
import mock from '../../mock/demo/tab1'

export default {
  name: 'demo_tab1_1-33333333',

  components: {
    XmTable,
    Echarts
  },

  data () {
    return {
      d: mock[0]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
