<template>
  <div class="Test">
    <h1>This is an test page</h1>
    <span>{{ '我的id是：'+id }}</span>
  </div>
</template>

<script>
export default {
  // 动态路由应用
  computed: {
    id: function () {
      return this.$route.params.id
    }
  },
  created () {
    console.log(this.$route) // 当前子页面路由信息
    console.log(this.$router) // 全局路由信息
  }
}
</script>
