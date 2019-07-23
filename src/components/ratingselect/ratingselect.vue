<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block">{{desc.all}}<span class="count"></span></span>
            <span class="block">{{desc.positive}}<span class="count"></span></span>
            <span class="block">{{desc.negative}}<span class="count"></span></span>
        </div>
        <div class="switch">
            <span class="iconfont">&#xe7e2;</span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            desc:{
                type:Object,
                default() {
                    return {
                        all:'全部',
                        positive:'满意',
                        negative:'不满意',
                    }
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
.ratingselect
    .rating-type
        padding 18px 0
        margin 0 18px
        font-size 0
        border-bottom 1px solid rgba(7,17,27,.1)
        .block  
            margin-right 8px
            line-height 16px
            display inline-block
            padding 8px 12px
            font-size 12px 
            color #fff;
            background #ccc
            &.positive
                background rgba(0,160,220,.2)
            &.negative
                background rgba(77,85,93,.2)
            &.positive.active
                background #00a0dc
            &.negative.active
                background #4d555d
.switch
    padding 18px
    border-bottom 1px solid rgba(7,17,27,.1)
    color #93999f
    &.on
        .iconfont 
            color #00c850
    .text
        font-size 12px
        color rgb(147,153,159)

</style>