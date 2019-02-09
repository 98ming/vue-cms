<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!--  商品列表项区域  -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelect['1']"
                                   @change="selectChanged($store.getters.getGoodsSelect['1'])"></mt-switch>
                        <img src="http://img.alicdn.com/bao/uploaded/i3/1917047079/O1CN0122AEDTONiTEEAnd_!!1917047079.jpg">
                        <div class="info">
                            <h1>Apple/苹果 iPhone XR</h1>
                            <p>
                                <span class="price">￥2199</span>
                                <numbox :initcount="$store.getters.getGoodsCount['1']"></numbox>
                                <a href="#" @click.prevent="remove">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  结算区  -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价
                            <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import numbox from '../subcomponents/shopCarNumbox.vue'
    export default {
        data() {
            return {

            };
        },
        methods : {
          remove(){

          },
          selectChanged(val){
              this.$store.commit('updateGoodsSelected',{id : '1' , selected : val})
          }
        },
        components : {
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eeeeee;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 14px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 5px;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>