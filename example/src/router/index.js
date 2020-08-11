import fixedRouters from "./fixed-routers";
import DynamicRoutes from './routes.js';
const rootPath = require('root/webpack.config.js').name;
/**
 * @ 路由分配规则 
 * 1. 所有json配置的路由均为动态路由
 * 2. 404页面为固定路由
 */
const router = new VueRouter({ 
    mode: 'history',
    history: true,
    hashbang: false, //将路径格式化为#!开头
    transitionOnLoad: true, //初次加载是否启用场景切换
    saveScrollPosition: false, //在启用html5 history模式的时候生效，用于后退操作的时候记住之前的滚动条位置
    routes: fixedRouters,
    scrollBehavior(to, from, savedPosition) { //这个功能只在 HTML5 history 模式下可用
        if (savedPosition) {
            // return savedPosition
            return {
                x: 0,
                y: 0
            }
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

// 路由导航钩子函数
router.beforeEach((to, from, next) => {
    // 标识符 GET_PRE_PATH
    STORE.commit("GET_PRE_PATH", rootPath);
    // 同步用户信息 GET_USER_MSG
    STORE.commit("GET_USER_MSG");
    // 判断项目名称
    if(STORE.state.prePath){
        // 从vuex中获取 所有路由
        if(!STORE.state.permission.permissionList){
            STORE.dispatch('FETCH_PERMISSION', {router, DynamicRoutes}).then((res) => {
                if(to.fullPath === '/'){
                    next({ path: `/${STORE.state.prePath}` })
                }else{
                    next({ path: to.path + location.search })
                }
            })
        }else {
            if(to.fullPath === '/'){
                next({ path: `/${STORE.state.prePath}` })
            }else{
                next()
            }
        }
    }else{
        notification({
            title: "警告",
            message: '模块code获取失败，请检查请求地址是否正确，然后刷新页面！',
            type: "warning"
        })
    }
})

// window.Router = router
export default router;