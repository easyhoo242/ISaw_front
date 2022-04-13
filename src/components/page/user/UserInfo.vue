<template>
  <div class="user-info h-90 w-full">
    <div class="mx-auto flex flex-col items-center">
      <div class="logo h-30 w-30 rounded-full overflow-hidden mt-5">
        <img :src="userInfo.logo" :alt="userInfo.name" class="w-full h-full" />
      </div>

      <div class="slogan flex items-center justify-center mt-4 mb-3">
        <div class="slogan-title">
          {{ userInfo.name }}
        </div>
        <div v-if="userInfo.vip" class="slogan-tag">V</div>
        <div v-if="userInfo.type === 4" class="slogan-tag">管理员</div>
      </div>

      <div class="desc flex items-center justify-center">
        <div>文章 {{ userInfo.momentCount }} 篇</div>
        <i class="mx-2"> | </i>
        <div>评论 {{ userInfo.commentCount }} 次</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)

    return {
      userInfo
    }
  }
})
</script>

<style lang="less" scoped>
.user-info {
  color: white;
  padding: 50px 0 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: -webkit-linear-gradient(
    0deg,
    rgb(41, 125, 118) 0%,
    #54b5db 100%
  );

  .logo {
    border: 6px solid #f3f5f6;
  }

  .slogan {
    &-title {
      font-weight: 600;
      font-size: 20px;
    }

    &-tag {
      background-image: -webkit-linear-gradient(
        0deg,
        rgba(253, 165, 34, 0.9294117647058824) 0%,
        #fd4c4c 100%
      );
      line-height: 1.4;
      text-align: center;
      padding: 2px 4px;
      margin: auto 5px;
      border-radius: 2px;
      font-size: 12px;
    }
  }
}
</style>
