<template>
  <Module title="随便看看" corner logo>
    <div class="content mt-4 grid grid-cols-2 gap-3 px-2">
      <div
        v-for="item in list"
        :key="item.momentId"
        class="content-item flex-0 overflow-hidden border-b-1px"
      >
        <A :href="`/blog/${item.momentId}`">
          <div class="logo w-full h-27 rounded-xl overflow-hidden">
            <img
              v-if="item.images"
              :src="item.images[0]"
              alt=""
              class="w-full h-full max-h-full"
            />

            <img
              v-else
              :src="BASE_LOGO"
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
import { defineComponent, ref, onMounted } from 'vue'
import { requestCauseList } from '~/api'
import type { IMomentType } from '~/api'
import { BASE_LOGO } from '~/api'

export default defineComponent({
  setup() {
    const list = ref<IMomentType[]>([])

    const getData = async () => {
      try {
        const res = await requestCauseList()

        list.value = res.data as IMomentType[]
      } catch (error) {}
    }

    onMounted(() => {
      getData()
    })

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
