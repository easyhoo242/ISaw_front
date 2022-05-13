<template>
  <Module :title="`作者发布的文章 | 共 ${total}篇`" class="user-center">
    <FlexCol>
      <template #body>
        <div class="hotlist flex flex-col">
          <div v-if="list?.length">
            <Module
              v-for="item in list"
              :key="item.momentId"
              class="module flex"
            >
              <div
                class="logo flex-0 w-210px h-158px rounded-md overflow-hidden mr-5"
              >
                <A :href="`/blog/${item.momentId}`">
                  <!-- <img :src="item.images ? item.images[0] : BASE_LOGO" alt="" /> -->
                  <img :src="BASE_LOGO" alt="" />
                </A>
              </div>

              <div class="hotlist-content flex-1 pr-3">
                <div class="title flex items-center text-gray-700">
                  <div v-if="item.agree > 20" class="hot-tag mr-2">热文</div>
                  <A :href="`/blog/${item.momentId}`">
                    <div class="text-lg">
                      {{ item.title || '这个人也太懒了吧 居然忘了取标题' }}
                    </div>
                  </A>
                </div>

                <div class="content text-sm my-3 text-gray-500 min-h-77px">
                  {{ item.content || '这是内容' }}
                </div>

                <div
                  class="footer pt-2 flex items-center justify-between text-gray-400"
                >
                  <div class="tag flex-1 flex items-center">
                    <div>🕒 {{ item?.createTime?.split('T')[0] }}</div>
                    <div>{{ item.agree }} 点赞</div>
                    <div>💬 {{ item.commentCount }} 评论</div>
                  </div>
                  <div class="who flex-0">
                    <!-- <a-icon></a-icon> -->
                    <A :href="`/user/${item?.author?.id}`">
                      🏆 {{ item?.author?.nickname }}
                    </A>
                  </div>
                </div>
              </div>
            </Module>
          </div>
          <Module v-else>
            <a-empty :image="simpleImage" />
          </Module>

          <a-pagination
            v-if="list?.length"
            :current="currentPage"
            v-model:pageSize="pageSize"
            :total="total"
            show-quick-jumper
            class="my-3"
            @change="onChange"
          />
        </div>
      </template>

      <template #side>
        <SideBar>
          <Casual />

          <ChangeInfo v-if="isShowChangeInfo" />
        </SideBar>
      </template>
    </FlexCol>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import cache from '~/utils/cache'
import { requestMomentById, BASE_LOGO } from '~/api'
import type { IMomentType } from '~/api'

import { Empty } from 'ant-design-vue'
import Module from '~/components/global/Module.vue'
import ChangeInfo from '~/components/page/user/ChangeInfo.vue'

export default defineComponent({
  setup() {
    const user = cache.getCache('user')

    const currentPage = ref(1)
    const total = ref(1)
    const pageSize = ref(7)
    const list = ref<IMomentType[]>()

    const userId = parseInt(window.location.pathname.split('/')[2])

    const isShowChangeInfo = user.id === userId

    const getData = async () => {
      const res = await requestMomentById(
        currentPage.value,
        pageSize.value,
        userId
      )

      list.value = res.list!
      total.value = res.momentCount!
    }

    const onChange = (page: number) => {
      currentPage.value = page
      getData()
      window.scrollTo({
        top: 400,
        behavior: 'smooth'
      })
    }

    getData()

    return {
      BASE_LOGO,
      isShowChangeInfo,
      list,
      currentPage,
      total,
      pageSize,
      onChange,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
    }
  },
  components: { Module, ChangeInfo }
})
</script>

<style lang="less" scoped>
.user-center {
  background: transparent !important;
  box-shadow: none !important;
}

.module {
  .logo {
    img {
      max-width: 100%;
      height: 100%;
    }
  }

  .hotlist-content {
    .content {
      line-height: 1.8 !important;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .footer {
      .tag {
        div {
          margin-right: 16px;
        }
      }
    }
  }
}

.hot-tag {
  background-color: #ff9627;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
}
</style>
