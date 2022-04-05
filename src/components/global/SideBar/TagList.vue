<template>
  <Module title="标签列表" corner>
    <div class="flex items-center flex-wrap">
      <section
        v-for="item in tags"
        :key="item.title"
        class="tag h-42px p-5px text-center"
      >
        <a class="py-6px px-15px rounded-md" :style="`color: ${item.color};`">
          {{ item.title }}
        </a>
      </section>
    </div>
  </Module>
</template>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const colors = [
      '#33B0CA',
      '#CC0000',
      '#428BCA',
      '#00336',
      '#B37333',
      '#99330',
      '#05792D',
      '#B37333'
    ]

    const tags = [
      '投稿',
      '网络杂谈',
      '分享',
      'SEO优化',
      '站长',
      '网站建设',
      '推广',
      '自媒体',
      '投稿',
      '网络杂谈',
      '分享',
      '投稿',
      '网络杂谈',
      '分享',
      'SEO优化',
      '站长',
      '网站建设',
      '推广',
      '自媒体'
    ].map((res) => ({
      title: res,
      color: colors[Math.floor(Math.random() * (colors.length - 1))]
    }))

    return {
      tags
    }
  }
})
</script>

<style lang="less" scoped>
.tag {
  line-height: 42px;

  a {
    background-color: #fafafa;
    transition: ease-in-out 0.3s;

    &:hover {
      background-color: #87ceeb99;
      color: white;
      transition: ease-in-out 0.3s;
    }
  }
}
</style>
