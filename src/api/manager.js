import service from "~/api/index.js"

// 登录接口
export const login = (username, password) => {
    return service.post('/login', {
        username, password
    })
}

// 获取管理员信息和权限菜单
export const getInfo = () => service.post('/getinfo')

// 退出登录
export const logout = () => service.post('/logout')

// 修改密码
export const updatePassword = (data) => {
    return service.post('/updatepassword', data)
}
