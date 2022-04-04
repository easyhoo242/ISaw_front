<template>
  <BranchCrumb route="闲言碎语" />
  <Navigation :data="navigationList" />
  <div class="module-list grid grid-cols-4 gap-4 enter-x">
    <TalkItem v-for="item in 11" :key="item" class="enter-y" />
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
      onChange() {},
      navigationList: [
        {
          title: '分类',
          children: [
            {
              title: '教程笔记',
              url: ''
            },
            {
              title: '闲言碎语',
              url: ''
            },
            {
              title: '互联网',
              url: ''
            }
          ]
        },
        {
          title: '子类',
          children: [
            {
              title: '爱摄影',
              url: ''
            }
          ]
        },
        {
          title: '排序',
          children: [
            {
              title: '最新',
              url: ''
            },
            {
              title: '浏览',
              url: ''
            },
            {
              title: '评论',
              url: ''
            }
          ]
        }
      ]
    }
  }
})
</script>

<style lang="less" scoped></style>
