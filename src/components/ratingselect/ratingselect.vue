<template>
    <div class="ratingselect" v-if="this.ratings">
        <div class="rating-type">
            <span class="block positive" @click="select(2)" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{this.ratings.length}}</span></span>
            <span class="block positive" @click="select(0)" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
            <span class="block negative" @click="select(1)" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent">
            <span class="iconfont" :class="{'on':onlyContent}">&#xe7e2;</span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const ALL = 2
    const POSITIVE = 0
    const NEGATIVE = 1
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
            },
            selectType:{
                type:Number
            },
            ratings:Array,
            onlyContent:Boolean,
        },
        computed:{
            positive() {
                return this.ratings.filter((rating)=>{
                    return rating.rateType === POSITIVE
                })
            },
            negative() {
                return this.ratings.filter((rating)=>{
                    return rating.rateType === NEGATIVE
                })
            }
        },
        methods:{
            select(type){
                this.$emit("select",type)
            },
            toggleContent() {
                this.$emit("toggle")
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
            color #555;
            background #ccc
            &.positive
                background rgba(0,160,220,.2)
            &.negative
                background rgba(77,85,93,.2)
            &.positive.active
                color #fff
                background #00a0dc
            &.negative.active
                color #fff
                background #4d555d
.switch
    padding 18px
    border-bottom 1px solid rgba(7,17,27,.1)   
    .iconfont
        color #93999f
        &.on 
            color #00c850
    .text
        font-size 12px
        color rgb(147,153,159)

</style>