<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount"  @change="countChange" ref="num"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>

    </div>
</template>
<script>
    import mui from '../../lib/mui/dist/js/mui.min.js'
    export default {
        mounted() {
            // 初始化数字选择框组件
            mui('.mui-numbox').numbox()
        },
        methods : {
            countChange(){
                console.log(this.$refs.num.value)
                this.$store.commit('updateGoodsInfo',{id : '1' , count : this.$refs.num.value})
            }
        },
        props: ['initcount']
    }
</script>
<style></style>