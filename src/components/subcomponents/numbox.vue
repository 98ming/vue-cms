<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1"  @change="countChange" ref="num"/>
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
                // 每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
                // console.log(this.$refs.num.value)
                this.$emit('getcount',parseInt(this.$refs.num.value))
            }
        }
    }
</script>
<style></style>