<template>
  <el-row class="min-h-screen">
    <el-col :md="12" :lg="16" class="bg-indigo-500">
      <div class="text-white h-full flex items-center justify-center flex-col">
        <h3 class="font-bold text-5xl mb-4">欢迎来到站点</h3>
        <p class="text-sm">vue3+elementPlus+tailwindcss+vite响应式商城后台管理系统项目地址</p>
      </div>
    </el-col>
    <el-col :md="12" :lg="8" class="bg-gray-50">
      <div class="h-full flex items-center justify-center flex-col">
        <h3 class="font-bold text-3xl text-gray-800">欢迎回来</h3>
        <div class="my-5 flex items-center justify-center text-gray-300 space-x-2">
          <span class="bg-gray-200 h-px w-16"></span>
          <span>账号密码登录</span>
          <span class="bg-gray-200 h-px w-16"></span>
        </div>
        <el-form size="large" :model="loginForm" :rules="rules" ref="formRef" class="w-64">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon>
                  <User/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" show-password placeholder="请输入密码">
              <template #prefix>
                <el-icon>
                  <Lock/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button round :loading="loading" color="#626aef" type="primary" @click="onSubmit"
                       class="w-full">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import {reactive, ref, onMounted, onBeforeUnmount} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from "vuex"

const router = useRouter()
const store = useStore()
const formRef = ref(null) // 表单ref
const loading = ref(false) // 是否在登录
const loginForm = reactive({ // 登录表单
  username: '',
  password: '',
})

// 表单字段验证规则
const rules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ]
})

// 登录功能
function onSubmit(e) {
  // 鼠标点击按钮或按键盘回车登录
  if (e.key === undefined || e.key === 'Enter') {
    formRef.value.validate(async (valid, fields) => {
      if (valid) {
        console.log('登录表单验证成功')
        loading.value = true
        store.dispatch('login', loginForm).then(res => {
          ElNotification({
            title: '成功',
            message: '登录成功',
            type: 'success',
            duration: 3000,
          })
          router.push('/')
        }).finally(() => {
          loading.value = false
        })
      } else {
        console.log('登录表单验证失败')
      }
    })
  }
}

onMounted(() => {
  document.addEventListener('keyup', onSubmit)
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onSubmit)
})
</script>

<style scoped>

</style>
