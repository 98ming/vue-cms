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
// 导入 vuex
import Vuex from 'vuex'
// 安装 vuex
Vue.use(Vuex)
// new Vuex.store() 实例，得到一个数据仓储对象

// 每次刚进入网站，肯定会调用 main.js 在调用的时候，先从本地存储中，把购物车的数据读取出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state : {
        // 大家可以把 state 想象成组件中的 data，专门用来存储数据的
        // 如果在组件中，想要访问 store 中的数据，只能通过 this.$store.status.*** 来访问
        car : car, // 将购物车中的商品数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象，咱们
        // 可以暂时将这个商品对象，设计成这个样子
        // {id : 商品的id ，count : 要购买的数量，price : 商品的单价，selected : false}
    },
    mutations : {
        // 注意：如果要操作 store 中的 state 值，只能通过调用 mutations 提供的方法，才能操作对应的数据，不
        // 推荐直接操作 state 中的数据，因为万一导致了数据的紊乱，不能快速定位到错误的原因，因为，每个组件
        // 都可能有操作数据的方法；
        addToCar(state,goodsinfo){
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1.如果购物车中，之前就已经有了对应的商品，那么，只需要更新数量
            // 2.如果没有，则直接把商品数据，push 到 car 中即可；

            // 假设在购物车中，没有找到对应的商品
            var flag = false
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.car.push(goodsinfo)
            }

            // 当更新 car 之后，把 car 数组，存储到本地的 localStorage 中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            // 修改购物车中商品的数量值
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当更新 car 之后，把 car 数组，存储到本地的 localStorage 中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        remove(state,id){
            // 删除购物车中的商品
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.shift(i,1)
                }
            })
        },
        updateGoodsSelected(state,goodsinfo){
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.selected = goodsinfo.selected
                }
            })
            // 当更新 car 之后，把 car 数组，存储到本地的 localStorage 中
            localStorage.setItem('car',JSON.stringify(state.car))
        }
        // 注意：如果组件想要调用 mutations 中的方法，只能使用 this.$store.commit('方法名')
        // 注意：mutations 的函数参数列表中，最多支持两个参数，其中，参数1：是 state 状态；参数2：通
        // 过 commit 提交过来的参数
    },
    getters : {
        // 注意：这里的 getters 只负责对外提供数据，不负责修改数据
        getAllCount(state){
            var c = 0
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelect(state){
            var o ={}
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count : 0,
                amount : 0
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.count * 2199
                }
            })
            return o
        }
        // 经过回顾对比，发现 getters 中的方法，和组件中的过滤器比较类似，因为，过滤器和 getters 都没有
        // 修改原数据，都是把原数据做了一层包装，提供给了调用者
        // 其次， getters 也和 computed 比较像，只要 state 中的数据发生了变化，那么，如果 getters 正好也
        // 引用了这个数据，那么，就会立即触发 getters 的重新求值；
    }
})
// vuex总结：
// 1.state 中的数据，不能直接修改，如果想要修改，必须通过 mutations
// 2.如果组件想要直接从 state 上获取数据；需要使用 this.$store.state.***
// 3.如果组件想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$route.commit('方法名'，唯一的参数)
// 4.如果 store 中 state 上的数据，在对外提供的时候，需要做一层包装，那么，推荐使用 getters，如果需要
// 使用 getters ，则用 this.$store.getters.***
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
import { Header,Swipe, SwipeItem,Button,Lazyload,Switch } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
Vue.component(Switch.name, Switch);

// 导入自己的 router.js 模块
import router from './router.js'

var vm = new Vue({
    el : '#app',
    render : c => c(app),
    router ,// 挂载路由对象到 vm 实例上
    store   // 将 数据仓库挂载到 vm 实例，只要挂载到了 vm 上，任何组件都能使用 store 存取数据
})
