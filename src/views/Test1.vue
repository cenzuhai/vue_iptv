<template>
  <div class="Test1">
    <h1>This is an {{ name }} page</h1>
    <span>{{ '我的id是：'+id }}</span>
    <router-link to="/test1/222/profile">
      Test
    </router-link> |
    <router-link to="/test1/5555/posts">
      Test1
    </router-link>
      <div class="content"><transition name="fade"><router-view /></transition></div>
  </div>
</template>

<script>
export default {
  // 动态路由应用
  computed: {
    id: function () {
      return this.$route.params.id
    },
    name: function () {
      return this.$route.params.name
    }
  },
  created () {
    console.log(this.$route) // 当前子页面路由信息
    console.log(this.$router) // 全局路由信息
  }
}
</script>
<style>
.content{position: relative;}
.about{position: absolute;}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
