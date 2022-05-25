<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column }">
      <div v-if="column.dataIndex === 'operation'">
        <span>
          <!-- <a>Invite 一 {{ record.name }}</a> -->
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </div>
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
    dataIndex: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'name'
  },
  {
    title: '手机号码',
    dataIndex: 'telPhone'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '性别',
    dataIndex: 'sex'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation'
  }
]

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
        ...res,
        key: 'action'
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

<route lang="yaml">
meta:
  layout: back
</route>
