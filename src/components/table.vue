<template>
  <div class="ioc__table tc">
    <div class="ioc__head flex-center-align" :class="headClass" :style="headStyle">
      <div
        v-for="(item, i) in head"
        :key="i"
        :style="{ width: width[i] }"
        v-html="item"
      />
    </div>
    <div class="ioc__body" :class="bodyClass" :style="bodyStyle">
      <div
        v-for="(item, i) in bodyData"
        class="ioc__body-item flex-center-align"
        :key="i"
        :class="{
          'ioc__body-item--border': border
        }"
      >
        <div
          v-for="(it, j) in head"
          class="ptb10"
          :style="{ width: width[j] }"
          :key="j"
        >
          <span v-html="showIndex && j === 0 ? i + 1 : item[j]" />
        </div>
      </div>
    </div>
    <div v-if="showMore" class="ptb10 flex-center" @click="spread = !spread">
      <span class="mr5">{{ spread ? '收起' : '查看全部' }}</span>
      <img class="ioc__table--icon" :class="{ 'ioc__table--rotate-more': spread }" width="12px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAilBMVEUAAABcZnBaY2tcY2pgYG5cYmlTZmxeY21fZGlfZG5bYGpbZWpaY21eY21dYWtbZG1gZG1eYmtcYWpbY2xfY2xdYmpcYGlcYG1aY2tfY2tdZW1cZGxeYm5dZGxbY2taYmxaY21bYmxbY2xbYmxaYmxbYmxbYWxbYmxbYmtbYm1bYmxbYmxbYmxbYWwAzDYpAAAALnRSTlMAGR8kJScoMTMzNTU2Njc4ODk6Ozs8PT0+Pj9AQUJDrLLu7u/w8PHx8vLz9PX2NSEckwAAAHhJREFUGBnNwQsWQkAAQNHX/5+QkEo1DDOj/W+vOI6DLMC9jNVkRs9ySun5edBxK2JKq1dxp+VqxIbK+m0iGoERO2pbYUJqnk6PNA6J9qm4Sp5osaQ682NnuUOHneUOWFJ59LhKWvtE+/y56FSYkAGBKSIGzReM3RcQUwhzdp/LnAAAAABJRU5ErkJggg==" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ioc-table',

  data () {
    return {
      spread: false
    }
  },

  computed: {
    bodyData () {
      return this.showMore && !this.spread
        ? this.body.slice(0, this.spreadSize)
        : this.body
    }
  },

  props: {
    showIndex: Boolean,
    width: {
      type: Array,
      default () {
        return []
      }
    },
    border: Boolean,
    spreadSize: {
      type: Number,
      default: 8
    },
    showMore: Boolean,
    head: {
      type: Array,
      default () {
        return []
      }
    },
    body: {
      type: Array,
      default () {
        return []
      }
    },
    headClass: String,
    headStyle: String,
    bodyClass: String,
    bodyStyle: String
  }
}
</script>

<style lang="less">
.ioc {
  &__table {
    // height: 100%;
    // padding-top: 45px;
    font-size: 12px;
    // color: #D3F3FF;
    &--rotate-more {
      transform: rotate(180deg);
    }
    &--icon {
      transition: transform .3s;
    }
  }
  &__head {
    padding: 10px 0;
    // height: 80px;
    // border-top: 1px rgba(#E2FFFD, 0.1) solid;
    // border-bottom: 1px rgba(#E2FFFD, 0.1) solid;
    /*background: red;*/
  }
  &__body {
    &-item {
      // height: 80px;
      // border-bottom: 1px rgba(#E2FFFD, 0.1) solid;
      &--border {
        border-bottom: 1px #EAECF0 solid;
      }
    }
  }
}
</style>
