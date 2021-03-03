import Vue from 'vue'
import Mobile from './mobile.vue'
import Tv from './tv.vue'
import Pc from './pc.vue'

const ua = navigator.userAgent
if (/tv/.test(ua)) {
  Vue.component(Tv.name, Tv)
} else if (/pc/.test(ua)) {
  Vue.component(Pc.name, Pc)
} else {
  Vue.component(Mobile.name, Mobile)
}
