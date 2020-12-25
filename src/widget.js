/* eslint-disable */

import Vue from 'vue'
import Card from './card.vue'

export function init (elementOrSelector, context) {
  const prefix = context.getWidgetBasePath()
  if (prefix) {
    __webpack_public_path__ = `${prefix}dist/`
  }

  // 判断是否在小程序内
  // const isInNative = window.xm && window.xm.isInNative && window.xm.isInNative()

  // 非小程序内，需要初始化卡片
  // if (isInNative) {
  //   window.xm ? window.xm.sourceCheck({
  //     componentNames: [Card.name]
  //   }) : (console.warn('xm 不存在'))
  // } else {
  return new Vue({
    render: h => h(Card)
  }).$mount(elementOrSelector)
  // }
}
