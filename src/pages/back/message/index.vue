<template>
  <div>
    <a-table
      :pagination="{ total: total }"
      :columns="columns"
      :data-source="data"
      :rowKey="(data: any) => data.id || data.index"
      :rowClassName="(_:any, index:number) => (index % 2 === 1 ? 'table-striped' : null)"
      bordered
      @change="handleTableChange"
    >
      <template #action="{ record }">
        <a-button
          type="default"
          size="small"
          @click="handleEdit(record.id, record)"
        >
          编辑
        </a-button>

        <a-popconfirm
          title="确定删除这条数据吗？"
          ok-text="删除"
          cancel-text="取消"
          @confirm="handleDelete(record.id)"
        >
          <a-button type="default" size="small" class="ml-1"> 删除 </a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <a-button class="float-left mb-3" @click="handleAddUser" type="primary">
      添加记录
    </a-button>

    <a-modal
      v-model:visible="visibleEdit"
      title="修改用户信息"
      @ok="handleOkEdit"
    >
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="留言内容">
          <a-textarea v-model:value="formState.content" />
        </a-form-item>

        <a-form-item label="评分">
          <a-select v-model:value="formState.score" placeholder="修改评分">
            <a-select-option :value="1">1</a-select-option>
            <a-select-option :value="2">2</a-select-option>
            <a-select-option :value="3">3</a-select-option>
            <a-select-option :value="4">4</a-select-option>
            <a-select-option :value="5">5</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { requestMessageList, requestDelMesage, requestEditMessage } from '~/api'
import type { IMessageContent, IMessageList } from '~/api'
import { filterHtml } from '~/utils/filterHtml'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '留言者',
    dataIndex: 'user.nickname',
    key: 'nickname'
  },
  {
    title: '留言内容',
    dataIndex: 'content',
    key: 'content',
    width: '40%'
  },
  {
    title: ' 评分',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '留言时间',
    dataIndex: 'createTime',
    key: 'createTime'
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

const data = ref<IMessageList[]>([])

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined
  },
  setup() {
    const router = useRouter()

    const total = ref(0)

    const currentUser = ref(0)

    const currentPage = ref(1)

    const getData = async () => {
      const res = await requestMessageList(currentPage.value)

      // @ts-ignore
      data.value = res.data?.list.map((res) => ({
        ...res,
        content: filterHtml(res.content)
      }))
      total.value = res.data?.count!
    }

    const handleAddUser = () => {
      const routeUrl = router.resolve({
        path: '/message'
      })

      window.open(routeUrl.href, '_blank')
    }

    // 修改用户
    const visibleEdit = ref<boolean>(false)

    const formState = reactive<IMessageContent>({
      content: '',
      score: 1
    })

    const handleOkEdit = async () => {
      visibleEdit.value = false
      // @ts-ignore
      const res = await requestEditMessage(currentUser.value, formState)

      console.log(res)
      if (!res.flag) {
        message.error(res.msg, 3)
        return
      }

      message.success(res.msg, 3)

      getData()
    }

    const handleEdit = async (id: number, data: IMessageContent) => {
      visibleEdit.value = true

      currentUser.value = id

      formState.content = data.content
      formState.score = data.score
    }

    // 删除留言
    const handleDelete = async (id: number) => {
      const res = await requestDelMesage(id)

      if (!res.flag) {
        message.error(res.msg, 3)
        return
      }

      message.success(res.msg, 3)

      getData()
    }

    const handleTableChange = (page: any) => {
      currentPage.value = page.current

      getData()
    }

    onMounted(() => {
      getData()
    })

    return {
      data,
      total,
      columns,
      handleAddUser,
      formState,
      handleEdit,
      visibleEdit,
      handleOkEdit,
      handleDelete,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      handleTableChange
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
