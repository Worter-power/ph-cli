/**
 * 项目自定义模块
 *  this.$store.registerModule('模块名称'，{
        state: {},
        getters: {},
        mutations: {},
        actions: {}
    })
 */

 /**
  * 已有模块动态注册子模块
  * this.$store.registerModule(['已有模块名称','子模块名称']，{
        state: {},
        getters: {},
        mutations: {},
        actions: {}
    })
  */
 
/**
  * 卸载动态模块
  * this.$store.unregisterModule('模块名称')
  */
 
import state from './state';
import mutations from './mutations';
import actions from './actions';

STORE.registerModule('base', {
    state,
    mutations,
    actions
})