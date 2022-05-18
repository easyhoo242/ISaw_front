<template>
  <Module title="正文" class="relative">
    <div
      class="absolute right-7 top-5 content-type text-xs px-2 bg-gray-100 flex items-center rounded-sm"
      @click="handleJump"
    >
      {{ labelInfo.name }}
    </div>

    <div class="mt-5 px-5">
      <a-typography v-html="data"> </a-typography>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useRouter } from 'vue-router'
import type { Typography } from 'ant-design-vue'

export default defineComponent({
  props: {
    data: {
      type: String,
      default: ''
    },
    labelInfo: {
      type: Object as PropType<{
        id: number
        name: string
      }>,
      default: () => ({})
    }
  },
  setup(props) {
    const router = useRouter()
    const contentRef = ref<InstanceType<typeof Typography>>()

    return {
      contentRef,
      handleJump() {
        props.labelInfo.id === 3
          ? router.push('/talk')
          : props.labelInfo.id === 2
          ? router.push({
              path: '/note',
              query: {
                id: 2
              }
            })
          : router.push({
              path: '/note',
              query: {
                id: 1
              }
            })
      }
    }
  }
})
</script>

<style scoped lang="less">
.content-type {
  height: 24px;
  cursor: pointer;
}
</style>
