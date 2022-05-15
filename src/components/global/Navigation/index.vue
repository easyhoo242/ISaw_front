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

    <!-- 分类 -->
    <div class="navigation-item pt-4 items-center">
      <div class="flex mb-4">
        <div class="item-title">{{ data[0].name }}</div>
        <div
          v-for="item in data[0].children"
          :key="item.label"
          class="item-children flex items-center"
        >
          <a-radio-group
            v-model:value="currentType"
            size="small"
            button-style="solid"
          >
            <a-radio-button
              class="item-child"
              :value="item.label"
              @click.native.prevent="handleTypeChange(item.label)"
            >
              {{ item.name }}
            </a-radio-button>
          </a-radio-group>
        </div>
      </div>

      <!-- 排序 -->
      <div class="flex">
        <div class="item-title">{{ data[1].name }}</div>
        <div
          v-for="item in data[1].children"
          :key="item.label"
          class="item-children flex items-center"
        >
          <a-radio-group
            v-model:value="currentSort"
            size="small"
            button-style="solid"
          >
            <a-radio-button
              class="item-child"
              :value="item.label"
              @click.native.prevent="handleSortChange(item.label)"
            >
              {{ item.name }}
            </a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useRouter } from 'vue-router'

export interface IChildType {
  name: string
  label: number
  url: string
}

interface IDataType {
  name: string
  value: string
  children: IChildType[]
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IDataType[]>,
      default: () => []
    }
  },
  emit: ['change'],
  setup(_, { emit }) {
    const router = useRouter()

    const currentKeyboard = ref('')
    let preKeyboard = ''

    const currentType = ref(2)
    const currentSort = ref(0)

    const getCurrentInfo = (
      preKeyboard: string,
      keyboard: string = currentKeyboard.value,
      type: number = currentType.value,
      sort: number = currentSort.value
    ) => {
      const data = {
        keyboard,
        preKeyboard,
        type,
        sort
      }

      return data
    }

    // 类型
    const handleTypeChange = (label: number) => {
      label === 3 && router.push('/talk')

      currentType.value = label

      emit('change', getCurrentInfo(preKeyboard))
    }

    // 排序
    const handleSortChange = (label: number) => {
      currentSort.value = label

      emit('change', getCurrentInfo(preKeyboard))
    }

    // 搜索框
    const handleSearch = () => {
      preKeyboard = currentKeyboard.value

      emit('change', getCurrentInfo(preKeyboard))
    }

    return {
      currentKeyboard,
      currentType,
      handleTypeChange,
      currentSort,
      handleSortChange,
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
  margin-right: 20px;
}
.navigation-item {
  font-size: 14px;

  .item-children {
    .item-child {
      cursor: pointer;
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
