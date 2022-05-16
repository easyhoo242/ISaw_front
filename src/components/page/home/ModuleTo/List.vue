<template>
  <div class="item-content mt-2">
    <div
      v-for="item in list"
      :key="item.momentId"
      class="content-item-wrap flex justify-between items-center px-2"
    >
      <div class="content-item-text w-4/5">
        <A :href="`/blog/${item.momentId}`">
          <span>📌</span>
          {{ item.title }}
        </A>
      </div>
      <div class="content-item-time text-gray-500">
        {{ item.updateTime.split('T')[0].substring(5) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IMomentType } from '~/api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array as PropType<IMomentType[]>,
      default: () => []
    }
  }
})
</script>

<style lang="less" scoped>
.list-item {
  .item-content {
    .content-item-wrap {
      line-height: 35px;

      .content-item-text {
        cursor: pointer;
        transition: all 0.5s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          transform: translateX(20px);
          transition: all 0.5s;
        }
      }
    }
  }
}
</style>
