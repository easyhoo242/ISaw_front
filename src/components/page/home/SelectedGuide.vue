<template>
  <Module title="精选导读" corner class="module">
    <div class="content mt-3 items-center grid grid-cols-3 grid-rows-2">
      <div
        v-for="item in list"
        :key="item.momentId"
        class="item border-b-1 border-r-1 p-15px text-center dark:border-gray-300"
      >
        <div
          class="item-title flex items-center justify-between pb-2 dark:color"
        >
          <div class="title-tag">{{ item.label.name }}</div>
          <div class="title-time">
            {{ `🕞 ${item.createTime.split('T')[0]}` }}
          </div>
        </div>

        <div class="item-content text-left">
          <div class="content-desc">
            <a :href="`/blog/${item.momentId}`">{{ item.title }}</a>
          </div>

          <div class="content-text mt-1.5 min-h-45px text-left">
            {{ filterHtml(item.content) }}
          </div>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestHotseeList, BASE_LOGO } from '~/api'
import type { IMomentType } from '~/api'
import { filterHtml } from '~/utils/filterHtml'

export default defineComponent({
  setup() {
    const list = ref<IMomentType[]>([])
    const getData = async () => {
      const res = await requestHotseeList()

      list.value = res.data!
    }

    onMounted(() => {
      getData()
    })

    return {
      list,
      BASE_LOGO,
      filterHtml
    }
  }
})
</script>

<style lang="less" scoped>
.module {
  position: relative;

  .item {
    &:nth-child(-n + 3) {
      padding-top: 12px !important;
      margin-top: 0 !important;
    }

    &:nth-child(3n) {
      border-right: none;
    }

    &:nth-child(n + 4) {
      border-bottom: none;
    }

    // type的背景颜色
    &:nth-child(2) {
      .item-title .title-tag {
        background-color: #ffaf1e;
      }
    }
    &:nth-child(3) {
      .item-title .title-tag {
        background-color: #c177ef;
      }
    }
    &:nth-child(4) {
      .item-title .title-tag {
        background-color: #f7699e;
      }
    }
    &:nth-child(5) {
      .item-title .title-tag {
        background-color: #19b6bd;
      }
    }
    &:nth-child(6) {
      .item-title .title-tag {
        background-color: #02803a;
      }
    }

    .item-title {
      font-size: 12px;

      .title-tag {
        height: 22px;
        width: 70px;
        line-height: 22px;
        background-color: #0089ff;
        border-radius: 20px;
        color: #fff;
      }
    }

    .item-content {
      .content-desc {
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
      }

      .content-text {
        color: #777;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
