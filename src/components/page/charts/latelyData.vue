<template>
  <Module class="h-50">
    <div class="grid grid-cols-2 gap-6">
      <div class="pl-5">
        <h5 class="mt-2 mb-5">今日{{ title }}：</h5>
        <div class="mt-10 ml-3">
          <span class="text-blue-400 text-[3.23rem] pr-2">
            {{ data.today }}
          </span>
          <slot name="left" />
        </div>
      </div>

      <div>
        <div class="data-item">
          昨日{{ title }}数 <span> {{ data.yesterday }} </span>
        </div>
        <div class="data-item">
          过去7天{{ title }}数 <span> {{ data.week }} </span>
        </div>
        <div class="data-item">
          过去30天{{ title }}数 <span> {{ data.month }} </span>
        </div>
        <div class="data-item">
          总计发表{{ title }}数 <span> {{ data.all }} </span>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { ILatelyDataType } from '~/api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '文章'
    },
    content: {
      type: String,
      default: '文章'
    },
    data: {
      type: Object as PropType<ILatelyDataType>,
      default: () => ({})
    }
  }
})
</script>

<style lang="less" scoped>
.data-item {
  padding-top: 20px;

  &:first-child {
    padding-top: 15px;
  }

  span {
    font-size: 15px;
    color: rgb(96, 165, 250);
  }
}
</style>
