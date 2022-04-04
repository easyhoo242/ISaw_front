<template>
  <Module class="navigation mt-4 mb-7 bg-gray-400 enter-y pl-10">
    <NavigationItem
      v-for="item in data"
      :key="item.title"
      :title="item.title"
      :children="item.children"
    />
  </Module>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface IDataType {
  title: string
  children: {
    title: string
    url: string
  }[]
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IDataType[]>,
      default: () => []
    }
  },
  setup(_) {
    return {}
  }
})
</script>

<style lang="less" scoped></style>
