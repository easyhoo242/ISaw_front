<template>
  <div class="w-full rounded-lg shadow-md z-10 overflow-hidden mt-3">
    <div class="header pt-12.5">
      <div
        class="mx-auto w-23 h-23 overflow-hidden rounded-full border-white border-5 z-30 mb-3"
      >
        <img
          :src="data.avatar || BASE_HEAD_LOGO"
          alt=""
          class="w-auto h-auto max-w-full max-h-full"
        />
      </div>

      <div class="slogan bg-white pb-2.5 px-5 text-center pt-2">
        <div
          class="title text-gray-700 font-bold flex items-center justify-center"
        >
          <div class="flex items-center">
            <a :href="`/user/${data.id}`" style="min-height: 22px">
              {{ data.nickname }}
            </a>
          </div>
          <div v-if="data.type === 6" class="v px-1 ml-2">v</div>
        </div>
        <div class="desc mt-5px text-gray-500 min-h-42px">
          <a-popover trigger="hover" placement="bottom">
            <template #content>
              {{ data.desc || '快来编写你的自我介绍吧~' }}
            </template>
            <div>
              {{ data.desc || '快来编写你的自我介绍吧~' }}
            </div>
          </a-popover>
        </div>
      </div>
    </div>

    <div class="tag bg-white flex items-center pb-5">
      <div class="tag-item">
        <div class="tag-item__count mb-3 text-gray-700">
          {{ data.moment_count }}
        </div>
        <div class="tag-item__title text-gray-500">文章数</div>
      </div>
      <div class="tag-item">
        <div class="tag-item__count mb-3 text-gray-700">
          {{ data.comment_count }}
        </div>
        <div class="tag-item__title text-gray-500">评论数</div>
      </div>
      <div class="tag-item">
        <div class="tag-item__count mb-3 text-gray-700">
          {{ data.agree_count }}
        </div>
        <div class="tag-item__title text-gray-500">获赞数</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getUserDetail, BASE_HEAD_LOGO } from '~/api'
import type { IUserInfoType } from '~/api'
import localcache from '~/utils/cache'

export default defineComponent({
  setup(_) {
    const currentUser = localcache.getCache('user')

    //@ts-ignore
    const data = ref<IUserInfoType>({})

    const getUserInfo = async () => {
      const res = await getUserDetail(currentUser.id)

      data.value = res.data!
    }

    onMounted(() => {
      getUserInfo()
    })

    return {
      data,
      BASE_HEAD_LOGO
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  background: url(http://img.t.sinajs.cn/t5/skin/public/profile_cover/015.jpg?version=51d3ce829429dfsdfksef1feed06201411051715?/zb_users/theme/cardslee/style/images/aside-author-bg.jpg)
    no-repeat center center;
  border-radius: 0.5rem 0.5rem 0 0;
  position: relative;

  &::before {
    content: ' ';
    position: absolute;
    top: 10px;
    width: 100%;
    height: 60%;
    background: linear-gradient(to bottom, transparent, transparent, #fff);
    z-index: 10;
  }
}

.slogan {
  .title {
    .v {
      background-image: -webkit-linear-gradient(
        0deg,
        rgba(253, 165, 34, 0.9294117647058824) 0%,
        #fd4c4c 100%
      );
      font-size: 10px;
      color: #fff;
      display: inline-block;
      vertical-align: text-top;
      border-radius: 2px;
      line-height: 1.4;
      letter-spacing: 0px;
      margin-top: 1px;
    }
  }
  .desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.tag {
  .tag-item {
    flex: 1;
    text-align: center;
    border-right: 1px solid #666;

    &:last-child {
      border: none;
    }
  }
}
</style>
