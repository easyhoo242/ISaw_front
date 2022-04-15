<template>
  <Module>
    <a-comment>
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

  <Module v-if="data?.father?.length || 0">
    <a-list
      :data-source="data.father"
      :header="`${data?.father?.length || 0} 条评论`"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
            :author="item.user?.name"
            :content="item.content"
            :datetime="item.createAt.split('T')[0]"
          >
            <template #avatar>
              <a-avatar :src="item.user?.logo" alt="用户头像" />
            </template>

            <template #actions>
              <span key="comment-nested-reply-to">回 复</span>
            </template>

            <div v-for="son in data.son">
              <a-comment
                v-if="son.comment_id === item.id"
                :author="son.user.name"
                :content="son.content"
                :datetime="son.createAt.split('T')[0]"
              >
                <template #avatar>
                  <a-avatar :src="son.user?.logo" alt="用户头像" />
                </template>
              </a-comment>
            </div>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>
  </Module>

  <Module v-else title="评论列表">
    <a-empty :description="null" class="py-6" />
  </Module>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import type { ICommentType } from '~/api'
import { BASE_LOGO } from '~/api'
import Module from '~/components/global/Module.vue'

import usecache from '~/utils/cache'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<ICommentType>,
      default: () => []
    }
  },
  emits: ['submit'],
  setup(_, { emit }) {
    const comments = ref<Comment[]>([])
    const submitting = ref<boolean>(false)
    const currntComment = ref<string>('')

    const user = usecache.getCache('user')

    const handleSubmit = () => {
      console.log('submit', currntComment.value)
      emit('submit', currntComment.value)
    }

    return {
      user,
      BASE_LOGO,
      comments,
      submitting,
      currntComment,
      handleSubmit
    }
  },
  components: { Module }
})
</script>

<style lang="less" scoped>
.empty {
  box-shadow: none !important;
}
</style>
