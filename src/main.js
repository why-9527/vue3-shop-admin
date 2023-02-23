import {createApp} from 'vue'
import {router} from "./router"
import store from "~/store"
import './style.css'
import 'nprogress/nprogress.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './permission' // 权限管理
import permission from "~/directives/permission.js"
import App from './App.vue'

const app = createApp(App)

for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, comp)
}

app.use(router).use(store).use(permission)
    .mount('#app')
