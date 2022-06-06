<template>
  <Module class="">
    <a-carousel autoplay :after-change="onChange">
      <div
        v-for="item in list"
        :key="item.id"
        class="img-box w-full h-116 overflow-hidden"
      >
        <img :src="item.url" alt="" class="w-full max-h-full z-0" />
      </div>
    </a-carousel>
  </Module>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { requestMomentDetail } from '~/api'
const onChange = () => {}

const list = ref<{ id?: number; url?: string }[]>([])

async function getData() {
  const res = await requestMomentDetail(99)

  list.value = res.images.map((item, index) => ({
    id: index,
    url: item
  }))
}

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
:deep(.slick-dots) {
  background-color: rgba(#ccc, 0.4, 0.4, 0.4);
  bottom: 6px !important;
  height: 20px !important;
  line-height: 20px !important;
  padding-top: 10px !important;
  z-index: 999 !important;
}
</style>
