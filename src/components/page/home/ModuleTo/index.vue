<template>
  <div class="my-5 grid grid-cols-3 gap-3">
    <List
      v-for="item in data"
      :key="item.id"
      :title="item.title"
      :list="item.list"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Module from '~/components/global/module.vue'

export default defineComponent({
  setup() {
    const list = [
      {
        id: 1,
        title:
          '网站预加载 JS 脚本 instant.page 的使用方法" zbp支付宝即时到帐插件显示',
        time: '3.25'
      },
      {
        id: 2,
        title: 'must be an array or an object 错误的解决办法',
        time: '2.23'
      },
      {
        id: 1,
        title: 'Windows下安装和部署SVN服务器且同步到Web站点的图文教程',
        time: '3.31'
      },
      {
        id: 1,
        title: 'linux服务器设置svn开机自动启动的图文教程',
        time: '3.15'
      },
      {
        id: 1,
        title:
          'zblog怎么搭建专题页？如何实现调用多个tag及tag所属文章的图文教程',
        time: '6.21'
      },
      {
        id: 1,
        title: '微信小程序调用相机或者图库实现扫描二维码或者条码的文档教程',
        time: '7.15'
      }
    ]

    const data = [
      {
        id: 1,
        title: '教程笔记',
        list
      },
      {
        id: 2,

        title: '闲言碎语',
        list
      },
      {
        id: 3,
        title: '互联网',
        list
      }
    ]

    return { data }
  },
  components: { Module }
})
</script>

<style lang="less" scoped></style>
