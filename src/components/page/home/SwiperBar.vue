<template>
  <Module class="">
    <a-carousel autoplay :after-change="onChange">
      <div v-for="item in list" :key="item.id" class="img-box w-full">
        <img :src="item.url" alt="" class="w-full" />
      </div>
    </a-carousel>
  </Module>
</template>

<script setup lang="ts">
const onChange = () => {}

const list = [
  {
    id: 1,
    url: 'https://www.talklee.com/zb_users/upload/2022/02/20220223160621164560358191210.jpg'
  },
  {
    id: 2,
    url: 'https://www.talklee.com/zb_users/upload/2020/12/20201228142020160913642049636.jpg'
  },
  {
    id: 3,
    url: 'https://www.talklee.com/zb_users/upload/2020/09/202009301601454770701462.jpg'
  },
  {
    id: 4,
    url: 'https://www.talklee.com/zb_users/upload/2020/09/202009301601456052683851.jpg'
  }
]
</script>

<style lang="less" scoped>
/deep/ .slick-dots {
  background-color: rgba(#ccc, 0.4, 0.4, 0.4);
  bottom: 6px !important;
  height: 20px !important;
  line-height: 20px !important;
  padding-top: 10px !important;
}
</style>
