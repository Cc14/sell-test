<template>
    <div class="cartcontrol-wrapper">
        <div class="cartcontrol">
            <transition name="move">
                <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                    <span class="inner iconfont">&#xe7df;</span>
                </div>
            </transition>
            <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
            <div class="cart-add iconfont" @click.stop.prevent="addCart">&#xe7e0;</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        props:{
            food:Object
        },
        methods:{
            addCart(event) {
                if(!event._constructed){
                    return 
                }               
                if(!this.food.count){
                    Vue.set(this.food,'count',1)
                }else{
                    this.food.count++
                }
                this.$emit('cartAdd',event.target)
            },
            decreaseCart(event) {
                if(this.food.count){   
                    this.food.count--
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

.cartcontrol
    display inline-block
    font-size 0
    .cart-decrease
        display inline-block
        font-size 0
        .inner
            display inline-block
            line-height 24px 
            font-size 24px
            color rgb(0,160,220)
            transition all .5s linear
        &.move-enter-active,&.move-leave-active
            transition all .5s linear
        &.move-enter, &.move-leave-to
            opacity 0
            .inner
                transform rotate(45deg)
                transform translate3d(24px, 0, 0)
    .cart-count
        display inline-block
        line-height 24px
        width 24px
        text-align center
        font-size 10px
        color rgb(147,153,159)
        vertical-align top
    .cart-add
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
</style>