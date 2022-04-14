<template>
  <div class="my-5 grid grid-cols-3 gap-3">
    <List
      v-for="item in list"
      :key="item.list"
      :title="item.name"
      :list="item.list"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { requestModuleTo } from '~/api'
import type { IModuleTo, IModuleToList } from '~/api'

export default defineComponent({
  setup() {
    const list = ref<IModuleTo<IModuleToList[]>[]>([])
    const getData = async () => {
      const res = await requestModuleTo()

      list.value = res.data as any
    }

    getData()

    return { list }
  }
})
</script>

<style lang="less" scoped></style>
