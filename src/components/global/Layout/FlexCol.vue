<template>
  <div class="flex w-full">
    <div class="flex-1 w-1000px enter-x">
      <slot name="body" />
    </div>
    <div class="w-400px flex-0 pl-5 enter-y">
      <slot name="side" />
    </div>
  </div>
</template>
