<template>
    <div class="seller" ref="seller">
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
            <div class="favorite">
                <span class="iconfont icon-heart-fill"></span>
                <span class="text">收藏</span>
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
                    <span class="icon"></span>
                    <span class="text">{{item.description}}</span>
                </li>
            </ul>
        </div>
        <split></split>
        <div class="pics">
            <h1 class="title">商家实景</h1>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import star from '../star/star';
    import split from '../split/split';
    export default {
        name:'seller',
        props: {
            seller: Object,
            text:String
        },
        
        components:{
            star,
            split
        },
        methods: {
            _initScroll(){
                console.log(this.$refs.seller)
                this.scroll = new BScroll(this.$refs.seller,{
                    click:true
                })
            }
        },
        created() {     
            this.classMap=['decrease','discount','guarantee','invoice','special']
        },
        mounted() {
            this.$nextTick(()=>{
                this._initScroll()
            })
        }
    }
</script>

<style lang="stylus" scoped>
.overview {
    padding: 18px;
    position: relative;
    overflow hidden
    .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .desc {
        margin-bottom: 18px;
        padding-bottom: 18px;

        &.border-1px {
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }

        .star {
            display: inline-block;
            vertical-align: top;
        }

        .text {
            line-height: 18px;
            font-size: 10px;
            color: rgb(77, 85, 93);

            &:nth-of-type(1) {
                margin-right: 10px;
            }
        }
    }

    .remark {
        display: flex;

        .block {
            flex: 1;
            text-align: center;
            border-right: 1px solid rgba(7, 17, 27, 0.1);

            &:last-child {
                border-right: 0;
            }

            h2 {
                margin-bottom: 4px;
                line-height: 10px;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }

            .stress {
                font-size: 24px;
                font-weight: 200;
                color: rgb(7, 17, 27);
                line-height: 24px;

                .text {
                    font-size: 10px;
                }
            }
        }
    }

    .favorite {
        position: absolute;
        top: 18px;
        right: 18px;

        .iconfont {
            display: block;
            margin-bottom: 4px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(147, 153, 159);
        }

        .text {
            line-height: 10px;
            font-size: 10px;
            color: rgb(77, 85, 93);
        }
    }
}

.bulletin {
    padding: 18px 18px 0;

    .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .content-wrap {
        padding: 0 12px 16px 12px;

        &.border-1px {
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }

        .content {
            line-height: 24px;
            font-size: 12px;
            color: rgb(240, 20, 20);
        }
    }

    .supports {
        .support-item {
            padding: 16px 12px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);

            .text {
                line-height: 16px;
                font-size: 12px;
                color: rgb(7, 17, 27);
            }
        }
    }
}
</style>