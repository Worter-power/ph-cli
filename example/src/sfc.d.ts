/**
 * 告诉 TypeScript window是个全局对象，直接可用，这样就不会在window.xx = 123时报错
 */
declare var STORE: any
declare var Vue: any
declare var isDev: any
declare var InitProject: any
declare var _: any
declare var request: any
declare var BUS: any
declare var momnet: any
declare var $: any
declare var jQuery: any
declare var Vuex: any
declare var VueRouter: any
declare var notification: any
declare var LoginBox: any
declare var isLogined: any
declare var THEME: any
declare var fullScreen: any
declare var echarts: any
declare var ELEMENT: any
declare var PH: any
declare var FILEVIEW: any
declare var win: any
/**
 * 告诉 TypeScript *.vue 后缀的文件可以交给 vue 模块来处理
 * 而在代码中导入 *.vue 文件的时候，需要写上 .vue 后缀。
 * 原因还是因为 TypeScript 默认只识别 *.ts 文件，不识别 *.vue 文件
 */

declare module "*.vue" {
    // import Vue from 'vue'
    export default Vue
}

declare module "*.json" {
    const value: any;
    export default value;
}
/**
 * 引入部分第三方库/自己编写的模块的时候需要额外声明文件
 * 引入的时候，需要使用类似 import VueLazyLaod from 'vue-lazyload' 的写法
 */
// declare module 'vue-lazyload'
// declare module '@zz/perf/vue'
// declare module 'raven-js'
// declare module 'raven-js/plugins/vue'

// 扩展vue属性
declare module "vue/types/vue" {
    interface Vue {
        $message: 'happy work！';
    }
}