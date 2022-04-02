<template>
  <Module class="h-500px">
    <!-- <swiper
      :slides-per-view="3"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      ...
    </swiper> -->
    <a-carousel :after-change="onChange">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>
  </Module>
</template>

<script setup lang="ts">
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

// import { Swiper, SwiperSlide } from 'swiper/vue'
import Module from '~/components/global/module.vue'

// const onSwiper = (swiper: any) => {
//   console.log(swiper)
// }
// const onSlideChange = () => {
//   console.log('slide change')
// }
const onChange = () => {}
</script>

<style lang="less" scoped></style>
