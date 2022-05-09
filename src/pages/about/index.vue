<template>
  <div>
    <BranchCrumb route="互联网" />
    <Navigation :data="navigationList" />

    <FlexCol>
      <template #body>
        <Overlay class="mb-0" />
        <HotList />
      </template>
      <template #side>
        <SideBar>
          <Lately />
          <!-- 随便看看 -->
          <Casual />
          <!-- 热门文章 -->
          <HotSee />
        </SideBar>
      </template>
    </FlexCol>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '关于',
  setup() {
    return {
      navigationList: [
        {
          label: '分类',
          value: 'type',
          children: [
            {
              label: '互联网',
              value: 'net',
              type: 2,
              url: ''
            },
            {
              label: '教程笔记',
              value: 'subject',
              type: 3,
              url: ''
            },
            {
              label: '闲言碎语',
              value: 'talk',
              type: 4,
              url: ''
            }
          ]
        },
        {
          label: '排序',
          value: 'sort',
          children: [
            {
              label: '浏览',
              value: 'look',
              url: ''
            },
            {
              label: '评论',
              value: 'comment',
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
