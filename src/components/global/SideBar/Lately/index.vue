<template>
  <Module title="最近发表" corner>
    <div class="mt-4 px-3 pr-5">
      <LatelyItem v-for="item in data" :key="item.id" :data="item" />
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getLatelyData } from '~/api'
import type { ILatelyType } from '~/api'

export default defineComponent({
  setup() {
    const data = ref<ILatelyType[]>([])

    const getData = async () => {
      const res = (await getLatelyData()) as ILatelyType[]
      data.value = res
    }
    getData()
    return {
      data
    }
  }
})
</script>
