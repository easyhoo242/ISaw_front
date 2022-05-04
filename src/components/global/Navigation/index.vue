<template>
  <Module class="navigation mt-4 bg-white enter-y pl-5">
    <div class="flex mt-1">
      <div class="item-title flex-0 mr-5">搜索</div>
      <a-input
        v-model:value="currentKeyboard"
        placeholder="在这里输入您想搜索的内容，按Enter键搜索"
        size="small"
        class="flex-0 w-90"
        @keyup.enter.native="handleSearch"
      />
    </div>

    <div v-for="item in data" class="navigation-item pt-4 flex items-center">
      <div class="item-title">{{ item.title }}</div>
      <div
        v-for="child in item.children"
        :key="child.title"
        class="item-children flex items-center"
      >
        <div :href="child.url">
          <div class="item-child">{{ child.title }}</div>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export interface IChildType {
  title: string
  url: string
}

interface IDataType {
  title: string
  children: IChildType[]
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IDataType[]>,
      default: () => []
    }
  },
  setup(_) {
    const currentKeyboard = ref('')
    let preKeyboard = currentKeyboard.value

    const handleSearch = () => {
      console.log(currentKeyboard.value)
    }

    return {
      currentKeyboard,
      handleSearch
    }
  }
})
</script>

<style lang="less" scoped>
.item-title {
  font-size: 14px;
  cursor: pointer;
  width: 50px;
  padding: 3px 10px;
  background-color: #f6f6f6;
  color: #333;
  border-radius: 3px;
  margin-right: 10px;
}
.navigation-item {
  font-size: 14px;

  .item-children {
    .item-child {
      cursor: pointer;
      padding: 3px 10px;
      color: #333;
      border-radius: 3px;
      margin-right: 10px;

      &:hover {
        background-color: #42a1ff;
        color: #fff;
      }
    }
  }
}
</style>
