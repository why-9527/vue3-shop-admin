import {onBeforeUnmount, onMounted, reactive, ref} from "vue"
import {updatePassword} from "~/api/manager.js"
import {useStore} from 'vuex'
import {useRouter} from "vue-router"

export function useRepassword() {
    const formRef = ref(null) // 表单ref
    const formDrawerRef = ref(null)
    const rePasswordForm = reactive({ // 登录表单
        oldpassword: '',
        password: '',
        repassword: '',
    })

    const validateRepassword = (rule, value, callback) => {
        if (value !== rePasswordForm.password) {
            callback(new Error('请输入相同的密码'))
        } else {
            callback()
        }
    }

// 表单字段验证规则
    const rules = reactive({
        oldpassword: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
        ],
        password: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
        ],
        repassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validateRepassword, message: '两次密码不相同', trigger: 'blur'},
        ]
    })
    const rePassword = () => {
        formDrawerRef.value.open()
    }

    function onSubmit(e) {
        // 鼠标点击按钮或按键盘回车登录
        if (e.key === undefined || e.key === 'Enter') {
            formRef.value.validate(async (valid, fields) => {
                if (valid) {
                    // console.log('登录表单验证成功')
                    formDrawerRef.value.showLoading()
                    updatePassword(rePasswordForm).then(async res => {
                        ElNotification({
                            title: '成功', message: '修改密码成功,请重新登录', type: 'success', duration: 3000,
                        })
                        await store.dispatch('logout')
                        await router.push('/login')
                    }).finally(() => {
                        formDrawerRef.value.hideLoading()
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

    return {
        formDrawerRef,
        formRef,
        rePasswordForm,
        rules,
        rePassword,
        onSubmit,
    }
}

export function useLogout() {
    const router = useRouter()
    const store = useStore()
    const handlerLogout = () => {
        ElMessageBox.confirm(
            '确认要退出登录吗?',
            '提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '返回',
                type: 'warning',
                draggable: true,
            }
        ).then(async () => {
            await store.dispatch('logout')
            await router.push('/login')
            ElMessage({
                type: 'success',
                message: '已成功退出登录',
            })
        }).catch(() => {
            // 点了返回按钮触发
        })
    }

    return {
        handlerLogout,
    }
}
