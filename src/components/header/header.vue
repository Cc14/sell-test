<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="this.seller.avatar" alt="" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{this.seller.name}}</span>
                </div>
                <div class="description">{{this.seller.description}}/{{this.seller.deliveryTime}}分钟送达</div>
                <div class="supports">
                    <span class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="supports-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="iconfont count-icon">&#xe6a4;</i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="iconfont bulletin-right-arrow">&#xe6a4;</i>
        </div>
        <div class="header-bg">
            <img :src="this.seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition>
            <div class="detail">

            </div>
        </transition>
    </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins.styl'
.header
    position relative
    overflow hidden
    background rgba(7,17,27,.5)
    color #fff
    .content-wrapper 
        position relative
        padding 24px  12px 18px 24px
        display flex
        .avatar
            margin 0 11px 0 0
        .content
            .title
                margin 2px 0 8px 0
                .brand
                    display inline-block
                    vertical-align middle
                    width 30px
                    height 18px
                    background-size 30px 18px
                    bg-image('brand')
                .name
                    font-size 16px
                    color rgb(255,255,255)
                    font-weight bold
                    line-height 18px
            .description
                margin-bottom 10px
                line-height 12px
                font-size 12px
                font-weight 200
                color rgb(255,255,255)
                text-align left
            .supports
                line-height 12px
                font-size 10px
                color rgb(255,255,255)
                text-align left
                .icon
                    display inline-block
                    vertical-align middle
                    width 12px
                    height 12px
                    background-size 12px 12px
                    bg-image('decrease_1')
        .supports-count
            position absolute
            bottom 18px
            right 12px
            padding 0 8px
            height 24px
            line-height 24px
            border-radius 12px
            text-align center
            background rgba(0,0,0,.2)
            .count
                font-size 10px
            .count-icon
                transform rotate(-90deg)
    .bulletin-wrapper
        position relative
        padding 0 22px 0 12px   
        background-color rgba(7,17,27,.2)
        height 28px
        ellipsis()
        .bulletin-title
            display inline-block     
            width 22px
            height 12px
            background-size 22px 12px
            vertical-align middle
            bg-image('bulletin')
        .bulletin-text
            padding 0 12px 0 2px
            font-size 10px
            line-height 28px
        .bulletin-right-arrow
            position absolute
            right 0
            top 6px
            transform rotate(-90deg)
            
    .header-bg
        position absolute 
        left 0
        top 0
        width 100%
        filter blur(10px)
        z-index -1
    .detail
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        width 100%
        height 100%
        background rgba(0,0,0,.7)
        z-index 100

</style>