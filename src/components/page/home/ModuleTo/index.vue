<template>
  <div class="my-5 grid grid-cols-3 gap-3">
    <Module v-for="item in list" :key="item.labelInfo.id" class="list-item">
      <div class="item-title pl-4 flex items-center justify-between pb-4">
        <div class="item-title-text text-base font-bold">
          {{ item.labelInfo.name }}

          <sup class="px-2 font-thin text-gray-300">
            收录 {{ item.momentCount }} 篇文章
          </sup>
        </div>
        <div class="item-title-more text-xs">
          <a href="/about">更多 <span>➕</span></a>
        </div>
      </div>
      <List :list="item.list.slice(0, 5)" />
    </Module>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestModuleTo } from '~/api'
import type { IMomentListByLabelType } from '~/api'
import List from './List.vue'

export default defineComponent({
  components: {
    List
  },
  setup() {
    const list = ref<IMomentListByLabelType[]>([])

    const getData = () => {
      Promise.all([
        requestModuleTo(1, 1),
        requestModuleTo(2, 1),
        requestModuleTo(3, 1)
      ]).then((res) => {
        list.value = res
      })
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

<style lang="less" scoped>
.item-title {
  position: relative;
  border-bottom: 1px solid #ddd;

  &::before {
    content: ' ';
    position: absolute;
    width: 3px;
    height: 20px;
    background-color: #42a1ff;
    left: 0;
  }
}
</style>
