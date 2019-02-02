// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)
// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)
// 设置请求根路径
Vue.http.options.root=''
// 全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入格式化时间插件
import moment from 'moment'
// 设置全局时间过滤器
Vue.filter('dateFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 导入 App 跟组件
import app from './app.vue'

// 导入 MUI 的样式
import './lib/mui/dist/css/mui.css'
import './lib/mui/dist/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);

// 导入自己的 router.js 模块
import router from './router.js'

var vm = new Vue({
    el : '#app',
    render : c => c(app),
    router // 挂载路由对象到 vm 实例上
})
