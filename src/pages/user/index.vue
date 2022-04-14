<template>
  <Module title="作者发布的文章" class="user">
    <FlexCol class="px-2">
      <template #body>
        <HotList />
      </template>

      <template #side>
        <SideBar>
          <Casual />
        </SideBar>
      </template>
    </FlexCol>
  </Module>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.user {
  background: transparent !important;
  box-shadow: none !important;
}
</style>
