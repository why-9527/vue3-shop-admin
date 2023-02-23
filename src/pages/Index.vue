<template>
  <div>
    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <template v-if="panels.length === 0">
        <el-col :span="6" :xs="24" :sm="12" :md="6" v-for="i in 4" :key="i">
          <el-skeleton animated loading>
            <template #template>
              <el-card>
                <template #header>
                  <div class="card-header">
                    <el-skeleton-item variant="text" style="width: 50%"/>
                    <el-skeleton-item variant="text" style="width: 10%"/>
                  </div>
                </template>
                <el-skeleton-item variant="text" style="width: 80%"/>
                <el-divider/>
                <div class="flex justify-between items-center text-sm text-gray-500 ">
                  <el-skeleton-item variant="text" style="width: 50%"/>
                  <el-skeleton-item variant="text" style="width: 10%"/>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col :span="6" :xs="24" :sm="12" :md="6" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor">{{ item.unit }}</el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500"><CountTo :value="item.value"></CountTo></span>
          <el-divider/>
          <div class="flex justify-between items-center text-sm text-gray-500 ">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <IndexNavs></IndexNavs>
    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :xs="24" :sm="24" :md="12" v-permission="['getStatistics3,GET']">
        <IndexChart></IndexChart>
      </el-col>
      <el-col :span="12" :xs="24" :sm="24" :md="12" style="display: flex;" class="flex-col justify-between" v-permission="['getStatistics2,GET']">
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-3"></IndexCard>
        <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order"></IndexCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {getStatistics1, getStatistics2} from "~/api/admin.js"
import IndexNavs from "~/components/IndexNavs.vue"
import IndexChart from "~/components/IndexChart.vue"
import IndexCard from "~/components/IndexCard.vue"
import CountTo from "~/components/CountTo.vue"

const panels = ref([])

getStatistics1().then(res => {
  // console.log('res=====>', res)
  panels.value = res.panels
})

const goods = ref([])
const order = ref([])
getStatistics2().then(res => {
  goods.value = res.goods
  order.value = res.order
})
</script>

<style scoped>
.card-header {
  @apply flex justify-between items-center;
}
</style>
