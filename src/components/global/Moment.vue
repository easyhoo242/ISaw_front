<template>
  <Module class="moment flex relative">
    <div class="logo flex-0 w-210px h-158px rounded-md overflow-hidden mr-5 relative">
      <span class="logo-label absolute flex items-center justify-center px-3 py-1 rounded-full text-gray-50">
        {{ data.label.name }}
      </span>
      <!-- <A :href="`/blog/${item.id}`"> <img :src="item.img" alt="" /></A> -->
      <A :href="`/blog/${data.momentId}`">
        <!-- <img v-if="data.images" :src="data.images[0]" alt="" /> -->
        <img v-if="data.images" :src="data.images[data.images.length - 1]" alt="" class="w-full h-full max-h-full" />

        <img v-else :src="BASE_LOGO" alt="" class="w-full h-full max-h-full" />
      </A>
    </div>

    <div class="hotlist-content flex-1 pr-3">
      <div class="title flex items-center text-gray-700 overflow-hidden">
        <div v-if="data.look > 50" class="hot-tag mr-2">热文</div>

        <A :href="`/blog/${data.momentId}`">
          <div class="content-title overflow-hidden w-670px">
            {{ data.title || '这个人也太懒了吧 居然忘了取标题' }}
          </div>
        </A>
      </div>

      <div class="content text-sm my-3 text-gray-500 min-h-77px w-727px">
        {{ filterHtml(data.content) || '这是内容' }}
      </div>

      <div class="footer pt-2 flex items-center justify-between text-gray-400">
        <div class="tag flex-1 flex items-center">
          <div>🕒 {{ data.createTime.split('T')[0] }}</div>
          <div>👁‍🗨 {{ data.look || 0 }} 浏览</div>
          <div>🤞 {{ data.agree || 0 }} 点赞</div>
          <div>💬 {{ data.commentCount || 0 }} 评论</div>
        </div>
        <div class="who flex-0">
          <!-- <a-icon></a-icon> -->
          <A :href="`/user/${data.author?.id}`">
            🏆 {{ data.author?.nickname }}
          </A>
        </div>
      </div>
    </div>

    <div v-if="isShowMomentState" class="absolute right-5">
      <a-tag :color="data.audit === 1 ? 'volcano' : 'green'">
        {{ data.audit === 1 ? '审核中' : '已过审' }}
      </a-tag>
    </div>


  </Module>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { IMomentType } from '~/api'
import { BASE_LOGO } from '~/api'
import { filterHtml } from '~/utils/filterHtml'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<IMomentType>,
      default: () => { }
    }
  },
  setup() {
    const route = useRoute()

    const isShowMomentState = ref(false)

    if (
      route.path.search(/user/) !== -1
    ) {
      isShowMomentState.value = true
    }

    return {
      BASE_LOGO,
      filterHtml,
      isShowMomentState
    }
  }
})
</script>

<style lang="less" scoped>
.moment {
  position: relative;

  &::after {
    position: absolute;
    content: ' ';
    width: 3px;
    // height: 28px;
    height: 0px;
    background-color: #448ef6;
    left: 0px;
    top: 17px;
    transition: 0.5s all;
  }

  &:hover::after {
    height: 28px;
    transition: 0.5s all;
  }

  &:hover .logo .logo-label {
    right: 0px;
    transition: 0.5s all;
  }

  &:hover .logo img {
    transform: rotate(20deg) scale(1.5);
    transition: 2s all;
  }

  .logo {
    .logo-label {
      height: 28px;
      background-color: #448ef6;
      right: -80px;
      top: 2px;
      transition: 0.5s all;
      z-index: 2;
    }

    img {
      max-width: 100%;
      height: 100%;
      z-index: 1;
      transition: 2s all;
    }
  }

  .hotlist-content {
    .content {
      line-height: 1.8 !important;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .footer {
      .tag {
        div {
          margin-right: 16px;
        }
      }
    }
  }
}

.hot-tag {
  background-color: #ff9627;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
}

.content-title {
  font-size: 1.125rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
