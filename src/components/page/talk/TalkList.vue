<template>
  <div class="module-list grid grid-cols-4 gap-4 mt-6 enter-y">
    <div v-for="item in data" :key="item.momentId">
      <div class="wrap pb-4 bg-white rounded-md overflow-hidden">
        <A :href="`/blog/${item.momentId}`">
          <div class="img h-54"></div>
        </A>

        <div class="content px-4">
          <div class="content-time my-3 ml-3 pl-3">
            {{ item.createTime.split('T')[0] }}
          </div>
          <div class="content-desc h-50px">
            <A :href="`/blog/${item.momentId}`"> {{ item.title }} </A>
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
import { IMomentType } from '~/api'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IMomentType[]>,
      default: () => []
    }
  },
  setup(props) {
    console.log(props.data)
    return {}
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
  background: url('https://img0.baidu.com/it/u=854216396,1195659348&fm=253&fmt=auto&app=138&f=JPEG?w=1067&h=406');
  background-size: 100% 100%;
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
}

.item-tag {
  user-select: none;
}
</style>
