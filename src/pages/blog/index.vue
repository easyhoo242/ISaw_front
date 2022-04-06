<template>
  <BranchCrumb route="正文" />
  <Module> 123 </Module>
  <FlexCol>
    <template #body> <HotList></HotList></template>

    <template #side>
      <Sidebar>
        <Casual />
      </Sidebar>
    </template>
  </FlexCol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BranchCrumb from '~/components/global/BranchCrumb.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: { BranchCrumb }
})
</script>

<style lang="less" scoped></style>
