<template>
  <div class="head">
    <img class="logo" id="logo" src="../assets/logo.png">
    <marquee class="roll">{{marquee}}</marquee>
    <div class="right">
        <span></span>
        <span>{{weather.qlty}}</span>
        <span><img class="weat-img" :src="weather.url"></span>
        <span>{{weather.temLow+"-"+weather.temhigh+"℃"}}</span>
        <span>{{$store.state.yearTxt}}</span>
        <span>{{$store.state.weekTxt}}</span>
        <span>{{$store.state.timeTxt}}</span>
        <img class="logo1" id="logo1" src="../assets/logo1.png">
    </div>
  </div>
</template>

<script>
import { fetchTime, fetchWeather } from '@/api/all'
import { parseTime } from '@/utils/index'
export default {
  name: 'IndexHead',
  props: {
    marquee: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      weather: {}
    }
  },
  created () {
    fetchTime().then(rs => {
      parseTime(rs.time)
    })
    fetchWeather().then(rs => {
      this.weather = rs.datas[0]
    })
  },
  activated () {

  }
}
</script>

<style lang="less" scoped>
.logo{float:left;width: 220px;margin-top: 36px;margin-left:70px}
.logo1{width: 125px;margin-left: 10px;}
.roll{float:left;width:360px;font-size:24px;margin-left:20px}
.right{
  float:right;margin-right:66px;font-size:20px;
  span{margin-left:5px}
}
.weat-img{width:25px;vertical-align:middle}
</style>
