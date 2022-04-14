<template>
  <Module title="热门文章" corner logo class="pb-1">
    <div class="hot mt-3 px-1">
      <div
        v-for="item in list"
        :key="item.id"
        class="hot-item mb-2.5 h-162px rounded-xl bg-cover"
        :style="`background: url(${item.logo || BASE_LOGO});`"
      >
        <A :href="`/blog/${item.id}`" class="item-bg__wrap rounded-xl">
          <span></span
        ></A>
        <div class="item-content text-white w-full p-2">
          <div class="item-content__desc pt-2">
            {{ item.title || item.content }}
          </div>
          <div class="item-content__tag text-xs mt-1">
            {{ item.get_like }} 点赞 ， {{ item?.createAt.split('T')[0] }}
          </div>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { requestHotseeList, IListType, BASE_LOGO } from '~/api'

export default defineComponent({
  setup() {
    const list = ref<IListType[]>([])
    const getData = async () => {
      const res = await requestHotseeList()

      list.value = res.data as IListType[]
    }

    getData()
    return {
      list,
      BASE_LOGO
    }
  }
})
</script>

<style lang="less" scoped>
.hot-item {
  position: relative;

  .item-bg__wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    opacity: 0.2;
  }
  .item-content {
    position: absolute;
    bottom: 0;
  }
}
</style>
