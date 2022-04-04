<template>
  <div class="flex flex-col h-full">
    <!-- 欢迎横幅 -->
    <WelcomeBar />
    <div class="flex w-full">
      <div class="flex w-1000px enter-x">
        <div class="flex flex-col w-full">
          <SwiperBar />
          <SelectedGuide title="精选导读" corner />
          <HotList />
        </div>
      </div>
      <div class="flex flex-col w-400px pl-5 enter-y">
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
