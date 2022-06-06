<template>
  <div class="flex items-center overflow-hidden">
    <div class="logo flex-0 h-10 w-10 mr-4 rounded-full overflow-hidden">
      <A :href="`user/${data.user?.id}`">
        <img
          v-if="data?.user?.avatarUrl"
          :src="data?.user?.avatarUrl"
          alt=""
          class="h-full w-full"
        />
        <img v-else :src="BASE_HEAD_LOGO" alt="" class="h-full w-full" />
      </A>
    </div>

    <div class="content flex-1">
      <A :href="`/blog/${data.momentId}#comment`">
        <div class="content-text w-55 font-normal text-sm mb-2px">
          {{ data.content }}
        </div>
      </A>
      <div class="text-xs flex items-center">
        <span class="pr-2 font-bold">
          {{ data.user?.nickname || 'CTWOOD~' }}</span
        >
        {{ data?.createTime?.split('T')[0] || '' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BASE_HEAD_LOGO } from '~/api'
import type { ICommentType } from '~/api'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<ICommentType>,
      default: () => []
    }
  },
  setup() {
    return {
      BASE_HEAD_LOGO
    }
  }
})
</script>

<style lang="less" scoped>
.content-text {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
