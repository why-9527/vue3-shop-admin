<template>
  <el-menu
      class="f-menu"
      :default-active="defaultActive"
      :style="{width:$store.state.asideWidth}"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
      @select="handlerSelect"
  >
    <template v-for="(item, index) in asideMenus" :key="index">
      <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
          <el-icon>
            <component :is="item2.icon"></component>
          </el-icon>
          <span>{{ item2.name }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.frontpath">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const asideMenus = computed(() => store.state.menus)
const defaultActive = ref(route.path)

const isCollapse = computed(() => {
  return store.state.asideWidth !== '250px'
})

const handlerSelect = (e) => {
  router.push(e)
}
</script>

<style scoped>
.f-menu {
  width: 250px;
  top: 64px;
  transition: all .33s;
  @apply shadow-md fixed left-0 bottom-0 bg-gray-50 overflow-y-auto overflow-x-hidden border-0;
}

.f-menu::-webkit-scrollbar {
  width: 0;
}
</style>
