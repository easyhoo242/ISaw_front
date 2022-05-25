<template>
  <div class="description">
    <a-descriptions class="margin-top" :title="title" :column="column" border>
      <template v-for="(itemData, index) in tableDatas" :key="index">
        <a-descriptions-item>
          <template #label> {{ itemData.name }} </template>
          <a-tag size="small">{{ itemData.description }}</a-tag>
        </a-descriptions-item>
      </template>
    </a-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 1
    },
    tableDatas: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.description {
  margin-bottom: 20px;
}
</style>
