<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalPrice>0}">
                        <i class="iconfont">&#xe705;</i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
                <div class="desc">另需配送费￥4元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <!-- <div class="shopcart-list">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty">清空</span>
            </div>
            <div class="list-content">
                <ul>
                    <li class="food">
                        <span class="name">莲子核桃黑米粥</span>
                        <div class="price">￥<span class="text">10</span></div>
                        <cart-control></cart-control>
                    </li>
                    <li class="food">
                        <span class="name">莲子核桃黑米粥</span>
                        <div class="price">￥<span class="text">10</span></div>
                        <cart-control></cart-control>
                    </li>
                    <li class="food">
                        <span class="name">莲子核桃黑米粥</span>
                        <div class="price">￥<span class="text">10</span></div>
                        <cart-control></cart-control>
                    </li>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script>
import cartControl from '../cartcontrol/cartcontrol'
    export default {
        components:{
            cartControl
        },
        props:{
            selectFood:{
                type: Array,
                default(){
                    return [
                        {
                            price:30,
                            count:2
                        }
                    ]
                        
                }
            },
            minPrice:{
                type:Number,
                default:20
            }
            
        },
        computed:{
            totalPrice(){//商品总价格
                let total = 0
                this.selectFood.forEach((food)=>{
                    total = food.price * food.count
                })
                return total
            },
            totalCount(){//商品总数量
                let count = 0
                this.selectFood.forEach((food)=>{
                    count +=food.count
                })
                return count
            },
            payDesc() {//根据价格判断结算的内容
                if(this.totalPrice === 0){
                    return `￥${this.minPrice}起送`
                }else if(this.totalPrice < this.minPrice){
                    let diff = this.minPrice - this.totalPrice
                    return `还差￥${diff}元起送`
                }else{
                    return '去结算'
                }
                
            },
            payClass() { //判断结算的样式
                if(this.totalPrice < this.minPrice){
                    return 'not-enough'
                }else{
                    return 'enough'
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
.shopcart
    position fixed
    bottom 0
    left 0
    right 0
    width 100%
    height 48px
    z-index 99
    .content
        position absolute
        display flex
        width 100%
        z-index 3
        background #141d27
        .content-left
            flex 1
            font-size 0
            .logo-wrapper  
                position relative
                top -10px
                left 12px
                margin-right 12px
                display inline-block
                background #141d27
                padding 6px
                border-radius 50%
                .logo
                    width 44px
                    height 44px
                    line-height 44px
                    border-radius 50%
                    background rgba(255,255,255,.2)
                    text-align center
                    color rgba(255,255,255,.4)
                    &.highlight
                        background #00a0dc
                        color rgb(255,255,255)
                    .iconfont
                        line-height 24px
                        font-size 24px   
                        vertical-align middle
                .num
                    position absolute
                    top 0
                    right -6px
                    width 24px
                    height 16px
                    line-height 16px
                    border-radius 8px
                    font-size 9px
                    color rgb(255,255,255)
                    background rgb(240,20,20)
                    box-shadow 0px 2px 4px 0 rgba(0,0,0,.4)
                    text-align center

            .price
                margin-right 12px
                padding-right 12px
                display inline-block
                font-size 16px
                color rgba(255,255,255,.4)
                font-weight 700
                line-height 24px
                border-right 1px solid rgba(255,255,255,.1)
                &.highlight
                    color rgb(255,255,255)
            .desc
                display inline-block
                font-size 12px
                line-height 12px
                color rgba(255,255,255,.4)
        .content-right 
            flex 0 0 105px
            width 105px
            text-align center
            .pay
                height 48px
                line-height 48px
                font-size 12px
                color rgba(255,255,255,.4)
                font-weight 700
                background #2b333b
                &.not-enough
                    background #2b333b
                &.enough
                    background #00b43c
                    color #fff
    .shopcart-list
        position absolute
        left 0
        top 0
        width 100%
        background #fff
        transform translate3d(0,-100%,0)
        z-index 2
        .list-header
            padding 0 18px
            line-height 40px
            height 40px
            background #f3f5f7
            border-bottom 1px solid rgba(7,17,27,.1)
            .title
                line-height 40px
                float left
                font-size 14px
                color rgb(7,17,27)
            .empty
                float right 
                line-height 40px
                font-size 12px
                color rgb(0,160,200)
        .list-content   
            padding 0 18px 18px 18px
            background #ffffff
            .food
                position relative
                padding 12px 0
                border-bottom 1px solid rgba(7,17,27,.1)
                .name
                    line-height 24px
                    font-size 14px
                    color rgb(7,17,27)
                .price
                    position absolute
                    right 90px
                    bottom 12px
                    line-height 24px
                    font-size 10px
                    color rgb(240,20,20)
                    .text
                        font-size 14px
                        font-weight 700
                .cartcontrol-wrapper
                    position absolute
                    right 0
                    bottom 12px

        
</style>