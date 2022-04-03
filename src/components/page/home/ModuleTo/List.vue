<template>
  <Module class="list-item">
    <div class="item-title pl-4 flex items-center justify-between pb-4">
      <div v-if="title" class="item-title-text text-base font-bold">
        {{ title }}
      </div>
      <div class="item-title-more text-xs">
        <a>更多 <span>➕</span></a>
      </div>
    </div>

    <div class="item-content mt-2">
      <div
        v-for="item in list"
        :key="item.id"
        class="content-item-wrap flex justify-between items-center px-2"
      >
        <div class="content-item-text w-4/5">
          <a>
            <span>📌</span>
            {{ item.title }}
          </a>
        </div>
        <div class="content-item-time text-gray-500">{{ item.time }}</div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array as PropType<
        {
          id: number
          title: string
          time: string
        }[]
      >,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.list-item {
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

  .item-content {
    .content-item-wrap {
      line-height: 35px;

      .content-item-text {
        cursor: pointer;
        transition: all 0.5s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          transform: translateX(20px);
          transition: all 0.5s;
        }
      }
    }
  }
}
</style>
