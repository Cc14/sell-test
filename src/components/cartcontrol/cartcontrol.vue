<template>
    <div class="cartcontrol-wrapper">
        <div class="cartcontrol">
            <div class="cart-decrease">
                <span class="inner iconfont">&#xe7df;</span>
            </div>
            <div class="cart-count">3</div>
            <div class="cart-add iconfont">&#xe7e0;</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            food:Object
        }
    }
</script>

<style lang="stylus" scoped>
.cartcontrol
    display inline-block
    font-size 0
    .cart-decrease, .cart-add
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
    .cart-count
        display inline-block
        line-height 24px
        width 24px
        text-align center
        font-size 10px
        color rgb(147,153,159)
        vertical-align top
</style>