<template>
  <Module class="pb-0">
    <a-comment class="py-0 pb-0">
      <template #avatar>
        <a-avatar :src="user.logo" alt="用户头像" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="currntComment" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button
            html-type="submit"
            :loading="submitting"
            type="primary"
            @click="handleSubmit"
          >
            提交
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
  </Module>

  <Module v-if="data.father.length">
    <a-list
      :data-source="data.father"
      :header="`${total} 条评论`"
      item-layout="horizontal"
      class="px-6"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
            :author="item.user.nickname"
            :content="item.content"
            :datetime="item?.createTIme?.split('T')[0]"
          >
            <template #avatar>
              <a-avatar
                :src="item?.user?.avatarUrl || BASE_HEAD_LOGO"
                alt=" "
              />
            </template>

            <template #actions>
              <span key="comment-nested-reply-to" @click="showModal(item.id)">
                回 复
              </span>
            </template>

            <a-modal v-model:visible="visible" title="回复消息" @ok="handleOk">
              <a-input v-model:value="currentReply" />
            </a-modal>

            <div v-for="child in data.son">
              <a-comment
                v-if="child.commentId === item.id"
                :author="child.user.nickname"
                :content="child.content"
                :datetime="child?.createTime?.split('T')[0]"
              >
                <template #avatar>
                  <a-avatar
                    :src="child?.user?.avatarUrl || BASE_HEAD_LOGO"
                    alt=" "
                  />
                </template>
              </a-comment>
            </div>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>
  </Module>

  <Module v-else title="评论列表" class="pb-0">
    <a-empty :description="null" class="py-1" />
  </Module>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import type { ICommentType } from '~/api'
import { BASE_HEAD_LOGO } from '~/api'
import Module from '~/components/global/Module.vue'

import usecache from '~/utils/cache'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<{
        father: ICommentType[]
        son: ICommentType[]
      }>,
      default: () => []
    },
    total: {
      type: Number,
      default: 23
    }
  },
  emits: ['submit', 'reply'],
  setup(props, { emit }) {
    const comments = ref<Comment[]>([])
    const submitting = ref<boolean>(false)
    const currntComment = ref<string>('')

    const user = usecache.getCache('user')

    const visible = ref<boolean>(false)
    const handleSubmit = () => {
      emit('submit', currntComment.value)
    }

    const currentComment = ref(0)
    const currentReply = ref('')
    const showModal = (id: number) => {
      currentComment.value = id
      visible.value = true
    }

    const handleOk = () => {
      visible.value = false
      emit('reply', currentComment.value, currentReply.value)
    }

    console.log('DATA', props.data)

    return {
      user,
      BASE_HEAD_LOGO,
      comments,
      submitting,
      currntComment,
      handleSubmit,
      // 回复
      currentReply,
      visible,
      showModal,
      handleOk
    }
  },
  components: { Module }
})
</script>

<style lang="less" scoped>
.empty {
  box-shadow: none !important;
}

:deep(.ant-comment-inner) {
  padding-bottom: 0;
}
</style>
