<template>
  <Module class="navigation mt-4 bg-white enter-y pl-10">
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

export interface IChildType {
  title: string
  url: string
}

interface IDataType {
  title: string
  children: IChildType[]
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
