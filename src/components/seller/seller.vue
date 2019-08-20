<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <star :score="seller.score" :num="36"></star>
                    <span class="text">({{seller.score}})</span>
                    <span class="text">月销售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}<span class="text">元</span></span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}<span class="text">元</span></span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均平送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}<span class="text">分钟</span></span>
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="iconfont icon-heart-fill" :class="{'active':this.favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrap border-1px">
                    <p class="content">
                        {{seller.bulletin}}
                    </p>
                </div>
                <ul class="supports">
                    <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pics-wrap" ref="picsWrap">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(item, index) in seller.pics" :key="index">
                            <img :src="item" alt="" width="100%" height="100%">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul class="info-content">
                    <li class="info-item" v-for="(item, index) in seller.infos" :key="index">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import star from '../star/star';
    import split from '../split/split';
    import {saveToLocal, loadFromLocal} from '@/common/js/store';
    export default {
        name:'seller',
        props: {
            seller: Object,
            text:String
        },
        data() {
            return {
                favorite: (()=>{
                    return loadFromLocal(this.seller.id,'favorite',false)
                })
            }
        },
        components:{
            star,
            split
        },
        computed:{
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏'
            }
        },
        methods: {
            _initScroll(){
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.seller,{
                        click:true
                    })
                }
                
                
            },
            _initPics() {
                    if(this.seller.pics){
                        let len = this.seller.pics.length
                        this.$refs.picList.style.width = 120*len+6*(len-1) + 'px'
                        this.$nextTick(()=>{
                            this.picsScroll = new BScroll(this.$refs.picsWrap,{
                                scrollX:true
                            })
                        })
                    }
                    
                
            },
            toggleFavorite(event) {
                if(!event._constructed){
                    return ;
                }
                this.favorite = ! this.favorite
                saveToLocal(this.seller.id,'favorite',this.favorite)
            }
        },
        watch: {
            seller(val) {//当前页面刷新执行watch ,从其他页面切换到当前页面执行mounted
                this._initScroll()
                this._initPics()
            }
        },
        created() {     
            this.classMap=['decrease','discount','guarantee','invoice','special']
        },
        mounted() {  
            this.$nextTick(()=>{ //页面刷新时seller还是空对象，所以要在watch里监听seller变化
                this._initScroll()
                this._initPics()
            })
        }
    }
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins"
.seller
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden 
    .overview
        padding: 18px;
        .title 
            margin-bottom: 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        .desc
            margin-bottom: 18px;
            padding-bottom: 18px;
            &.border-1px
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .star
                display: inline-block;
                vertical-align: top;
            .text
                line-height: 18px;
                font-size: 10px;
                color: rgb(77, 85, 93);
                &:nth-of-type(1)
                    margin-right: 10px;
        .remark
            display: flex;
            .block
                flex: 1;
                text-align: center;
                border-right: 1px solid rgba(7, 17, 27, 0.1);

                &:last-child
                    border-right: 0;
                h2
                    margin-bottom: 4px;
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                .stress
                    font-size: 24px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    line-height: 24px;
                    .text
                        font-size: 10px;
        .favorite
            position: absolute;
            top: 18px;
            right: 18px;
            width: 50px;
            text-align center
            .iconfont
                display: block;
                margin-bottom: 4px;
                line-height: 24px;
                font-size: 24px;
                color: rgb(147, 153, 159);
                &.active
                    color rgb(240,20,20)
            .text
                line-height: 10px;
                font-size: 10px;
                color: rgb(77, 85, 93);
    .bulletin
        padding: 18px 18px 0;
        .title
            margin-bottom: 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        .content-wrap
            padding: 0 12px 16px 12px;

            &.border-1px
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .content
                line-height: 24px;
                font-size: 12px;
                color: rgb(240, 20, 20);
                text-align justify
        .supports
            .support-item
                padding: 16px 12px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child
                    border-bottom 0
                .icon
                    position relative
                    top 4px
                    display inline-block
                    width 16px
                    height 16px
                    background-size 100%
                    vertical-align center
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')                
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')    
                .text
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
    .pics
        padding 18px 0 18px 18px
        .title
            margin-bottom: 12px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        .pics-wrap
            width 100%
            white-space nowrap
            .pic-list
                font-size 0
                .pic-item
                    margin-right 6px
                    display inline-block
                    width 120px
                    height 90px
                    &:last-child
                        margin-right 0
    .info
        padding 18px
        .title
            margin-bottom: 12px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        .info-content
            .info-item
                padding 16px 12px
                line-height 16px
                border-top 1px solid rgba(7,17,27,.1)
                font-size 12px
                color rgb(7,17,27)
</style>