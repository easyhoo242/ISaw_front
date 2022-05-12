<template>
  <Module title="最新评论" corner class="pb-0">
    <div class="mt-3 pt-2 px-3">
      <a-timeline>
        <a-timeline-item color="green">
          <Message :data="list[0]" />
        </a-timeline-item>
        <a-timeline-item color="blue">
          <Message :data="list[1]" />
        </a-timeline-item>
        <a-timeline-item color="red">
          <Message :data="list[2]" />
        </a-timeline-item>
        <a-timeline-item>
          <Message :data="list[3]" />
        </a-timeline-item>
      </a-timeline>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestLatelyCommentList } from '~/api'
import type { ILatelyCommentType } from '~/api'

export default defineComponent({
  setup() {
    const list = ref<ILatelyCommentType[]>([])

    const getData = async () => {
      const res = await requestLatelyCommentList()

      list.value = res.data!
    }

    onMounted(() => {
      getData()
    })

    return {
      list
    }
  }
})
</script>

<style lang="less" scoped></style>
