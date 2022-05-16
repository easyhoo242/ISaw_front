<template>
  <!-- 发表评论框 -->
  <Module class="py-0">
    <a-comment class="py-0 pb-0">
      <template #content>
        <a-form-item>
          <a-textarea
            ref="textareaRef"
            id="textareaRef"
            v-model:value="currntComment"
            :rows="4"
          />
        </a-form-item>
        <a-form-item class="pr-4">
          <div class="flex items-center justify-end">
            <Emoji
              ref="getEmojiRef"
              style="transform: translateY(-4px)"
              @change="handleGetEmoji"
            />

            <a-button
              html-type="submit"
              :loading="submitting"
              type="primary"
              @click="handleSubmit"
            >
              提交
            </a-button>
          </div>
        </a-form-item>
      </template>
    </a-comment>
  </Module>

  <!-- 评论列表 -->
  <Module v-if="data.father.length">
    <a-list
      :data-source="data.father"
      :header="`${total}  |（共 ${totalAll}） 条评论`"
      item-layout="horizontal"
      class="px-6"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
            :author="item.user.nickname"
            :content="item.content"
            :datetime="item?.createTime?.split('T')[0]"
          >
            <template #avatar>
              <a-avatar
                :src="item?.user?.avatarUrl || BASE_HEAD_LOGO"
                alt=" "
              />
            </template>

            <template #actions>
              <span
                key="comment-nested-reply-to"
                @click="showModalReply(item.id)"
              >
                回 复
              </span>

              <span
                v-if="item.user.id === user.id"
                key="comment-nested-delete-to"
                @click="showDeleteConfirm(item.id)"
              >
                删 除
              </span>
            </template>

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

                <template #actions v-if="child.user.id === user.id">
                  <span
                    key="comment-nested-delete-to"
                    @click="showDeleteConfirm(child.id)"
                  >
                    删 除
                  </span>
                </template>
              </a-comment>
            </div>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>
  </Module>

  <!-- 评论列表空状态 -->
  <Module v-else title="暂时还没有评论哦~" class="pb-0">
    <a-empty :description="null" class="py-1" />
  </Module>

  <a-modal v-model:visible="visibleReply" title="回复消息" @ok="handleOkReply">
    <a-input v-model:value="currentReply" />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import usecache from '~/utils/cache'
import { BASE_HEAD_LOGO } from '~/api'
import type { ICommentType } from '~/api'
import { Modal } from 'ant-design-vue'
import Emoji from '~/components/global/Emoji/index.vue'

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
      default: 0
    },
    totalAll: {
      type: Number,
      default: 0
    }
  },
  components: { Emoji },
  emits: ['submit', 'reply', 'delete'],
  setup(props, { emit }) {
    const comments = ref<Comment[]>([])
    const submitting = ref<boolean>(false)
    const currntComment = ref<string>('')

    const user = usecache.getCache('user')

    const visibleReply = ref<boolean>(false)
    const handleSubmit = () => {
      emit('submit', currntComment.value)
    }

    // 回复弹框
    const currentComment = ref(0)
    const currentReply = ref('')
    const showModalReply = (id: number) => {
      currentComment.value = id
      visibleReply.value = true
    }

    const handleOkReply = () => {
      visibleReply.value = false
      emit('reply', currentComment.value, currentReply.value)
    }

    // 删除弹框
    const showDeleteConfirm = (id: number) => {
      Modal.confirm({
        title: '确认删除这条评论？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',

        onOk() {
          emit('delete', id)
        },
        onCancel() {}
      })
    }

    // 插入表情
    const handleGetEmoji = (emoji: string) => {
      const textarea = document.getElementById(
        'textareaRef'
      ) as HTMLTextAreaElement

      function insertTxtAndSetcursor(insertTxt: string) {
        // 获取到指定标签
        let startPos = textarea.selectionEnd
        let endPos = textarea.selectionEnd
        if (startPos === undefined || endPos === undefined) return

        let oldTxt = textarea.value
        let result =
          oldTxt.substring(0, startPos) + insertTxt + oldTxt.substring(endPos)
        textarea.value = result
        textarea.focus()
        textarea.selectionStart = startPos + insertTxt.length
        textarea.selectionEnd = startPos + insertTxt.length

        return result
      }

      currntComment.value = insertTxtAndSetcursor(emoji)!
    }

    return {
      user,
      BASE_HEAD_LOGO,
      comments,
      submitting,
      currntComment,
      handleSubmit,
      // 回复评论
      currentReply,
      visibleReply,
      showModalReply,
      handleOkReply,
      // 删除评论
      showDeleteConfirm,
      // 返回的表情包
      handleGetEmoji
    }
  }
})
</script>

<style lang="less" scoped>
.empty {
  box-shadow: none !important;
}

:deep(.ant-comment-inner) {
  padding-bottom: 0;
}

:deep(.ant-form-item) {
  margin-bottom: 10px;
}
</style>
