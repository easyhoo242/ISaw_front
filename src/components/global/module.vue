<template>
  <div
    class="module p-15px bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mt-3"
  >
    <span v-if="isShowCorner" class="module-span"></span>
    <div v-if="title" class="title text-lg mx-2.5 pb-2.5 font-bold border-b-1">
      {{ title }}
    </div>

    <div v-if="isShowLogo" class="logo"></div>
    <slot name="default" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    corner: Boolean,
    logo: Boolean
  },
  setup(props) {
    // 是否展示角标 类似elementUI
    const isShowCorner = !!props.corner
    const isShowLogo = !!props.logo

    return {
      isShowCorner,
      isShowLogo
    }
  }
})
</script>

<style lang="less" scoped>
.module {
  position: relative;

  .logo {
    z-index: 1;
    content: ' ';
    position: absolute;
    border-radius: 50%;
    background: #f92900 !important;
    width: 12px;
    height: 12px;
    box-shadow: 20px 0 #fbc606, 40px 0 #448ef6;
    right: 65px;
    top: 24px;
    border-color: transparent;
  }
}
.module-span {
  position: absolute;
  top: 0;
  left: 26px;
  height: 3px;
  width: 30px;
  background-color: #42a1ff;
}
</style>
