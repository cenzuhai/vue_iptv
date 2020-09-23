<template>
  <div class="affiche">
    <h1 class="affiche-h1">酒店公告</h1>
    <div class="affiche-title"></div>
    <span class="ensure">知道了</span>
  </div>
</template>

<script>
export default {
  name: 'Notice'
}
</script>

<style>
.affiche{display:none;width:640px;height:362px;position:fixed;z-index:99;left:50%;top:50%;margin-top:-180px;margin-left:-320px;background:rgba(7,161,255,.5);border:0 solid #15e8ff;border-radius:12px}
.affiche-h1{font-size:30px;margin-top:35px;padding:0 50px;height:60px}
.affiche-title{font-size:20px;line-height:35px;padding:0 50px 30px 50px}
.ensure{display:block;width:120px;height:45px;background:#00b5ea;border:1px solid #00d8ff;box-shadow:0 2px 4px 0 rgba(0,0,0,.5);border-radius:8px;line-height:45px;text-align:center;font-size:24px;margin-left:250px}
</style>
