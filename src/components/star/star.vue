<template>
    <div class="star" :class="starType">
        <span></span>
    </div>
</template>

<script>
    const LEN = 5
    const CLS_ON = 'on' 
    const CLS_HALF = 'half' 
    const CLS_OFF = 'off' 
    export default {
        props : {
            score : Number
        },
        computed:{
            itemClasses() {
                let result = []
                //判断整星，半星，灰星的数量
                let score = Math.floor(this.score*2) / 2;
                let integer = Math.floor(score)
                let isHalf = score % 1 == 0
                for(i=0;i<integer;i++){
                    result.push('on')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>