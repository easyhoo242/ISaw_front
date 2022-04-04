<template>
  <div class="module-list grid grid-cols-4 gap-4 enter-y">
    <TalkItem v-for="item in data" :key="item.id" :data="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface IDataType {
  id: number
  time: string
  title: string
  read: number
  discuss: number
  url: string
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IDataType[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>
