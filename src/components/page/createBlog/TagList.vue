<template>
  <Module title="选择文章类型" corner logo>
    <div class="pt-4 pb-1 pl-3">
      您当前选择的类型为：
      <span>{{ data ? tags[data - 1].title : '默认类型' }}</span>
    </div>

    <div class="flex items-center flex-wrap">
      <section
        v-for="item in tags"
        :key="item.id"
        class="tag h-42px p-5px text-center"
      >
        <a
          class="py-6px px-15px rounded-md"
          :class="{ active: item.id === data }"
          @click="handleClick(item.id, item.title)"
        >
          {{ item.title }}
        </a>
      </section>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Number,
      default: 0
    }
  },
  emits: ['emitData'],
  setup(_, { emit }) {
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

    const tags = ['随便看看', '互联网', '教程笔记', '闲言碎语'].map(
      (res, index) => ({
        id: index + 1,
        title: res,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      })
    )

    return {
      tags,
      handleClick(id: number, name: string) {
        emit('emitData', id, name)
      }
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

    &.active {
      background-color: #2193f699;
      color: white;
    }
  }
}
</style>
