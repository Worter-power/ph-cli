module.exports = `
import Index from '{{path}}.vue';
const router = new VueRouter({
    mode: 'history',
    history: true,
    hashbang: false, //将路径格式化为#!开头
    transitionOnLoad: true, //初次加载是否启用场景切换
    saveScrollPosition: false //在启用html5 history模式的时候生效，用于后退操作的时候记住之前的滚动条位置
});
const store = new Vuex.Store({
    state: {}
});
isLogined().then(()=>{
    THEME().then(res => {
        new Vue({
            el: '#{{id}}',
            router,
            store,
            render: (c) => {return c(Index)}
        });
    })
})
`