<template>
    <div class="sy-app-container">
        <div class="sy-home-body-left" :class="{'is-expended': isRotate}">
            <el-nav :theme="$store.state.theme" :data="navList" :defaultActive="currentPage" @style-change="isRotate = !isRotate"></el-nav>
        </div>
        <div class="sy-home-body-right" :class="{'is-expended': !isRotate}">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>


<script lang="ts">
import "./scss/index.scss";
import './vuex/index.js';
import lang from "./lang/index";
import version from '../../../version.json';
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
// import test from './test.vue'
@Component({
//   components: {
//     test
//   }
})
export default class HomeBox extends Vue {
    $request
    $store
    $router
    $route
    $moment
    // props
    @Prop({ type: String, default: '' })
    // data
    versionList= []
    isRotate:boolean= false
    currentPage:string= ''
    // 钩子函数
    created() {
        this.$store.commit("CHANGE_LANG", lang);
        let title =  version[this.$store.state.langType][0].model;
        BUS.$emit('set-header-options', {
            showUserName: true,
            title: title,
            versions: version[this.$store.state.langType]
        });
        document.title = title;
        this.init();
    }
    // methods 中方法
    public async init(): Promise<void>{
        // const r = await this.apiGet('/show')
        this.$on('currentPage', (msg)=> {
            this.currentPage = msg;
        });
    }
    // 计算属性  computed
    get navList (){
        let arr = [];
        this.$store.state.permission.dyMenu.forEach((_a, a)=>{
            if(_a.resourceType == 2){
                _a.name = this.$store.state.lang.base[_a.code] || _a.name;
                _a.children.forEach((_d, d)=>{
                    if(_d.resourceType == 2){
                        _d.name = this.$store.state.lang.base[_d.code] || _d.name;
                    }
                })
            }
            arr.push(_a)
        })
        return arr
    }

    mounted(){
        if (process.env.NODE_ENV == 'production') {
            // 使用统计次数
            this.$request('post', '/api/base/user_access_detail',{
                userId: this.$store.state.userId,
                userType: this.$store.state.userType,
                unitId: this.$store.state.unitId,
                resId: this.$store.state.prePath,
                resName: version['zh-CN'][0].model,
                type: 1
            }).then(res=>{}).catch(err=>{});
        }
    }
}
</script>