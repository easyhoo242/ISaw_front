<template>
  <div class="module-list grid grid-cols-4 gap-4 mt-6 enter-y">
    <div v-for="item in data" :key="item.momentId" class="shadow-md rounded-lg">
      <div class="wrap bg-white rounded-md overflow-hidden">
        <A :href="`/blog/${item.momentId}`">
          <div
            class="img h-54"
            :style="`background: url(${
              item.images ? item.images[0] : BASE_LOGO
            });`"
          ></div>
        </A>

        <div class="content px-4 bg-gray-50 pb-4 pt-1">
          <div class="content-time my-3 ml-3 pl-3">
            {{ item.createTime.split('T')[0] }} · {{ item.look }} 浏览
          </div>
          <div class="content-desc h-50px">
            <A :href="`/blog/${item.momentId}`" class="content-desc__title">
              {{ item.title }}
            </A>
          </div>
          <div
            class="content-tag flex items-center justify-between mt-3 text-gray-400"
          >
            <section>{{ item.agree }} 点赞</section>
            <section>{{ item.commentCount }} 评论</section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BASE_LOGO } from '~/api'
import type { IMomentType } from '~/api'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IMomentType[]>,
      default: () => []
    }
  },
  setup() {
    return {
      BASE_LOGO
    }
  }
})
</script>

<style lang="less" scoped>
.wrap {
  transition: all 0.5s;

  &:hover {
    transform: translateY(-10px);
    transition: all 0.5s;
  }
}
.img {
  background-size: 220px 220px;
  background-repeat: no-repeat;
  background-position: center center;
}
.content-time {
  position: relative;

  &:before {
    content: ' ';
    position: absolute;
    top: 5px;
    left: -11px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #42a1ff;
  }
}
.content-desc {
  line-height: 1.6;

  .content-desc__title {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.item-tag {
  user-select: none;
}
</style>
