<template>
  <div class="wrap pb-4 bg-white rounded-md overflow-hidden">
    <a>
      <div class="img h-54"></div>
    </a>

    <div class="content px-4">
      <div class="content-time my-3 ml-3 pl-3">{{ data.time }}</div>
      <div class="content-desc h-50px">
        <a> {{ data.title }} </a>
      </div>
      <div
        class="content-tag flex items-center justify-between mt-3 text-gray-400"
      >
        <section>{{ data.read }} 阅读</section>
        <section>{{ data.discuss }} 评论</section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IDataType } from './index.vue'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<IDataType>,
      default: () => []
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
  background: url('https://www.talklee.com/zb_users/upload/2021/12/202112021638435849289398.jpg');
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
