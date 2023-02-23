import axios from 'axios'
import {getCookies} from "~/tools/auth.js"
import {showLoading, hiddenLoading} from "~/tools/utils"
import store from "~/store/index.js"

const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(config => {
    showLoading()
    const token = getCookies()
    if (token) config.headers['token'] = token
    return config
}, err => {
    hiddenLoading()
    ElNotification({
        title: '错误',
        message: err.response.data.msg || '请求失败',
        type: 'error',
        duration: 3000,
    })
    return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(response => {
    hiddenLoading()
    return response.data.data
}, err => {
    const msg = err.response.data.msg || '响应失败'
    if (msg === '非法token，请先登录！') {
        store.dispatch('logout').finally(() => {
            location.reload()
        })
    }
    hiddenLoading()
    ElNotification({
        title: '错误',
        message: msg,
        type: 'error',
        duration: 3000,
    })
    return Promise.reject(err)
})
export default service
