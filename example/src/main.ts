import App from './App.vue'
import router from './router/index.js'
if(isDev){
    console.log('Vue version:', Vue.version);
    console.log('ELEMENT version:', ELEMENT.version);
    try {
        console.log('COMMON-PH version:', PH.version);
    } catch (error) {}
    try {
        console.log('FILEVIEW version:', FILEVIEW.version);
    } catch (error) {}
    try {
        console.log('echarts version:', echarts.version);
    } catch (error) {}
    Vue.config.errorHandler = function(err:any, vm:any, info:any) {
        console.log("===========================================")
        console.error(err)
        console.log("===========================================")
    }
}

InitProject().then( res => {
    STORE.commit( "CHANGE_LANG_TYPE" );
    new Vue({
        el: '#app-container',
        router,
        store: STORE,
        render: (c) => { return c(App) }
    })
})