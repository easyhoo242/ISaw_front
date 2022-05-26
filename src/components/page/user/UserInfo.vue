<template>
  <div class="user-info h-90 w-full">
    <div class="mx-auto flex flex-col items-center">
      <div class="logo h-30 w-30 rounded-full overflow-hidden mt-5">
        <img
          :src="userInfo.avatar || BASE_HEAD_LOGO"
          :alt="userInfo.nickname"
          class="w-full h-full"
        />
      </div>

      <div class="slogan flex items-center justify-center mt-4 mb-3">
        <div class="slogan-title">
          {{ userInfo.nickname }}
        </div>
        <div v-if="userInfo.type >= 6" class="slogan-tag">V</div>
        <div v-if="userInfo.type === 9" class="slogan-tag">管理员</div>
      </div>

      <div class="desc flex items-center justify-center">
        <div>文章 {{ userInfo.moment_count }} 篇</div>
        <i class="mx-2"> | </i>
        <div>评论 {{ userInfo.comment_count }} 次</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getUserDetail, BASE_HEAD_LOGO } from '~/api'
import type { IUserInfoType } from '~/api'
import cache from '~/utils/cache'

export default defineComponent({
  setup() {
    //@ts-ignore
    const userInfo = ref<IUserInfoType>({})

    // 用户id
    const currentUser = cache.getCache('user')
    // 查看者id
    const userId = parseInt(window.location.pathname.split('/')[2])

    const getUserInfo = async () => {
      const res = await getUserDetail(userId || currentUser.id)
      userInfo.value = res.data as IUserInfoType
    }

    onMounted(() => {
      getUserInfo()
    })

    return {
      userInfo,
      BASE_HEAD_LOGO
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
