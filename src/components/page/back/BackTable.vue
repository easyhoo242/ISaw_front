<template>
  <a-table :pagination="{ total: total }" :columns="columns" :data-source="data"
    :rowKey="(data: any) => data.momentId || data.index"
    :rowClassName="(_: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)" @change="handleTableChange"
    bordered>
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

        <img v-else :src="BASE_LOGO" alt="" style="width: 200px; height: 70px" />
      </span>
    </template>

    <template #action="{ record }">
      <a-button type="default" size="small" :href="`/blog/${record.momentId}`" target="_blank">
        查看
      </a-button>

      <a-button type="default" size="small" class="mx-2" @click="handleAudit(record.momentId)">
        <slot name="action"> </slot>
      </a-button>

      <a-popconfirm title="确定删除这条数据吗？" ok-text="删除" cancel-text="取消" @confirm="handleDelete(record)">
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
      handleTableChange,
      columns: [
        {
          title: '序号',
          dataIndex: 'momentId',
          key: 'momentId',
          width: '150px'
        },
        {
          title: '发布者',
          dataIndex: 'author.nickname',
          key: 'userId',
          width: '150px'
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          width: '200px'
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          width: '400px'
        },
        {
          title: '封面',
          dataIndex: 'images',
          key: 'images',
          width: '200px',
          slots: { customRender: 'img' }
        },
        {
          title: '审核结果',
          dataIndex: 'audit',
          key: 'audit',
          slots: { customRender: 'audit' },
          width: '200px'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: '250px'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
          width: '260px'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          slots: { customRender: 'action' },
          width: '300px'
        }
      ].map((res) => ({
        ...res,
        align: 'center'
      }))
    }
  }
})
</script>
