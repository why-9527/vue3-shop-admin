<template>
  <el-drawer
      v-model="showDrawer"
      :title="title"
      direction="rtl"
      :close-on-click-modal="false"
      :size="size"
      :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">
          {{ confirmText }}
        </el-button>
        <el-button type="default" @click="close">
          取消
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import {ref} from 'vue'

const showDrawer = ref(false)
const loading = ref(false)
// 打开drawer
const open = () => showDrawer.value = true
// 关闭drawer
const close = () => showDrawer.value = false

const showLoading = () => loading.value = true

const hideLoading = () => loading.value = false

const emit = defineEmits(['submit'])
const submit = (e) => emit('submit', e) // 一定要把事件对象e传出去，不然父组件点击后接收不到e

// 向外界暴露组件的方法，不然外界不能调用
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
})

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: '提交',
  }
})
</script>

<style scoped>
.formDrawer {
  z-index: 999;
  @apply w-full h-full relative flex flex-col;
}

.formDrawer .body {
  bottom: 50px;
  @apply absolute flex flex-1 top-0 left-0 right-0 text-black overflow-y-auto;
}

.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
