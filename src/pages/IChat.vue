<template>
  <div>123</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { requestSendAll } from '~/api'

const getData = async () => {
  const res = await requestSendAll()

  console.log(res)
}

onMounted(() => {
  getData()
})
</script>

<style scoped></style>
