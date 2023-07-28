import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router'
//动态导入所有modules下的路由信息
const modelsFile = import.meta.glob('./modules/*.ts', { eager: true })
//路由去中心化
/**
 * a: {
 *     name: 'zhangsan’,
 *     account: 'zs'
 * }
 * Object.keys(a) => ['name', 'acount']
 * Object.values(a) => ['zhangsan', 'zs']
 * map forEach for in
 * Record<key, value> => {}
 * 二维数组转一维数组 string[][] => string[]
 * [{
 * name: '1月',
 * data: [60, 50]
 * },{
 *     name: '2月',
 *     data: [70, 80]
 * }]
 * ['1月', '2月'] => xAxis
 * b:[[60, 50], [70, 80]] =>b.flat()=>[60, 50, 70, 80]
 */
const children =
	Object.keys(modelsFile)
		.map((key: string) => (modelsFile[key] as Record<any, any>).default)
		.flat(1) || []

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/home/Index3.vue'),
		children: children
	}
]
const router = createRouter({
	history: createWebHistory(),
	routes
})
export const defaultBeforeEach = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	if (['/404', '/403', '/500'].includes(to.path)) {
		next()
		return
	} else {
		next()
	}
}
/**
 * 路由守卫
 */
router.beforeEach(defaultBeforeEach)

/**
 * 获取路由信息
 */
export const getRouter = (): Router => {
	return router
}
export default router
