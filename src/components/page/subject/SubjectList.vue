<template>
  <div
    v-for="item in data"
    :key="item.slogan.id"
    class="rounded-md bg-white overflow-hidden"
  >
    <div
      class="header h-64 bg-gray-300 mb-4 bg-cover"
      :style="`background: url(${item.slogan.url})`"
    />
    <div class="body px-4 pt-4 pb-3">
      <div class="body-title mt-5px mb-10px text-xs text-gray-400">
        {{ item.slogan.title }}
        <span> · {{ item.slogan.count }} 篇文章</span>
      </div>

      <div class="body-content">
        <div
          v-for="listItem in item.list"
          :key="listItem.id"
          class="content-item flex justify-between items-center"
        >
          <A>
            <div class="content-item-title py-5px">{{ listItem.title }}</div>
          </A>
          <div
            class="content-item-type text-xs px-2 bg-gray-100 flex items-center justify-center rounded-sm"
          >
            {{ listItem.type }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface IDataList {
  slogan: {
    id: string
    title: string
    count: string
    url: string
  }
  list: {
    id: number
    title: string
    type: string
  }[]
}
;[]

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IDataList[]>,
      default: () => []
    }
  },
  setup() {}
})
</script>
<style lang="less" scoped>
.content-item {
  .content-item-title {
    &:before {
      content: '';
      width: 10px;
      height: 10px;
      border: 2px solid #448ef6;
      border-radius: 8px;
      margin: 0 10px 0 0;
      vertical-align: 0.1em;
      display: inline-block;
    }
  }

  .content-item-type {
    height: 24px;
    cursor: pointer;
  }
}
</style>
