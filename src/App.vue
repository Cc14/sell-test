<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" :seller="seller" :text="text">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" />
  </div>
</template>

<script>
import vHeader from "./components/header/header";

const ERR_OK = 0;
export default {
  name: "App",
  data() {
    return {
      seller: {},
      goods:{},
      text:'textaaaa'
    };
  },
  created() {
    this.$http.get("/api/seller").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
        console.log(this.seller)
      }
    });
   
  },
  components: {
    vHeader
  }
};
</script>

<style lang="stylus">
.router-link-active
  color rgb(240,20,20)
.tab
  display flex
  line-height 40px
  height 40px
  .tab-item
    flex 1
    text-align center
    font-size 14px
    color rgb(77,85,93)
</style>
