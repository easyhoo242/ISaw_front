<template>
  <a-table
    :pagination="{ total: total }"
    :columns="col"
    :data-source="data"
    :rowKey="(data: any) => data.id || data.index"
    :rowClassName="(_:any, index:number) => (index % 2 === 1 ? 'table-striped' : null)"
    @change="handleTableChange"
    bordered
  >
    <template #audit="{ text: audit }">
      <span>
        <a-tag :color="audit === 1 ? 'volcano' : 'green'">
          {{ audit === 1 ? '审核中' : '审核通过' }}
        </a-tag>
      </span>
    </template>

    <template #img="{ text: img }">
      <span>
        <img v-if="img" :src="img" alt="" />

        <img
          v-else
          :src="BASE_LOGO"
          alt=""
          style="width: 200px; height: 70px"
        />
      </span>
    </template>

    <template #action="{ record }">
      <a-button
        type="default"
        size="small"
        :href="`/blog/${record.momentId}`"
        target="_blank"
      >
        查看
      </a-button>

      <a-button
        type="default"
        size="small"
        class="mx-2"
        @click="handleAudit(record.momentId)"
      >
        <slot name="action"> </slot>
      </a-button>

      <a-popconfirm
        title="确定删除这条数据吗？"
        ok-text="删除"
        cancel-text="取消"
        @confirm="handleDelete(record)"
      >
        <a-button type="default" size="small"> 删除 </a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BASE_LOGO } from '~/api'
import type { IMomentType } from '~/api'

export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 0
    },
    col: {
      type: Array as PropType<
        | {
            align: string
            title: string
            dataIndex: string
            key: string
            width: string
            slots?: undefined
          }
        | {
            align: string
            title: string
            dataIndex: string
            key: string
            width: string
            slots: {
              customRender: string
            }
          }[]
      >,
      default: () => []
    },
    data: {
      type: Array as PropType<IMomentType[]>,
      default: () => []
    },
    current: {
      type: Number,
      default: 1
    }
  },
  emits: ['audit', 'delete', 'page'],
  setup(_, { emit }) {
    const handleAudit = (id: number) => {
      emit('audit', id)
    }

    const handleDelete = (id: number) => {
      emit('delete', id)
    }

    // @ts-ignore
    const handleTableChange = ({ current }) => {
      const page = current === 1 ? 0 : (current - 1) * 10
      emit('page', page)
    }

    return {
      BASE_LOGO,
      handleAudit,
      handleDelete,
      handleTableChange
    }
  }
})
</script>

<style scoped></style>
