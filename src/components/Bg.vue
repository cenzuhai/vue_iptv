<template>
  <img class="bg" :src="$store.state.bgImg">
</template>

<script>
export default {
  name: 'Bg'
}
</script>

<style scoped>
.bg{width: 1280px;height: 720px;position: absolute;top:0;left: 0;}
</style>
