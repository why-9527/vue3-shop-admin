import {ref} from 'vue'
import {useRoute, useRouter, onBeforeRouteUpdate} from 'vue-router'
import {setCookies, getCookies} from "~/tools/auth.js"

export function useTabList() {
    const route = useRoute()
    const router = useRouter()

    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/',
        },
    ])

    function initTabList() {
        const tbs = getCookies('tabList')
        if (tbs) {
            tabList.value = tbs
        }
    }

    initTabList()

    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a === t) {
            tabs.forEach((item, index) => {
                if (item.path === t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(item => item.path !== t)
        setCookies('tabList', tabList.value)
    }

    const addTab = (tab) => {
        const notTab = tabList.value.findIndex(t => t.path === tab.path) === -1
        if (notTab) {
            tabList.value.push(tab)
        }
        setCookies('tabList', tabList.value)
    }

    const changeTab = async (t) => {
        await router.push(t)
    }

    const handlerClose = (c) => {
        if (c === 'clearAll') {
            tabList.value = [{
                title: '后台首页',
                path: '/'
            }]
            activeTab.value = '/'
        } else if (c === 'clearOther') {
            tabList.value = tabList.value.filter(item => item.path === '/' || item.path === activeTab.value)
        }

        setCookies('tabList', tabList.value)
    }

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path

        const tab = {
            title: to.meta.title,
            path: to.path,
        }

        addTab(tab)
    })

    return {
        activeTab,
        tabList,
        removeTab,
        changeTab,
        handlerClose,
    }
}
