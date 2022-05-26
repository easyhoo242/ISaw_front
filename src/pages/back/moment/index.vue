<template>
  <div>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="搜索">
        <a-input
          v-model:value="currentKeyword"
          placeholder="输入内容按回车键搜索"
          @keyup.enter.native="handleKeyWordSearch"
          style="width: 300px"
        />
      </a-form-item>

      <a-form-item label="排序">
        <a-radio-group v-model:value="formState.sort">
          <a-radio-button
            v-for="item in radioList"
            :value="item.value"
            @click.prevent="handleOrderChange(item.value)"
          >
            {{ item.label }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <a-tabs v-model:activeKey="currentTab" @change="handleTabChange">
      <a-tab-pane key="done" tab="已完成">
        <BackTable
          :total="total"
          :data="data"
          :col="columns"
          :current="formState.offset"
          @audit="handleAudit"
          @delete="handleDelete"
          @page="handlePageChange"
        >
          <template #action>
            <span>驳回文章</span>
          </template>
        </BackTable>
      </a-tab-pane>

      <a-tab-pane key="audit" tab="审核中">
        <BackTable
          :total="total"
          :data="data"
          :col="columns"
          :current="formState.offset"
          @audit="handleAudit"
          @delete="handleDelete"
          @page="handlePageChange"
        >
          <template #action>
            <span>审核文章</span>
          </template>
        </BackTable>

        <a-button
          class="float-left mb-3"
          type="primary"
          @click="handlecreateMoment"
        >
          添加记录
        </a-button>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  requestBackMomentListAll,
  requestBackAudit,
  requestBackMomentDelete,
  BASE_LOGO
} from '~/api'
import type { IMomentType, IBackSearch } from '~/api'
import { filterHtml } from '~/utils/filterHtml'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import BackTable from '~/components/page/back/BackTable.vue'

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
    BackTable
  },
  setup() {
    const router = useRouter()

    const total = ref(0)

    const columns = [
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
        width: '600px'
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
        slots: { customRender: 'action' }
      }
    ].map((res) => ({
      ...res,
      align: 'center'
    }))

    const data = ref<IMomentType[]>([])

    const currentKeyword = ref('')
    let keyWord = currentKeyword.value

    const formState = reactive<IBackSearch>({
      keyBoard: '',
      sort: 1,
      limit: 10,
      offset: 0,
      audit: 0
    })

    const getData = async () => {
      const momentListRes = await requestBackMomentListAll({
        ...formState,
        keyBoard: keyWord
      })

      data.value = momentListRes.data?.list.map((res) => ({
        ...res,
        content: filterHtml(res.content).substring(0, 50) + '......',
        title: res.title.substring(0, 20)
      }))!

      total.value = momentListRes.data?.momentCount!
    }

    // 新建文章
    const handlecreateMoment = () => {
      const routeUrl = router.resolve({
        path: '/createBlog'
      })

      window.open(routeUrl.href, '_blank')
    }

    // 审核文章
    const handleAudit = async (id: number) => {
      const res = await requestBackAudit(
        id,
        currentTab.value === 'done' ? 1 : 0
      )

      const tipMsg = currentTab.value === 'done' ? '驳回' : '审核'
      if (!res.flag) {
        message.error(tipMsg + '文章失败', 3)
        return
      }

      message.success(tipMsg + '文章成功', 3)

      getData()
    }

    // 删除文章
    const handleDelete = async (moment: IMomentType) => {
      const res = await requestBackMomentDelete(moment.momentId)

      if (!res.flag) {
        message.error(res.msg, 3)
        return
      }

      message.success(res.msg, 3)

      getData()
    }

    // 页码变化
    const handlePageChange = (page: number) => {
      formState.offset = page
      getData()
    }

    const handleKeyWordSearch = () => {
      keyWord = currentKeyword.value
      getData()
    }

    const handleOrderChange = (sort: number) => {
      console.log(formState)
      formState.sort = sort

      getData()
    }

    // tab切换
    const currentTab = ref('done')

    const handleTabChange = (currentTab: string) => {
      if (currentTab === 'done') {
        formState.audit = 0
      } else {
        // 初始化搜索
        formState.audit = 1
      }

      currentKeyword.value = ''

      formState.keyBoard = ''
      formState.sort = 1
      formState.limit = 10
      formState.offset = 1

      getData()
    }

    onMounted(() => {
      getData()
    })

    return {
      BASE_LOGO,
      radioList: [
        {
          label: '点赞',
          value: 1
        },
        {
          label: '评论数',
          value: 2
        },
        {
          label: '浏览量',
          value: 3
        },
        {
          label: '发表时间',
          value: 4
        },
        {
          label: '修改时间',
          value: 0
        }
      ],

      data,
      total,
      columns,
      handlecreateMoment,
      handleAudit,
      handleDelete,
      handlePageChange,
      labelCol: { span: 1 },
      wrapperCol: { span: 14 },
      currentTab,
      handleTabChange,
      formState,
      currentKeyword,
      handleKeyWordSearch,
      handleOrderChange
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
