// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

// 导入 App 跟组件
import app from './app.vue'

// 导入 MUI 的样式
import './lib/mui/dist/css/mui.css'
import './lib/mui/dist/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
import { Header } from 'mint-ui'
Vue.component(Header.name,Header)

// 导入自己的 router.js 模块
import router from './router.js'

var vm = new Vue({
    el : '#app',
    render : c => c(app),
    router // 挂载路由对象到 vm 实例上
})
