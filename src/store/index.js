import {createStore} from 'vuex'
import {getInfo, login, logout} from "~/api/manager"
import {setCookies, removeCookies} from "~/tools/auth"

const store = createStore({
    state() {
        return {
            user: null,
            asideWidth: '250px', // 侧边栏宽度
            menus: [],
            roleNames: [],
        }
    },
    getters: {},
    mutations: {
        SET_USERINFO(state, user) {
            state.user = user
        },
        SET_ASIDEWIDTH(state) {
            state.asideWidth = state.asideWidth === '250px' ? '64px' : '250px'
        },
        SET_MENUS(state, menus) {
            state.menus = menus
        },
        SET_ROLENAMES(state, roleNames) {
            state.roleNames = roleNames
        },
    },
    actions: {
        // 用户登录
        login({commit}, {username, password}) {
            return new Promise((resolve, reject) => {
                login(username, password).then(async res => {
                    setCookies('admin_token', res.token) // 保存token到cookies中
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 用户退出登录
        logout({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(res => {
                    removeCookies()
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取用户个人信息
        getInfo({commit}) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    commit("SET_USERINFO", res)
                    commit('SET_MENUS', res.menus)
                    commit('SET_ROLENAMES', res.ruleNames)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
})

export default store
