<template>
  <BranchCrumb route="闲言碎语" />
  <Navigation :data="navigationList" />

  <TalkList :data="talkList" />

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

    const data = {
      time: '2021-12-21',
      title: '阿里旗下相互宝将于1月28日关停：今起用户不再参与分摊播',
      read: 640,
      discuss: 265,
      url: 'https://img0.baidu.com/it/u=854216396,1195659348&fm=253&fmt=auto&app=138&f=JPEG?w=1067&h=406'
    }

    const talkList = new Array(9)
      .fill(null)
      .map((res) => data)
      .map((item) => {
        let uid = 0
        return {
          id: ++uid,
          ...item
        }
      })

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
      ],
      talkList
    }
  }
})
</script>

<style lang="less" scoped></style>
