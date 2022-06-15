<template>
  <div class="flex flex-col h-full">
    <!-- 欢迎横幅 -->
    <WelcomeBar />

    <AnnoVue v-if="!isLogin" class="-enter-y"/>

    <!-- 主体 -->
    <FlexCol>
      <template #body>
        <SwiperBar />

        <SelectedGuide />

        <HotList />
      </template>

      <template #side>
        <SideBar>
          <HeadLogo v-if="isLogin" />

          <AboutISaw />

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

<script setup lang="ts">
import { ref } from 'vue'
import localcache from '~/utils/cache'
import AnnoVue from '~/components/page/home/Anno.vue';

const userInfo = localcache.getCache('user')

const isLogin = ref(false)

isLogin.value = userInfo.token === 'unLogin' ? false : true
</script>
