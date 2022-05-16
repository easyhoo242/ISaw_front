<template>
  <Module class="moment flex">
    <div class="logo flex-0 w-210px h-158px rounded-md overflow-hidden mr-5">
      <!-- <A :href="`/blog/${item.id}`"> <img :src="item.img" alt="" /></A> -->
      <A :href="`/blog/${data.momentId}`">
        <!-- <img v-if="data.images" :src="data.images[0]" alt="" /> -->
        <img :src="BASE_LOGO" alt="" />
      </A>
    </div>

    <div class="hotlist-content flex-1 pr-3">
      <div class="title flex items-center text-gray-700 overflow-hidden">
        <div v-if="data.agree > 100" class="hot-tag mr-2">热文</div>

        <A :href="`/blog/${data.momentId}`">
          <div class="content-title overflow-hidden">
            {{ data.title || '这个人也太懒了吧 居然忘了取标题' }}
          </div>
        </A>
      </div>

      <div class="content text-sm my-3 text-gray-500 min-h-77px">
        {{ filterHtml(data.content) || '这是内容' }}
      </div>

      <div class="footer pt-2 flex items-center justify-between text-gray-400">
        <div class="tag flex-1 flex items-center">
          <div>🕒 {{ data.createTime.split('T')[0] }}</div>
          <div>{{ data.agree || 0 }} 点赞</div>
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
  </Module>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import type { IMomentType } from '~/api'
import { BASE_LOGO } from '~/api'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<IMomentType>,
      default: () => {}
    }
  },
  setup() {
    // var reg =  /<[^>]+>/gi;  //过滤全部的html标签
    var reg = new RegExp('<[^>]+>', 'gi') //过滤全部的html标签，不包括内容

    // var reg2 = /<(img|br|hr|input)[^>]*>/gi;  //只匹配img、br、hr、input标签
    // var reg2 = new RegExp('<(img|br|hr|input)[^>]*>', 'gi') //只匹配img、br、hr、input标签

    // var reg3 = /<(\S*)[^>]*>[^<]*<\/(\1)>/gi;        //分组匹配，过滤全部的html标签，包括内容
    // var reg3 = new RegExp('<(\\S*)[^>]*>[^<]*<\\/(\\1)>', 'gi') //分组匹配，过滤全部的html标签，包括内容

    /*
     * 将全部的标签过滤，不过滤标签内内容
     * */
    function filterHtml(str: string) {
      if (typeof str != 'string') {
        return str
      }

      return str.replace(reg, '').replace(/&nbsp;/gi, '')
    }

    return {
      BASE_LOGO,
      filterHtml
    }
  }
})
</script>

<style lang="less" scoped>
.moment {
  .logo {
    img {
      max-width: 100%;
      height: 100%;
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
