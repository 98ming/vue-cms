<template>
    <div>
        <!--  轮播图区域  -->
        <swiper :lunbotuList="lunbotuList"></swiper>
        <!--  九宫格到六宫格改造工程  -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                <span class="mui-icon mui-icon-home"></span>
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                <span class="mui-icon mui-icon-chatbubble"></span>
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-location"></span>
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-search"></span>
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-phone"></span>
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui'
    import swiper from '../subcomponents/swiper.vue'
    export default {
        data(){
            return{
                lunbotuList : [] // 保存轮播图的数组
            }
        },
        created(){
            // 获取轮播图数据的 API 不可用
          this.getLunbotu();
        },
        methods:{
            getLunbotu(){ //获取轮播图数据的方法
                this.$http.get('static/Lunbotu.json').then(result => {
                    // console.log(result.body)
                    if(result.body.status === 0){
                        this.lunbotuList = result.body.message
                    }else{
                        Toast({
                            message: '加载数据失败',
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                },reason => {
                    alert('获取数据失败！')
                })
            }
        },
        components : {
            swiper
        }
    }
</script>

<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border: 0;
        .mui-media-body{
            font-size: 13px;
        }
    }
    .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3{
        border: 0;
    }
</style>