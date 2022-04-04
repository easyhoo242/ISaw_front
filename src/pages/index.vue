<template>
  <div class="flex flex-col h-full">
    <!-- 欢迎横幅 -->
    <WelcomeBar />
    <div class="flex w-full">
      <div class="flex-1 w-1000px enter-x">
        <SwiperBar />
        <SelectedGuide />
        <HotList />
      </div>
      <div class="w-400px flex-0 pl-5 enter-y">
        <SliderBar />
      </div>
    </div>

    <!-- 模板展示 -->
    <ModuleShow class="enter-y" />
    <!-- 模块跳转 -->
    <ModuleTo class="enter-y" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '首页'
})
</script>
