<template>
  <div class="item pb-4 bg-white rounded-md overflow-hidden">
    <a>
      <div class="item-img h-54"></div>
    </a>

    <div class="item-content px-4">
      <div class="item-content-time my-3 ml-3 pl-3">2021-12-21</div>
      <div class="item-content-desc h-50px">
        <a> 阿里旗下相互宝将于1月28日关停：今起用户不再参与分摊播 </a>
      </div>
      <div class="tag flex items-center justify-between mt-3 text-gray-400">
        <section>640 阅读</section>
        <section>640 评论</section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.item-img {
  background: url('https://www.talklee.com/zb_users/upload/2021/12/202112021638435849289398.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.item-content-time {
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
.item-content-desc {
  line-height: 1.6;
}

.tag {
  user-select: none;
}
</style>
