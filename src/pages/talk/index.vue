<template>
  <BranchCrumb route="闲言碎语" />
  <div class="module-list grid grid-cols-4 gap-3">
    <TalkItem v-for="item in 12" :key="item" />
  </div>

  <a-pagination
    v-model="currentPage"
    :default-current="2"
    :total="200"
    show-quick-jumper
    class="mt-4"
    @change="onChange"
  ></a-pagination>
</template>

<route lang="yaml">
meta:
  layout: fullpage
</route>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '闲言碎语',
  setup() {
    const currentPage = ref(1)

    return {
      currentPage,
      onChange() {}
    }
  }
})
</script>

<style lang="less" scoped></style>
