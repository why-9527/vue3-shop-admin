<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style>
body {
  @apply bg-gray-100;
}

/* 更改nprogress进度条样式 */
#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 3px;
}

/* 美化滚动条样式 */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}
</style>
