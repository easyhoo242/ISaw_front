<template>
  <div>
    <a-table
      :pagination="{ total: total }"
      :columns="columns"
      :data-source="data"
      :rowKey="(data: any) => data.id || data.index"
      :rowClassName="(_:any, index:number) => (index % 2 === 1 ? 'table-striped' : null)"
      bordered
    >
      <template #type="{ text: type }">
        <span>
          <a-tag
            :color="type === 9 ? 'volcano' : type == 6 ? 'geekblue' : 'green'"
          >
            {{ type === 3 ? '普通用户' : type === 6 ? '会员' : '管理员' }}
          </a-tag>
        </span>
      </template>

      <template #action="{ record }">
        <a-button type="default" size="small" @click="handleEdit(record)">
          编辑
        </a-button>

        <a-popconfirm
          title="确定删除这条数据吗？"
          ok-text="删除"
          cancel-text="取消"
          @confirm="handleDelete(record)"
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
        <a-form-item label="昵称">
          <a-input v-model:value="formState.nickname" />
        </a-form-item>
        <a-form-item label="手机号码">
          <a-input v-model:value="formState.telPhone" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item label="年龄">
          <a-input type="number" v-model:value="formState.age" />
        </a-form-item>

        <a-form-item label="性别">
          <a-select v-model:value="formState.sex" placeholder="选择性别">
            <a-select-option :value="'男'">男</a-select-option>
            <a-select-option :value="'女'">女</a-select-option>
            <a-select-option :value="'保密'">保密</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="权限级别">
          <a-select v-model:value="formState.type" placeholder="用户权限级别">
            <a-select-option :value="3">普通用户</a-select-option>
            <a-select-option :value="6">会员</a-select-option>
            <a-select-option :value="9">管理员</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="签名">
          <a-textarea v-model:value="formState.desc"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { requestUserList, changeUserInfo, requestdeleteUser } from '~/api'
import type { IUserInfoType, IUser } from '~/api'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '手机号码',
    dataIndex: 'telPhone',
    key: 'telPhone'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '权限',
    dataIndex: 'type',
    key: 'type',
    slots: { customRender: 'type' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
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
    const router = useRouter()

    const total = ref(0)

    const currentUser = ref(0)

    const getData = async () => {
      const res = await requestUserList()

      // @ts-ignore
      data.value = res.userList.map((res) => ({
        ...res
      }))
      total.value = res.count!
    }

    const handleAddUser = () => {
      const routeUrl = router.resolve({
        path: '/register'
      })

      window.open(routeUrl.href, '_blank')
    }

    // 修改用户
    const visibleEdit = ref<boolean>(false)

    const formState = reactive<IUser>({
      nickname: '',
      telPhone: '',
      email: '',
      sex: '',
      type: 3,
      desc: '',
      age: 18
    })

    const handleOkEdit = async () => {
      visibleEdit.value = false
      // @ts-ignore
      const res = await changeUserInfo(currentUser.value, formState)

      if (!res.flag) {
        message.error(res.msg, 3)
        return
      }

      message.success(res.msg, 3)

      getData()
    }

    const handleEdit = async (data: IUserInfoType) => {
      visibleEdit.value = true

      currentUser.value = data.id

      formState.nickname = data.nickname
      formState.telPhone = data.telPhone
      formState.email = data.email
      formState.sex = data.sex
      formState.age = data.age
      formState.type = data.type
      formState.desc = data.desc
    }

    // 删除用户
    const handleDelete = async (user: IUserInfoType) => {
      console.log(user)
      const res = await requestdeleteUser(user.id)

      if (!res.flag) {
        message.error(res.msg, 3)
        return
      }

      message.success(res.msg, 3)

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
      wrapperCol: { span: 14 }
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
