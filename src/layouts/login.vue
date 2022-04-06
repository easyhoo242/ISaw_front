<template>
  <main
    class="w-full min-h-full flex flex-col items-center dark:bg-black text-gray-700 dark:text-gray-200 overflow-none"
  >
    <div class="flex-1 w-full min-h-0">
      <article class="w-full h-full dark:bg-gray-800">
        <router-view v-slot="{ Component }">
          <transition
            name="fade"
            enter-active-class="transition easing-entrance duration-250"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition easing-exit duration-150"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </article>
    </div>
  </main>
</template>

<style scoped>
main {
  background: url(~/assets/img/login-bg.jpeg);
  background-position: 50% 50%;
  animation: bgsize linear 20s infinite;
}

@keyframes bgsize {
  0% {
    background-size: 100% 100%;
  }
  50% {
    background-size: 110% 110%;
  }
  100% {
    background-size: 100% 100%;
  }
}
</style>
