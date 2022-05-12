<template>
  <div class="flex flex-col h-full">
    <!-- 欢迎横幅 -->
    <WelcomeBar />

    <!-- 主体 -->
    <FlexCol>
      <template #body>
        <SwiperBar />
        <SelectedGuide />
        <HotList />
      </template>

      <template #side>
        <SideBar>
          <HeadLogo />
          <!-- 热门文章 -->
          <HotSee />
          <!-- 随便看看 -->
          <Casual />
          <!-- 时间线热门评论 -->
          <TimeLine />
        </SideBar>
      </template>
    </FlexCol>

    <!-- 模板展示 -->
    <ModuleShow class="enter-y" />
    <!-- 模块跳转 -->
    <ModuleTo class="enter-y" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { requestMomentAll } from '~/api'
import HotList from '~/components/page/home/HotList/index.vue'

export default defineComponent({
  name: '首页',
  setup() {
    const getData = async () => {
      const res = await requestMomentAll(1, 10)

      console.log(res)
    }

    getData()

    return {}
  },
  components: { HotList }
})
</script>
