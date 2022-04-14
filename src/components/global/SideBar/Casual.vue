<template>
  <Module title="随便看看" corner logo>
    <div class="content mt-4 grid grid-cols-2 gap-3 px-2">
      <div
        v-for="item in list"
        :key="item.id"
        class="content-item flex-0 overflow-hidden border-b-1px"
      >
        <A :href="`/blog/${item.id}`">
          <div class="logo w-full h-27 rounded-xl overflow-hidden">
            <img
              :src="item.logo || BASE_LOGO"
              alt=""
              class="w-full h-full max-h-full"
            />
          </div>
          <div class="desc py-6px">{{ item.title || item.content }}</div>
        </A>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { requestCauseList, ICauseListType } from '~/api'
import { BASE_LOGO } from '~/api'

export default defineComponent({
  setup() {
    const list = ref<ICauseListType[]>([])

    const getData = async () => {
      const res = await requestCauseList(3)

      list.value = res.data as ICauseListType[]
    }

    getData()
    return {
      list,
      BASE_LOGO: BASE_LOGO
    }
  }
})
</script>

<style lang="less" scoped>
.logo {
  img {
    &:hover {
      height: 200%;
      height: 200%;
    }
  }
}

.content-item {
  &:nth-child(n + 5) {
    margin-bottom: 0 !important;
    border: none;
  }

  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
