<template>
  <div>
    <BranchCrumb route="专题目录" />

    <div class="grid grid-cols-2 gap-4">
      <SubjectList :data="dataList" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: fullpage
</route>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const data = {
      slogan: {
        id: '1',
        title: '这是关于百度 文章的专题栏目，更多更详细的内容请点击查看详情',
        count: '98',
        url: 'https://www.talklee.com/zb_users/upload/special/1.jpg'
      },
      list: [
        {
          id: 1,
          title:
            '教程笔记戴尔笔记本电脑插上耳机没有声音，但外放正常耳机好使，怎么回事？',
          type: '互联网'
        },
        {
          id: 2,
          title: '互联网聊聊百度智能小程序关联H5站点及小程序改名的心酸历程',
          type: '互联网'
        },
        {
          id: 3,
          title: '教程笔记银河麒麟linux系统服务器忘记root密码重置的图文教程',
          type: '教程笔记'
        },
        {
          id: 4,
          title: '互联网nofollow标签的作用和使用方法有了重大变化',
          type: '互联网'
        },
        {
          id: 5,
          title:
            '互联网为促进资源下载站点的良性发展，百度搜索资源平台即将上线清风4',
          type: '闲言碎语'
        },
        {
          id: 6,
          title:
            '互联网国企不得续签第三方云平台，多地布局“国资云”，云储存市场大变局',
          type: '博客模板'
        }
      ]
    }

    const dataList = new Array(7).fill(null).map((res) => data)

    return {
      dataList
    }
  }
})
</script>
