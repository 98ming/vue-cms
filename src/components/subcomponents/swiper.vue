<template>
    <div>
        <mt-swipe :auto="4000">
            <!--  将来，谁使用此轮播图组件，谁为我们传递 lunbotuList -->
            <!--  此时，lunbotuList 应该是父组件向子组件传值来设置  -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.src" alt="">
            </mt-swipe-item>
            <!--<mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>-->
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        props : ['lunbotuList']
    }
</script>
<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            &:nth-child(1){
                background-color: red;
            }
            &:nth-child(2){
                background-color: blue;
            }
            &:nth-child(3){
                background-color: cyan;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>