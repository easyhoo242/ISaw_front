<template>
  <a-timeline-item color="blue" class="pb-1">
    <div class="item ml-2 pt-1">
      <div class="item-title">
        <A :href="`about/${data.id}`"> {{ data.title || data.content }} </A>
      </div>
      <div class="item-desc mt-1 flex items-center">
        {{ data?.user.name }} <i class="mx-2"></i>
        {{ data?.updateAt?.split('T')[0] }}
      </div>
    </div>
  </a-timeline-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { ILatelyMomentType } from '~/api'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<ILatelyMomentType>,
      default: () => []
    }
  }
})
</script>

<style lang="less" scoped>
.item {
  .item-title {
    font-size: 13px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .item-desc {
    font-size: 12px;
    color: #aaacb6;

    i {
      display: inline-block;
      height: 3px;
      width: 3px;
      border-radius: 50%;
      background-color: #42a1ff;
    }
  }
}
</style>
