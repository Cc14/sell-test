<template>
    <div class="food">
        <div class="food-content">
            <div class="image-header">
                <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750" alt="">
                <div class="back">
                    <i class="iconfont"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            food:Object
        }
    }
</script>

<style lang="stylus" scoped>
.food
    position fixed
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    .food-content
        .image-header
            position relative
            img 
                position absolute
                width 100%
</style>