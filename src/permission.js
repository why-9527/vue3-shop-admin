import {router, addRoutes} from "~/router"
import store from "~/store"
import {getCookies} from "~/tools/auth"
import {showLoading, hiddenLoading} from "~/tools/utils"


let hasGetInfo = false
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    showLoading()
    const token = getCookies()
    let hasNewRoute = false
    if (!token && to.name !== 'login') {
        ElNotification({
            title: '警告', message: '请先登录', type: 'warning', duration: 3000,
        })
        return next({name: 'login'}) // 防止用户未登录进入系统
    } else if (token && to.name === 'login') {
        ElNotification({
            title: '警告', message: '请勿重复登录', type: 'warning', duration: 3000,
        })
        return next({path: from.path ? from.path : '/'}) // 防止登陆后还能进入登录页
    } else if (token && !hasGetInfo) {
        let {menus} = await store.dispatch('getInfo')
        hasGetInfo = true
        // 动态添加路由
        hasNewRoute = addRoutes(menus)
    }
    document.title = (to.meta.title ? to.meta.title : '') + '-商城后台管理系统'
    hasNewRoute ? next(to.fullPath) : next()
})

router.afterEach((to, from) => {
    hiddenLoading()
})
