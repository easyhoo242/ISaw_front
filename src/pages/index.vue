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
          <HeadLogo :data="userInfo[0]" />
          <!-- 随便看看 -->
          <Casual />
          <!-- 热门文章 -->
          <HotSee />
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
import { defineComponent, ref } from 'vue'
import { getUserDetail, IUserInfoType } from '~/api'

export default defineComponent({
  name: '首页',
  setup() {
    const userInfo = ref<IUserInfoType[]>([])

    const getData = async () => {
      const res = await getUserDetail(23)

      userInfo.value[0] = res.data as IUserInfoType
    }

    getData()

    return {
      userInfo
    }
  }
})
</script>
