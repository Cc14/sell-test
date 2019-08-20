<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
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
        <div class="ball-container">
            <div v-for="(ball, index) in balls" :key="index">
                <transition 
                    name="drop"
                    @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop"
                >
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>    
                </transition>           
            </div>
        </div>
        <transition name="fold">      
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="(food,index) in selectFoods" :key="index">
                            <span class="name">{{food.name}}</span>
                            <div class="price">￥<span class="text">{{food.price}}</span></div>
                            <cart-control :food="food" @cartAdd="addFood"></cart-control>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import cartControl from '../cartcontrol/cartcontrol'
    export default {
        components:{
            cartControl
        },
        props:{
            selectFoods:{
                type: Array
            },
            minPrice:{
                type:Number,
                default:20
            }
            
        },
        data() {
            return {
                balls: [
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    }
                ],
                dropBalls:[],
                fold:false
            }
        },
        computed:{
            totalPrice(){//商品总价格
                let total = 0
                this.selectFoods.forEach((food)=>{
                    total += food.price * food.count
                })
                return total
            },
            totalCount(){//商品总数量
                let count = 0
                this.selectFoods.forEach((food)=>{
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
            },
            listShow(){
                if(!this.totalCount){
                    this.fold=true
                    return false
                }
                let show = !this.fold
                if(show){
                    this.$nextTick(()=>{
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.listContent,{
                                click:true
                            })
                        }else{
                            this.scroll.refresh()
                        }
                        
                    })
                }
                return show
            }
            
        },
        methods:{
            drop(el){//beforeEnter
               for(let i=0;i<this.balls.length;i++){
                   let ball = this.balls[i]
                   if(!ball.show){
                       ball.show=true
                       ball.el=el
                       this.dropBalls.push(ball)
                       return 
                   }
               }
            },
            beforeDrop(el,done){//Enter
                let count = this.balls.length
                while(count--){
                    let ball = this.balls[count]
                    if(ball.show){
                        let rect = ball.el.getBoundingClientRect()
                        let x=rect.left -32
                        let y=-(window.innerHeight - rect.top -36)
                        el.style.display=''
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`
                        el.style.transform = `translate3d(0,${y}px,0)`
                        let inner = el.getElementsByClassName('inner-hook')[0]
                        inner.style.webkitTransform=`translate3d(${x}px,0,0)`
                        inner.style.transform=`translate3d(${x}px,0,0)`
                    }
                }
            },
            dropping(el,done){//afterEnter
                let rf = el.offsetHeight
                this.$nextTick(()=>{
                    el.style.webkitTransform = 'translate3d(0,-10px,0)'
                    el.style.transform = 'translate3d(0,-10px,0)'
                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = 'translate3d(0,0,0)'
                    inner.style.transform = 'translate3d(0,0,0)'
                    el.addEventListener('transitionend',done)  //当动画结束，会有css3 transitionend 事件派发
                })
            },
            afterDrop(el){
                let ball = this.dropBalls.shift()  
                if(ball){
                    ball.show=false
                    el.style.display = 'none'
                }
            },
            toggleList(){
                if(!this.totalCount){
                    return ;
                }
                this.fold = !this.fold
            },
            empty() {
                this.selectFoods.forEach((food)=>{
                    food.count=0
                })
            },
            addFood(target){
                this.$emit('cartAdd',target)
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
    .ball-container
        .ball
            position fixed
            left 32px
            bottom 22px
            z-index 200
            .inner
                display inline-block
                width 16px
                height 16px
                border-radius 50%
                background rgb(0,160,220)
            &.drop-enter-active
                transition: all .5s cubic-bezier(.49, -0.29, .75, .41);
                .inner
                    transition all .5s linear
    .shopcart-list
        position absolute
        left 0
        top 0
        width 100%
        background #fff
        transform translate3d(0,-100%,0)
        z-index 2
        &.fold-enter-active,&.fold-leave-active
            transition all .3s
        &.fold-enter,&.fold-leave-to
            transform translate3d(0,0,0)
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
            max-height 217px
            height auto!important
            overflow hidden
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