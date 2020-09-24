<template>
  <ul class="nav"><li v-for="(item, index) in navArr" :key="index" :id="item.id" :class="(focus.areaID===areaID&&focus.nowID==index)?'active':''"><div class='nav-two'><img class='nav-img' :src="item.contents[0].content"><p class='nav-name'>{{item.name}}</p></div></li></ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    navArr: {
      type: Array,
      default: () => []
    },
    areaID: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  computed: {
    ...mapState(['focus'])
  },
  methods: {

  }
}
</script>

<style scoped>
.nav li{position:absolute;width: 110px;height: 140px;margin-left:10px;background-repeat: no-repeat;background-position: center center;background-size: 100% 100%;}
.nav li.active{background-image: url(../assets/nav-focus.png);}
#navList1{left:127px}
#navList2{left:254px}
#navList3{left:381px}
#navList4{left:508px}
#navList5{left:635px}
#navList6{left:762px}
#navList7{left:889px}
#navList8{left:1016px}
#navList9{left:1143px}
.nav-two{position:absolute;width: 110px;height: 140px;text-align:center;font-size:21px}
.nav-img{vertical-align:middle;margin-top:44px;width:80px;}
.nav-name{height:50px;line-height:50px;display: none;}
</style>
