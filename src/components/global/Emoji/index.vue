<template>
  <div class="chatIcon">
    <a-popover placement="bottom" title="选择表情" trigger="click">
      <template #content>
        <div class="emotionList">
          <A
            v-for="(item, index) in faceList"
            :key="index"
            href="javascript:void(0);"
            class="emotionItem"
            @click="getEmo(index)"
          >
            {{ item }}
          </A>
        </div>
      </template>

      <a-button shape="circle">😀</a-button>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import appData from '~/utils/emoji'

export default defineComponent({
  emit: ['change'],
  setup(_, { emit }) {
    const faceList = ref<string[]>([])

    //@ts-ignore
    const emojiItem = ref('')

    const getEmo = (index: number) => {
      emojiItem.value = faceList.value[index]

      emit('change', emojiItem.value)
    }

    onMounted(() => {
      for (let i in appData) {
        faceList.value.push(appData[i].char)
      }
    })

    return {
      faceList,
      getEmo
    }
  }
})
</script>

<style lang="less" scoped>
:deep(.ant-popover-inner-content) {
  padding: 2px 5px !important;
}
.emotionList {
  display: flex;
  flex-wrap: wrap;
  width: 200px;

  .emotionItem {
    width: 20%;
    padding: 2px 5px;
    font-size: 20px;
    text-align: center;
  }
}
.chatIcon {
  padding: 0 10px;
  font-size: 25px;

  .emotionSelect {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .emotionSelect img {
    width: 14px;
    height: 14px;
  }

  /*包含以下四种的链接*/
  .emotionItem {
    text-decoration: none;
  }
  /*正常的未被访问过的链接*/
  .emotionItem:link {
    text-decoration: none;
  }
  /*已经访问过的链接*/
  .emotionItem:visited {
    text-decoration: none;
  }
  /*鼠标划过(停留)的链接*/
  .emotionItem:hover {
    text-decoration: none;
  }
  /* 正在点击的链接*/
  .emotionItem:active {
    text-decoration: none;
  }
}
</style>
