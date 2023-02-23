import service from "~/api/index.js"

// 获取统计信息
export const getStatistics1 = () => service.get('/statistics1')

//获取图标数据
export const getStatistics3 = (type) => service.get('/statistics3?type=' + type)
