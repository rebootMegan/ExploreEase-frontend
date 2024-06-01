import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { staticRoutes } from '/@/router/route';


/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRoutes],
});



// 路由加载前
router.beforeEach(async (to, from, next) => {
	NProgress.configure({ showSpinner: false });
	next();
	NProgress.done();
});

// 路由加载后
router.afterEach(() => {
	NProgress.done();
});

// 导出路由
export default router;
