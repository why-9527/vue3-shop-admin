<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="text-sm">{{ title }}</span>
          <el-tag type="danger" effect="plain">{{ tip }}</el-tag>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in btns" :key="index">
          <el-card shadow="hover">
            <div class="flex flex-col justify-center items-center">
              <span class="text-xl mb-2">{{ item.value }}</span>
              <span class="text-xs text-gray-500">{{ item.label }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  tip: String,
  btns: Array,
})
</script>

<style scoped>
.card-header {
  @apply flex justify-between items-center;
}
</style>
