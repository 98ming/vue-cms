<template>
    <div class="goods-list">
        <!--<router-link class="goods-item" v-for="item in GoodsList" :key="item.id"
                     :to="'/home/goodsinfo/'+item.id">
            <img :src="item.img_url" alt="">
            <h1>{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>-->
        <!--  在网页中，有两种跳转方式  -->
        <!--  1. 使用 a 标签的形式叫做 标签跳转  -->
        <!--  2. 使用 window.location.href 的形式，叫做编程式导航  -->
        <div class="goods-item" v-for="item in GoodsList" :key="item.id" @click="getDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1>{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                GoodsList : []
            }
        },
        created() {
            this.getGoodsList();
        },
        methods : {
            getGoodsList(){
                this.$http.get('static/GoodsList.json').then(result=>{
                    if(result.body.status === 0){
                        this.GoodsList = this.GoodsList.concat(result.body.message)
                    }
                })
            },
            getMore(){
                this.getGoodsList()
            },
            getDetail(id){
                // 使用 js 的形式进行路由导航
                // 注意：一定要区分 this.$route 和 this.$router 这两个对象
                // 其中：this.$route 是路由【参数对象】，所有路由中的参数，params，query 都属于它
                // 其中：this.$router 是一个路由【导航对象】，用它可以方便的使用 js 代码，实现路由的导航
                // 1. 最简单的
                // this.$router.push('/home/goodsinfo/' + id)
                // 2. 传递对象
                // this.$router.push({path : '/home/goodsinfo/' + id})
                // 3. 传递命名的路由
                this.$router.push({name:'goodsinfo',params:{id : id}})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border: 1px solid #cccccc;
            box-shadow: 0 0 8px #cccccc;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 170px;
            img{
                width: 100%;
            }
            h1{
                font-size: 14px;
            }
            .info{
                background-color: #cccccc;
                p{
                    margin: 0;
                    padding: 3px;
                }
                .price{
                    .now{
                        color: red;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>