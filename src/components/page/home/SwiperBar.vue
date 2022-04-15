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
const onChange = () => {}

const list = [
  {
    id: 1,
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fnote%2Fl%2Fpublic%2Fp82460877.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652653184&t=a59635edb652c7ee143bb09a52221652'
  },
  {
    id: 2,
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-12-26%2F5c23275600250.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652653451&t=e6fcc82226e805c667bd9defc17a2b91'
  },
  {
    id: 3,
    url: 'https://img1.baidu.com/it/u=4097408996,1673831050&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
  },
  {
    id: 5,
    url: 'https://img0.baidu.com/it/u=1577615142,907299332&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
  }
]
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
