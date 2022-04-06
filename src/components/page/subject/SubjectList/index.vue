<template>
  <div class="grid grid-cols-2 gap-4 mt-6 enter-y">
    <SubjectItem
      v-for="item in data"
      :key="item.slogan.id"
      :slogan="item.slogan"
      :list="item.list"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface ISlogan {
  id: string
  title: string
  count: string
  url: string
}

export interface IList {
  id: number
  title: string
  type: string
}

interface IDataList {
  slogan: ISlogan
  list: IList[]
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IDataList[]>,
      default: () => []
    }
  }
})
</script>
