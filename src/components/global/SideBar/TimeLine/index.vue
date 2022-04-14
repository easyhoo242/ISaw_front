<template>
  <Module title="时间轴" corner class="pb-0">
    <div class="mt-3 pt-2 px-3">
      <a-timeline>
        <a-timeline-item color="green">
          <Message :data="list[0]" />
        </a-timeline-item>
        <a-timeline-item color="green">
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
import { defineComponent, ref } from 'vue'
import { requestLatelyCommentList, ILatelyType } from '~/api'

export default defineComponent({
  setup() {
    const list = ref<ILatelyType[]>([])

    const getData = async () => {
      const res = await requestLatelyCommentList()

      list.value = res.data as ILatelyType[]
    }

    getData()
    return {
      list
    }
  }
})
</script>

<style lang="less" scoped></style>
