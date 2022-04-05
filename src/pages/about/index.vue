<template>
  <div>
    <BranchCrumb route="互联网" />
    <Navigation :data="navigationList" />

    <FlexCol>
      <template #body>
        <Overlay />
        <HotList />
      </template>
      <template #side>
        <SideBar>
          <!-- 随便看看 -->
          <Casual />
          <!-- 热门文章 -->
          <HotSee />
          <!-- 时间线热门评论 -->
          <TimeLine />
        </SideBar>
      </template>
    </FlexCol>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from '~/components/global/Navigation/index.vue'
import BranchCrumb from '~/components/global/BranchCrumb.vue'
import FlexCol from '~/components/global/Layout/FlexCol.vue'
import Overlay from '~/components/global/Overlay.vue'
import HotList from '~/components/page/HotList.vue'
import SliderBar from '~/components/global/sliderBar/index.vue'

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
  },
  components: { Navigation, BranchCrumb, FlexCol, Overlay, HotList, SliderBar }
})
</script>

<style lang="less" scoped></style>
