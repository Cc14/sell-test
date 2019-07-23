<template>
    <div class="ratings">
        <div class="ragints-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wraper">
                        <span class="title">服务态度</span>
                        <star :score="seller.serviceScore" :num="36"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wraper">
                        <span class="title">服务态度</span>
                        <star :score="seller.foodScore" :num="36"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery">
                        <span class="title">送达时间</span>
                        <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect></ratingselect>
            <div class="ratings-wrap">
                <ul>
                    <li v-for="(rating, index) in ratings" :key="index" class="rating-item">
                        <div class="avatar">
                            <img :src="rating.avatar" alt="" width="28" height="28">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrap">
                                <star :score="rating.score" :num="24"></star>
                                <span class="delivery">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <div class="text">
                                {{rating.text}}
                            </div>
                            <div class="recommend" v-show="rating.recommend.length">
                                <span class="iconfont icon-thumb_up">&#xe65d;</span>
                                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import split from '../split/split';
    import star from '../star/star';
    import ratingselect from '../ratingselect/ratingselect';
    const ERR_OK = 0
    export default {
        name:'ratings',
        props:{
            seller: Object
        },
        data() {
            return {
                ratings: []
            }
        },
        components:{
            split,
            star,
            ratingselect
        },
        filters : {
            formatDate: function(date){
                    date=new Date(date)
                    let Y=date.getFullYear()
                    let M = date.getMonth() + 1
                    let d = date.getDate()
                    let h = date.getHours()
                    let m = date.getMinutes()
                    let s = date.getSeconds()

                return Y+'-'+M+'-'+d+' '+h+':'+m+':'+s
            }
        },
        created() {
            this.$http.get('/api/ratings').then((response)=>{
                response=response.body
                if (response.errno === ERR_OK) {
                    this.ratings = response.data;
                    console.log(this.ratings)
                }
            })
        }
    }
</script>

<style lang="stylus" scoped>
.overview
    display flex
    padding 16px 0
    .overview-left
        text-align center
        flex 0 0 120px
        width 120px
        .score
            line-height 28px
            font-size 20px 
            color rgb(255,153,0)
        .title
            margin 6px 0 8px 0
            line-height 12px
            font-size 12px 
            color rgb(7,17,27)
        .rank
            line-height 10px
            font-size 10px
            color rgb(7,17,27)
    .overview-right
        .score-wraper
            margin-bottom 8px
            .title
                line-height 18px
                font-size 12px 
                color rgb(7,17,27)
            .star
                display inline-block
                margin 0 10px
                vertical-align top 
            .score
                line-height 18px
                font-size 12px
                color rgb(255,153,0)
        .delivery
            .title
                line-height 18px
                font-size 12px 
                color rgb(7,17,27)
            .delivery-time
                margin 0 12px
                font-size 12px
                color rgb(147,153,159)
.ratings-wrap
    padding 0 18px
    .rating-item
        padding 18px 0
        display flex
        position relative
        .avatar
            flex 0 0 28px
            margin-right 12px
            width 28px
            img 
                border-radius 50%
                overflow hidden
        .content
            .name
                margin-bottom 4px
                line-height 12px
                font-size 10px
                color rgb(7,17,27)
            .star-wrap
                margin-bottom 6px
                .star
                    margin-right 6px
                    display inline-block
                    vertical-align top
                .delivery
                    line-height 12px
                    font-size 10px
                    color rgb(147,153,159)
            .text
                margin-bottom 8px
                line-height 18px
                font-size 12px
                color rgb(7,17,27)
            .recommend
                .iconfont
                    &.icon-thumb_up
                        color #00a0dc
                .item
                    padding 0 8px
                    margin-right 8px
                    margin-bottom 4px
                    display inline-block
                    border 1px solid rgba(7,17,27,.1)
                    border-radius 2px
                    background #fff
                    font-size 9px
                    line-height 16px
                    color rgb(147,153,159)
            .time
                position absolute 
                top 18px
                right 18px
                line-height 12px
                font-size 10px 
                color rgb(147,153,159)

                    


</style>