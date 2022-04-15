<template>
  <div class="flex items-center overflow-hidden">
    <div class="logo flex-0 h-10 w-10 mr-4 rounded-full overflow-hidden">
      <A :href="`user/${data.user?.id}`">
        <img
          :src="data.user?.logo || BASE_LOGO"
          :alt="data.user?.name"
          class="h-full w-full"
        />
      </A>
    </div>

    <div class="content flex-1">
      <A :href="`/blog/${data?.moment_id}`">
        <div class="content-text w-55 text-sm font-bold mb-2px">
          {{ data.content }}
        </div>
      </A>
      <div class="text-xs flex items-center">
        <span class="pr-2 font-bold"> {{ data.user?.name || 'CTWOOD~' }}</span>
        {{ data?.updateAt?.split('T')[0] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ILatelyCommentType, BASE_LOGO } from '~/api'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<ILatelyCommentType>,
      default: () => []
    }
  },
  setup() {
    return {
      BASE_LOGO
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
