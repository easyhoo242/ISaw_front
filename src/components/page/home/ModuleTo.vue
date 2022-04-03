<template>
  <div class="my-5 grid grid-cols-3 gap-3">
    <Module v-for="item in 3" :key="item" class="module-to-item">
      <div class="item-title pl-4 flex items-center justify-between pb-4">
        <div class="item-title-text text-base font-bold">教程笔记</div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Module from '~/components/global/module.vue'

export default defineComponent({
  setup() {
    return {
      list: [
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
    }
  },
  components: { Module }
})
</script>

<style lang="less" scoped>
.module-to-item {
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
