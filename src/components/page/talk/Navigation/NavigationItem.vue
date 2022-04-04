<template>
  <div class="navigation-item pt-10px pb-15px flex items-center">
    <div class="item-title">{{ title }}</div>
    <div
      v-for="item in children"
      :key="item.title"
      class="item-children flex items-center"
    >
      <A :href="item.url">
        <div class="item-child">{{ item.title }}</div>
      </A>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    children: {
      type: Array as PropType<
        {
          title: string
          url: string
        }[]
      >,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.navigation-item {
  font-size: 15px;
  .item-title {
    cursor: pointer;
    padding: 3px 10px;
    background-color: #f6f6f6;
    color: #333;
    border-radius: 3px;
    margin-right: 10px;
  }

  .item-children {
    .item-child {
      cursor: pointer;
      padding: 3px 10px;
      color: #333;
      border-radius: 3px;
      margin-right: 10px;

      &:hover {
        background-color: #42a1ff;
        color: #fff;
      }
    }
  }
}
</style>
