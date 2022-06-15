<template>
  <Module title="最近发表" corner logo>
    <div class="mt-4 px-3 pr-5">
      <a-timeline-item v-for="item in latelyList" :key="item.momentId" color="blue" class="pb-1">
        <div class="item ml-2 pt-1">
          <div class="item-title">
            <A :href="`${baseLatelyUrl}/blog/${item.momentId}`">
              {{ item.title || item.content }}
            </A>
          </div>
          <div class="item-desc mt-1 flex items-center">
            {{ item.author.nickname || 'ISawer~' }} <i class="mx-2"></i>
            {{ item.createTime.split('T')[0] }}
          </div>
        </div>
      </a-timeline-item>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestLatelyMomentList } from '~/api'
import type { IMomentType } from '~/api'

export default defineComponent({
  setup() {
    const latelyList = ref<IMomentType[]>([])

    const getData = async () => {
      const res = await requestLatelyMomentList()

      latelyList.value = res.data!
    }

    let baseLatelyUrl = ''


    if (process.env.NODE_ENV === 'development') {
      baseLatelyUrl = ''
    } else if (process.env.NODE_ENV === 'production') {
      baseLatelyUrl = 'http://120.48.82.2:2426'
    } else {
      baseLatelyUrl = 'http://120.48.82.2:2426'
    }

    onMounted(() => {
      getData()
    })

    return {
      latelyList,
      baseLatelyUrl
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
