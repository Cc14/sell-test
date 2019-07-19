<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li class="menu-item" ref="menuList" v-for="(item, index) in goods" :class="{'active':currentIndex==index}" :key="index" @click="selectMenu(index,$event)">
                    <span class="text">
                        <span class="icon"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list" v-for="(item, index) in goods" :key="index" ref="foodList">
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
                goods: [],
                listHeight:[],
                scrollY:0
            }
        },
        computed:{
            currentIndex() {//计算左侧菜单当前滚动位置
                for(let i=0;i<this.listHeight.length;i++){
                    let height1= this.listHeight[i]
                    let height2=this.listHeight[i+1]
                    if(!height2 || this.scrollY >= height1 && this.scrollY<=height2){
                        this._fllowScroll(i)
                        return i
                    }
                }
                return 0
            }
        },
        methods:{
            _initScroll() {//初始化scroll
              this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                  click:true
              })
              this.foodScroll = new BScroll(this.$refs.foodsWrapper,{
                  click:true,
                  probeType:3  
              })
              this.foodScroll.on('scroll',(pos)=>{
                  if(pos.y<=0){
                      this.scrollY = Math.abs(Math.round(pos.y))
                  }
              })
            },
            _caculateHeight() { //计算高度
                let foodList=this.$refs.foodList
                let height = 0;
                this.listHeight.push(height)
                for(let i=0;i<foodList.length;i++){
                    height+=foodList[i].clientHeight
                    this.listHeight.push(height)
                }
                console.log(this.listHeight)
            },
            _fllowScroll(index){//根据index判断左侧菜单的滚动位置
                let muneList = this.$refs.menuList
                let el = this.$refs.menuList[index]
                this.menuScroll.scrollToElement(el,300)
            },
            selectMenu(index, event) { //点击左侧菜单，右侧商品的滚动位置
                console.log(index)
                if(!event._constructed){//better-scroll的参数click为true时，会派发给event参数一个私有属性_constructed
                    return 
                }      
                let foodList = this.$refs.foodList
                let el=foodList[index]
                this.foodScroll.scrollToElement(el,300)
                
            },

        },
        created() {
             this.$http.get("/api/goods").then(response => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    console.log(this.goods)
                    this.$nextTick(()=>{//确保DOM已经渲染
                        this._initScroll()
                        this._caculateHeight()
                    })  
                }
                });
            
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
        flex 0 0 80px
        width 80px
        background #f3f5f7
        .menu-item
            padding 0 12px
            display table
            width 56px
            text-align center
            height 54px
            font-size 12px
            color rgb(77,85,93)
            line-height 14px
            &.active
                background #fff
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
                    height 1em
                    line-height 1em
                    overflow hidden
                    text-overflow ellipsis
                .extra
                    font-size 10px
                    color rgb(147,153,159)
                    line-height 10px
                    .count
                        margin-right 12px


            
</style>