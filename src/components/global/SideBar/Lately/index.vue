<template>
  <Module title="最近发表" corner logo>
    <div class="mt-4 px-3 pr-5">
      <LatelyItem v-for="item in list" :key="item.id" :data="item" />
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { requestLatelyMomentList } from '~/api'
import type { ILatelyMomentType } from '~/api'

export default defineComponent({
  setup() {
    const list = ref<ILatelyMomentType[]>([])

    const getData = async () => {
      const res = await requestLatelyMomentList()

      list.value = res.data as ILatelyMomentType[]
    }
    getData()

    return {
      list
    }
  }
})
</script>
