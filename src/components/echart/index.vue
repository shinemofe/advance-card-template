<template>
  <xmcard-panel
    :label="label"
    :item="{
      id,
      componentName: name
    }"
  >
    <component
      v-if="echartName"
      :is="echartName"
      :dataRes="echartData"
    />

    <slot />
  </xmcard-panel>
</template>

<script>
import Bar from './bar'
import Line from './line'
import MultiLine from './multi-line'
import Pie from './pie'
import Mix from './mix'

export default {
  components: {
    [Bar.name]: Bar,
    [Line.name]: Line,
    [MultiLine.name]: MultiLine,
    [Pie.name]: Pie,
    [Mix.name]: Mix
  },

  props: {
    id: [String, Number],
    name: String,
    label: {
      type: String,
      default: '卡片标题'
    },
    echartName: String,
    echartData: Object
  }
}
</script>
