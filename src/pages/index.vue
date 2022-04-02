<template>
  <div class="flex flex-col h-full">
    <!-- 欢迎横幅 -->
    <WelcomeBar />
    <div class="flex w-full">
      <div class="flex w-1000px enter-x">
        <div class="flex flex-col w-full">
          <SwiperBar />
          <SelectedGuide />
        </div>
      </div>
      <div class="flex flex-col w-400px pl-5 enter-y">
        <BlockThree />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
