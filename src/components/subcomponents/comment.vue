<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论内容（最多评论120字）" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.username}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === 'undefined' ? '此用户很懒，嘛都没说':item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                pageIndex : 1, // 默认展示第一页数据
                comments : []
            }
        },
        created(){
            this.getComments();
        },
        methods:{
            getComments(){
                // this.$http.get('api/comments/' + this.id + '?pageIndex=' + this.pageIndex).then(result=>{
                this.$http.get('static/Comments.json').then(result=>{
                    if(result.body.status === 0){
                        // this.comments = result.body.message
                        // 每当获取新评论数据的时候，不要把老数据情况覆盖，而是应该以老数据，拼接上新数据
                        this.comments = this.comments.concat(result.body.message)
                    }else{
                        Toast('获取评论失败')
                    }
                })
            },
            getMore(){ // 加载更多
                this.pageIndex++
                this.getComments()
            }
        },
        props:['id']
    }
</script>
<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    background-color: #cccccc;
                    line-height: 30px;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>