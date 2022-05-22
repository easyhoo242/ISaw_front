<template>
  <Module class="">
    <a-carousel autoplay :after-change="onChange">
      <div
        v-for="item in list"
        :key="item.id"
        class="img-box w-full h-116 overflow-hidden"
      >
        <img :src="item.url" alt="" class="w-full z-0" />
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

// const list = [
//   {
//     id: 1,
//     url: 'https://img0.baidu.com/it/u=1577615142,907299332&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
//   },
//   {
//     id: 2,
//     url: 'https://img0.baidu.com/it/u=1577615142,907299332&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
//   },
//   {
//     id: 3,
//     url: 'https://img0.baidu.com/it/u=1577615142,907299332&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
//   },
//   {
//     id: 5,
//     url: 'https://img0.baidu.com/it/u=1577615142,907299332&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
//   }
// ]
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
