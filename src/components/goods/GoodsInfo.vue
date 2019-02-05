<template>
    <div class="goodslist-container">
        <!--  商品轮播图区域  -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :lunbotuList="lunbotu"></swiper>
            </div>
        </div>
        <!--  商品购买区域  -->
        <div class="mui-card">
            <div class="mui-card-header">Apple/苹果 iPhone XR</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        市场价：<del>￥2399</del>&nbsp;&nbsp;市场价<span class="now_price">￥2199</span>
                    </p>
                    <p>
                        购买数量：<numbox @getcount="getSelectCount"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="add_ShopCar">加入购物车</mt-button>
                        <!--  分析：如何实现加入购物车的时候，拿到选择的数量  -->
                        <!--  1.经过分析发现：按钮属于 goodsinfo 页面，数字属于 numberbox 组件  -->
                        <!--  2.由于涉及到了父子组件的嵌套，所以，无法直接在 goodsinfo 页面中获取到选中的数量  -->
                        <!--  3.怎么解决这个问题：涉及到了 子组件向父组件传值（事件调用机制）  -->
                        <!--  4.事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数，传递
                        给这个方法  -->
                    </p>
                </div>
            </div>
        </div>
        <!--  商品参数区域  -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：*************</p>
                    <p>库存情况：60件</p>
                    <p>上架时间：2012-12-12 12:12:12</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import swiper from '../subcomponents/swiper.vue'
    import numbox from '../subcomponents/numbox.vue'
    export default {
        data(){
            return{
                id : this.$route.params.id,
                lunbotu : [],
                goodsinfo : {},
                ballFlag : false,
                selectCount : 1
            }
        },
        created() {
            this.getLunbo();
        },
        methods:{
            getLunbo(){
                this.$http.get('static/Lunbotu.json').then(result=>{
                    if(result.body.status === 0){
                        this.lunbotu = result.body.message
                    }
                })
            },
            goDesc(id){
                // 点击使用编程式导航跳转到 图文介绍 页面
                this.$router.push({name : '/home/goodsdesc' , params : {id}})
            },
            goComment(id){
                //
                this.$router.push({name : '/home/goodscomment' , params : {id}})
            },
            add_ShopCar(){
                // 加入购物车
                this.ballFlag = !this.ballFlag
            },
            beforeEnter(el){
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth;
                // 小球动画优化思路
                // 1.先分析导致动画不准确的本质原因：我们把小球最终位移到的位置，已经局限在了某一分辨率
                // 下的滚动条未滚动的情况下；
                // 2.只要分辨率和测试的时候不一样，或者滚动条有一定的距离之后，问题就出现了
                // 3.因此，我们经过分析，得到结论，不能把位置的横纵左边写死了，而是应该根据不同情况，动态
                // 计算这个坐标值
                // 4.经过分析，得出思路：先得到 徽标 的横纵坐标，在得到小球的横纵坐标，然后让 y 值求查，
                // x 值求差，得到的结果，就是横纵坐标要位移的距离
                // 5.如何获取徽标和小球的位置？？  domObject.getBoundingClientRect()

                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取徽标在页面中的位置
                const badgePosition = document.getElementById('badge').getBoundingClientRect()
                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;
                el.style.transform = `translate(${xDist}px,${yDist}px)`
                el.style.transition = 'all 1s cubic-bezier(.4,-0.3,1,.68)'
                done()
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag
            },
            getSelectCount(count){
                // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到 data 上
                this.selectCount = count
                console.log('父组件的值' + this.selectCount)
            }
        },
        components : {
            swiper,
            numbox
        }
    }
</script>
<style lang="scss" scoped>
    .goodslist-container{
        background-color: #eeeeee;
        overflow: hidden;
        .now_price{
            color: red;
            font-size: 14px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            z-index: 99;
            position: absolute;
            top: 357px;
            left: 147px;
        }
    }
</style>