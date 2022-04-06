<template>
  <Module corner>
    <a-comment>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="龙傲天" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" />
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

      <a-list
        v-if="comments.length"
        :data-source="comments"
        :header="`${comments.length} 条评论`"
        item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment
              :author="item.author"
              :avatar="item.avatar"
              :content="item.content"
              :datetime="item.datetime"
            >
              <template #actions>
                <span key="comment-nested-reply-to">回 复</span>
              </template>

              <a-comment
                :author="item.author"
                :avatar="item.avatar"
                :content="item.content"
                :datetime="item.datetime"
              >
              </a-comment>
            </a-comment>
          </a-list-item>
        </template>
      </a-list>

      <Module v-else title="评论列表" class="empty mt-0 p-0">
        <a-empty :description="null" class="py-6" />
      </Module>
    </a-comment>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useDayjs } from '~/hooks'

interface Comment {
  author: string
  avatar: string
  content: string
  datetime: string
  children?: Comment[]
}

export default defineComponent({
  setup() {
    const comments = ref<Comment[]>([])

    const submitting = ref<boolean>(false)
    const value = ref<string>('')
    const handleSubmit = () => {
      if (!value.value) {
        return
      }

      submitting.value = true

      setTimeout(() => {
        submitting.value = false
        comments.value = [
          {
            author: 'Du Cheng',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: value.value,
            datetime: useDayjs().fromNow(),
            children: [
              {
                author: 'Du Cheng',
                avatar: 'https://joeschmoe.io/api/v1/random',
                content: value.value,
                datetime: useDayjs().fromNow()
              }
            ]
          },
          ...comments.value
        ]
        value.value = ''
      }, 1000)
    }

    return {
      comments,
      submitting,
      value,
      handleSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.empty {
  box-shadow: none !important;
}
</style>
