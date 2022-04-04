<template>
  <main
    class="main w-full min-h-full flex flex-col items-center dark:bg-black text-gray-700 dark:text-gray-200 overflow-none"
  >
    <Header class="w-full fixed top-0 z-50" />

    <div class="flex-1 w-full min-h-0 mt-14">
      <ActiveTop />

      <article class="w-full py-5 dark:bg-gray-800">
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
            <div class="w-1402px mx-auto">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </article>
    </div>
    <Footer class="w-full z-50" />
  </main>
</template>
