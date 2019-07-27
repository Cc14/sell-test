<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="iconfont">&#xe705;</i>
                    </div>
                </div>
                <div class="price">￥0元</div>
                <div class="desc">另需配送飞￥4元</div>
            </div>
            <div class="content-right">
                <div class="pay">
                    ￥20元起送
                </div>
            </div>
        </div>
        <div class="shopcart-list">
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
        </div>
    </div>
</template>

<script>
import cartControl from '../cartcontrol/cartcontrol'
    export default {
        components:{
            cartControl
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
        display flex
        background #141d27
        .content-left
            flex 1
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
                    .iconfont
                        line-height 24px
                        font-size 24px
                        color rgba(255,255,255,.4)
            .price
                margin-right 12px
                padding-right 12px
                display inline-block
                font-size 16px
                color rgba(255,255,255,.4)
                font-weight 700
                line-height 24px
                border-right 1px solid rgba(255,255,255,.1)
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
    .shopcart-list
        position absolute
        left 0
        top 0
        width 100%
        background #fff
        transform translate3d(0,-100%,0)
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