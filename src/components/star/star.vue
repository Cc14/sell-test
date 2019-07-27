<template>
    <div class="star" :class="starType">
        <span class="star-item" v-for="(item, index) in itemClasses" :key="index" :class="itemClasses[index]"></span>
    </div>
</template>

<script>
    const LEN = 5
    const CLS_ON = 'on' 
    const CLS_HALF = 'half' 
    const CLS_OFF = 'off' 
    export default {
        props : {
            score : Number,
            num: Number
        },
        computed:{
            starType(){
                return 'star-'+this.num
            },
            itemClasses() {
                let result = []
                //判断整星，半星，灰星的数量
                let score = Math.floor(this.score*2) / 2;
                let integer = Math.floor(score)
                let isHalf = score % 1
                for(let i=0;i<integer;i++){
                    result.push('on')
                }
                if(isHalf){
                    result.push('half')
                }
                while(result.length<5){
                    result.push('off')
                }
                return result
            }
        }
    }
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins.styl'
.star-24
    .star-item
        display inline-block
        margin 0 2px
        width 12px
        height 11px
        background-size 12px 11px
        &.on
            bg-image('star24_on')
        &.half
            bg-image('star24_half')
        &.off
            bg-image('star24_off')
.star-36
    .star-item
        display inline-block
        margin 0 2px
        width 15px
        height 14px
        background-size 15px 14px
        &.on
            bg-image('star36_on')
        &.half
            bg-image('star36_half')
        &.off
            bg-image('star36_off')
.star-48
    .star-item
        display inline-block
        margin 0 5px
        width 40px
        height 38px
        background-size 40px 38px
        &.on
            bg-image('star48_on')
        &.half
            bg-image('star48_half')
        &.off
            bg-image('star48_off')

</style>