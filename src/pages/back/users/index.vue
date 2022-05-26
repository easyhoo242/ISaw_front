<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :rowKey="(data: any) => data.id || data.index"
    :rowClassName="(_:any, index:number) => (index % 2 === 1 ? 'table-striped' : null)"
    bordered
  >
    <template #action>
      <a-button type="default" size="small">编辑</a-button>
      <a-button type="default" size="small" class="ml-1">删除</a-button>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestUserList } from '~/api'
import type { IUserInfoType } from '~/api'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: '1'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: '2'
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: '3'
  },
  {
    title: '手机号码',
    dataIndex: 'telPhone',
    key: '4'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: '5'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: '6'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: '7'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: '8'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'action' }
  }
].map((res) => ({
  ...res,
  align: 'center'
}))

const data = ref<IUserInfoType[]>([])

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined
  },
  setup() {
    const getData = async () => {
      const res: IUserInfoType[] = await requestUserList()

      data.value = res.map((res) => ({
        ...res
      }))
    }

    onMounted(() => {
      getData()
    })

    return {
      data,
      columns
    }
  }
})
</script>

<style lang="less" scoped>
:deep(.table-striped) td {
  background-color: #fafafa;
}
</style>

<route lang="yaml">
meta:
  layout: back
</route>
