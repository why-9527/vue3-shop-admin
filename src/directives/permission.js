import store from "~/store"

function hasPermission(value, el = false) {
    if (!Array.isArray(value)) throw new Error(`需要配置v-permission,例如v-permission=['getStatistics3,GET']`)
    const hasAuth = value.findIndex(v => store.state.roleNames.includes(v)) !== -1
    if (el && !hasAuth) {
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}

export default {
    install(app) {
        app.directive('permission', {
            mounted(el, bingding) {
                hasPermission(bingding.value, el)
            }
        })
    }
}
