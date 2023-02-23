<template>
  <div class="f-header">
    <form-drawer ref="formDrawerRef" title="修改密码" destroy-on-close @submit="onSubmit">
      <el-form size="large" label-width="80px" :model="rePasswordForm" :rules="rules" ref="formRef" class="w-96">
        <el-form-item prop="oldpassword" label="旧密码">
          <el-input v-model="rePasswordForm.oldpassword" show-password placeholder="请输入旧密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input v-model="rePasswordForm.password" show-password placeholder="请输入新密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input v-model="rePasswordForm.repassword" show-password placeholder="请确认密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </form-drawer>
    <span class="logo">
      <el-icon class="mr-1"><School/></el-icon>
      商城后台
    </span>
    <el-tooltip
        effect="dark"
        :content="$store.state.asideWidth==='250px'?'收起导航':'打开导航'"
        placement="bottom"
    >
      <el-icon class="icon-btn" @click="$store.commit('SET_ASIDEWIDTH')">
        <fold v-if="$store.state.asideWidth === '250px'"/>
        <Expand v-else/>
      </el-icon>
    </el-tooltip>
    <el-tooltip
        effect="dark"
        content="刷新"
        placement="bottom"
    >
      <el-icon class="icon-btn" @click="handlerRefresh">
        <refresh/>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex justify-center items-center">
      <el-tooltip
          effect="dark"
          :content="isFullscreen?'退出全屏':'全屏'"
          placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen"/>
          <Aim v-else/>
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handlerDropdown">
    <span class="el-dropdown-link flex justify-center items-center text-white">
      <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"/>
      {{ $store.state.user.username }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {useFullscreen} from '@vueuse/core'
import FormDrawer from "~/components/FormDrawer.vue"
import {useRepassword, useLogout} from '~/tools/useManager'

const {
  formDrawerRef, // drawer组件ref
  formRef, // 表单组件ref
  rePasswordForm, // 修改密码表单
  rules, // 表单验证规则
  rePassword, // 修改密码弹出函数
  onSubmit, // 点击修改功能
} = useRepassword()

const {handlerLogout} = useLogout()

const {
  isFullscreen, // 是否全屏
  toggle // 切换全屏
} = useFullscreen()

const handlerDropdown = (command) => {
  switch (command) {
    case 'rePassword':
      rePassword()
      break
    case 'logout':
      handlerLogout()
      break
  }
}

const handlerRefresh = () => location.reload()
</script>

<style scoped>
.f-header {
  height: 64px;
  z-index: 100;
  @apply flex items-center bg-indigo-600 text-white fixed top-0 left-0 right-0;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  width: 42px;
  height: 64px;
  @apply flex justify-center items-center cursor-pointer hover:bg-indigo-500;
}

.f-header .dropdown {
  height: 64px;
  @apply flex justify-center items-center mx-5;
}
</style>
