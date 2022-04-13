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
import { useStore } from 'vuex'
import HotList from '~/components/page/HotList.vue'
import FlexCol from '~/components/global/Layout/FlexCol.vue'
import SideBar from '~/components/global/SideBar/index.vue'
import Casual from '~/components/global/SideBar/Casual.vue'

export default defineComponent({
  setup() {
    const store = useStore()

    console.log(store.state.userInfo.id)
    return {}
  },
  components: { HotList, FlexCol, SideBar, Casual }
})
</script>

<style lang="less" scoped>
.user {
  background: transparent !important;
  box-shadow: none !important;
}
</style>
