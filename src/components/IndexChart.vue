<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-sm">订单统计</span>
          <div>
            <el-check-tag v-for="(item, index) in options" :key="index" :checked="current===item.value"
                          @click="handlerSelect(item)">{{
                item.text
              }}
            </el-check-tag>
          </div>
        </div>
      </template>
      <div id="chart" ref="chartRef" style="width: 100%;height: 300px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue"
import * as echarts from 'echarts'
import {getStatistics3} from "~/api/admin.js"
import {useResizeObserver} from "@vueuse/core"

const current = ref('week')
const chartRef = ref(null)

const options = [
  {
    text: '近1个月',
    value: 'month'
  },
  {
    text: '近1周',
    value: 'week'
  },
  {
    text: '近24小时',
    value: 'hour'
  },
]

let myChart = null
onMounted(() => {
  let chartDom = document.getElementById('chart');
  if (chartDom) {
    myChart = echarts.init(chartDom);
    getData()
  }
})

onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose()
  }
})

const handlerSelect = (item) => {
  current.value = item.value
  getData()
}

async function getData() {
  let option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };

  myChart.showLoading()
  const result = await getStatistics3(current.value)
  myChart.hideLoading()
  option.xAxis.data = result.x
  option.series[0].data = result.y
  myChart.setOption(option)
}

useResizeObserver(chartRef, () => {
  if (myChart) {
    myChart.resize()
  }
})
</script>

<style scoped>

</style>
