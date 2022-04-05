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
          title: '分类',
          children: [
            {
              title: '互联网',
              url: ''
            },
            {
              title: '教程笔记',
              url: ''
            },
            {
              title: '闲言碎语',
              url: ''
            }
          ]
        },
        {
          title: '排序',
          children: [
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
