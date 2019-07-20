<template>
    <div class="food" v-show="foodFlag" ref="foodWrap">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="foodHide">
                    <i class="iconfont">&#xe84f;</i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now"><span class="now-icon">￥</span>{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice"><span class="old-icon">￥</span>{{food.oldPrice}}</span>
                </div>
                <div class="buy">加入购物车</div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商品信息</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
                <h1 class="title">商品评价</h1>
                
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import split from '../split/split'
    export default {
        props:{
            food:Object
        },
        data() {
            return {
                foodFlag: false
            }
        },
        components:{
            split
        },
        methods:{
            foodHide() {
                this.foodFlag = false
            },
            foodShow() {
                this.foodFlag = true
                this.$nextTick(()=>{
                    let foodScroll = new BScroll(this.$refs.foodWrap,{
                        click:true
                    })
                })
                
            }
        }
    }
</script>

<style lang="stylus" scoped>
.food
    position fixed
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    .food-content
        .image-header
            position relative
            padding-top 100%
            width 100%
            img 
                position absolute
                top 0
                left 0
                width 100%
                height 100%
            .back
                position absolute
                top 0
                left 0
                padding 10px     
                z-index 2
                .iconfont
                    font-size 20px
                    color #fff
        .content
            padding 18px
            position relative
            .title
                margin-bottom 8px
                line-height 14px
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
            .detail
                margin-bottom 18px
                line-height 10px
                font-size 10px
                color rgb(147,155,159)
                .sell-count
                    margin-right 12px
            .price
                .now
                    line-height 24px
                    font-size 14px
                    font-weight 700
                    color rgb(240,20,20)
                    .now-icon
                        font-size 10px
                        font-weight normal
                .old
                    line-height 24px
                    font-size 10px
                    font-weight 700
                    color rgb(147,153,159)
                    .old-icon
                        font-weight normal
            .buy
                position absolute
                bottom 18px
                right 18px
                line-height 24px
                width 74px
                height 24px
                border-radius 12px
                background rgb(0,160,220)
                font-size 10px
                color rgb(255,255,255)
                text-align center
        .info
            padding 18px
            .title
                margin-bottom 6px
                line-height 14px
                font-size 14px
                color rgb(7,17,27)
            .text
                line-height 24px
                font-size 12px
                font-weight 200
                color rgb(77,85,93)
        .rating
            padding 18px
            .title
                margin-bottom 6px
                line-height 14px
                font-size 14px
                color rgb(7,17,27)

                    

                    
                
</style>