import NProgress from 'nprogress'

// 展示加载效果
export const showLoading = () => {
    NProgress.start()
}

// 关闭加载效果
export const hiddenLoading = () => {
    NProgress.done()
}
