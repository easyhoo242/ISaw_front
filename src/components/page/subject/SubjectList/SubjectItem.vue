<template>
  <div class="active rounded-md bg-white overflow-hidden">
    <div
      class="header h-64 bg-gray-300 mb-4 bg-cover"
      :style="`background: url(${slogan.url})`"
    />
    <div class="body px-4 pt-4 pb-3">
      <div class="body-title mt-5px mb-10px text-xs text-gray-400">
        {{ slogan.title }}
        <span> · {{ slogan.count }} 篇文章</span>
      </div>

      <div class="body-content">
        <div
          v-for="listItem in list"
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
import { ISlogan, IList } from './index.vue'

export default defineComponent({
  props: {
    slogan: {
      type: Object as PropType<ISlogan>,
      default: () => ({})
    },
    list: {
      type: Array as PropType<IList[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
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

.active {
  transition: all 0.5s;

  &:hover {
    transform: translateY(-10px);
    transition: all 0.5s;
  }
}
</style>
