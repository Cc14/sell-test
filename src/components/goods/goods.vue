<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li class="menu-item" v-for="(item, index) in goods" :key="index">
                    <span class="text">
                        <span class="icon"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list" v-for="(item, index) in goods" :key="index">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="(food, index) in item.foods" :key="index">
                            <div class="icon">
                                <img :src="food.image" alt="" width="100%" height="100%">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    const ERR_OK = 0
    import BScroll from 'better-scroll'
    export default {
        name:'goods',
        data() {
            return {
                goods: []
            }
        },
        methods:{
            _initScroll() {
                console.log(this.$refs.menuWrapper)
                //this.scroll = new BScroll(this.$refs.foodsWrapper)
            }
        },
        created() {
             this.$http.get("/api/goods").then(response => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    console.log(this.goods)   
                }
                });
            this._initScroll()
        }
    }
</script>

<style lang="stylus" scoped>
.goods
    position absolute
    display flex
    top 174px
    bottom 46px
    overflow hidden
    .menu-wrapper
        padding 0 12px
        flex 0 0 80px
        width 80px
        background #f3f5f7
        .menu-item
            display table
            width 100%
            text-align center
            height 54px
            font-size 12px
            color rgb(77,85,93)
            line-height 14px
            .text
                display table-cell
                vertical-align middle
                border-bottom 1px solid rgba(7,17,27,.1)
    .foods-wrapper
        .title
            padding-left 14px
            border-left 2px solid #d9dde1
            background #f3f5f7
            font-size 12px
            color rgb(147,153,159)
            line-height 26px  
        .food-item
            display flex
            margin 18px
            padding-bottom 18px
            .icon
                flex 0 0 57px
                margin-right 10px
            .content
                padding-top 2px
                .name
                    font-size 14px
                    color rgb(7,17,27)
                    line-height 14px
                .desc
                    margin 8px 0
                    font-size 10px
                    color rgb(147,153,159)
                    line-height 10px
                .extra
                    font-size 10px
                    color rgb(147,153,159)
                    line-height 10px
                    .count
                        margin-right 12px


            
</style>