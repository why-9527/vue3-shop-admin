import {createRouter, createWebHashHistory} from 'vue-router'

const Admin = () => import('~/layout/Admin.vue')
const Index = () => import('~/pages/Index.vue')
const NotFound = () => import('~/pages/404.vue')
const Login = () => import('~/pages/Login.vue')
const GoodsList = () => import('~/pages/goods/List.vue')
const CategoryList = () => import('~/pages/category/List.vue')
const CommentList = () => import('~/pages/comment/List.vue')
const CouponList = () => import('~/pages/coupon/List.vue')
const ImageList = () => import('~/pages/image/List.vue')
const NoticeList = () => import('~/pages/notice/List.vue')
const OrderList = () => import('~/pages/order/List.vue')
const SettingBase = () => import('~/pages/setting/Base.vue')
const UserList = () => import('~/pages/user/List.vue')

const routes = [
    {
        path: '/',
        name: 'admin',
        component: Admin,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录页'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound,
        meta: {
            title: '404页面未找到'
        }
    },
]

const asyncRoutes = [
    {
        path: '/',
        name: '/',
        component: Index,
        meta: {
            title: '首页'
        },
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: GoodsList,
        meta: {
            title: '商品管理'
        },
    },
    {
        path: '/category/list',
        name: '/category/list',
        component: CategoryList,
        meta: {
            title: '分类管理'
        }
    },
    {
        path: '/comment/list',
        name: '/comment/list',
        component: CommentList,
        meta: {
            title: '评价管理'
        }
    },
    {
        path: '/coupon/list',
        name: '/coupon/list',
        component: CouponList,
        meta: {
            title: '优惠卷管理'
        }
    },
    {
        path: '/image/list',
        name: '/image/list',
        component: ImageList,
        meta: {
            title: '图片管理'
        }
    },
    {
        path: '/notice/list',
        name: '/notice/list',
        component: NoticeList,
        meta: {
            title: '公告管理'
        }
    },
    {
        path: '/order/list',
        name: '/order/list',
        component: OrderList,
        meta: {
            title: '订单管理'
        }
    },
    {
        path: '/setting/base',
        name: '/setting/base',
        component: SettingBase,
        meta: {
            title: '配置管理'
        }
    },
    {
        path: '/user/list',
        name: '/user/list',
        component: UserList,
        meta: {
            title: '用户管理'
        }
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export function addRoutes(menus) {
    let hasNewRoute = false

    function findAndAddRoutesByMenus(arr) {
        arr.forEach(e => {
            let item = asyncRoutes.find(o => o.path === e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute('admin', item)
                hasNewRoute = true
            }
            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoute
}
