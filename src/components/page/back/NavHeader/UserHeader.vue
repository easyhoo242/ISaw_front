<template>
  <div class="user-info">

    <a-dropdown>
      <span class="el-dropdown-link">
        <a-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></a-avatar>
        <span>{{ name }}</span>
      </span>
      <!-- <template #overlay>
        <a-menu>
          <a-menu-item> 退出登录 </a-menu-item>
          <a-menu-item> 用户信息 </a-menu-item>
          <a-menu-item> 系统管理 </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name || 'dc')

    return {
      name
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
