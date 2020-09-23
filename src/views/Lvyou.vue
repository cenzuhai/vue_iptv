<template>
  <div>
    <Bg />
    <ul id="nav"><li v-for="(item, index) in navArr" :key="index" :class="[(focus.areaID===0&&focus.nowID==index)?'focus':'',(focus.areaID===1&&nowNavID===index)?'active':'']">{{item.name}}</li></ul>
    <div class="detail">
      <!-- 页面模板1 -->
      <div class="page" v-if="nowNavID===0">
        <div class="wNav">
          <div class="navArr upArr"></div>
          <div class="cityList">
            <ul class="wsubNav" id="wsubNav"><li v-for="(item, index) in weatherData" :key="index" :class="(focus.areaID===1&&focus.nowID==index)?'active':''">{{item.cityname}}</li></ul>
          </div>
          <div class="navArr downArr"></div>
        </div>
        <div class="weatherDetail">
          <div class="w_cont">
            <div class="w_bot">
              <p class="place" id="place">今天</p>
              <img class="w_img" id="w_img" :src="nowWeatherImg">
              <p class="w_imgAlt" id="w_imgAlt">{{nowWeather.stateDetailed}}</p>
            </div>
            <div class="bty"></div>
            <div class="w_top">
              <p class="w_city" id="w_city">{{nowWeather.cityname}}</p>
              <p class="du_Num" id="du_Num">{{nowWeather.temNow}}</p>
              <p class="w_intro" id="w_intro">空气质量：{{nowWeather.qlty|qltyFilter}}<span>PM2.5：{{nowWeather.pm25}}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="page" v-if="nowNavID===1">
        <ul class="timeList"><li v-for="(item, index) in cityTimeData" :key="index" :class="(focus.areaID===2&&focus.nowID==index)?'active':''"><p class="t_hour"><span>{{item.nowTime|timeFilter(0)}}</span><span>{{item.nowTime|timeFilter(1)}}</span><strong>:</strong><span>{{item.nowTime|timeFilter(3)}}</span><span>{{item.nowTime|timeFilter(4)}}</span></p><p class="t_place">{{item.cityName}}</p><p class="t_date">{{item.nowTime|cityTimeFilter}}</p></li></ul>
        <div class="scroll"><div id="rollLine" :style="{height:rollHei+'px'}"></div></div>
      </div>
      <div class="page" v-if="nowNavID===2">
        <div class="moneyCont">
          <div class="cn"><div class="cn_left"><img src="../assets/guoqi/flag_china.png"><p>100<span>(￥人民币)</span></p></div><div class="cn_right">今日外汇牌价(交易单位：1人民币/外币)</div></div>
          <ul class="foreign">
            <li v-for="(item, index) in worldMoneyData" :key="index" :class="{bg:(index%4===0||(index-1)%4===0)}"><img :src="item.currencyT|moneyFilter"><p class="guoqi_type">{{item.currencyT+"("+item.currencyT_Name+")"}}</p><p class="money">{{item.exchange}}</p></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Bg from '@/components/Bg'
import store from '@/store'
import { mapState } from 'vuex'
import { KeyObj } from '@/utils/key'
import { fetchAllWeather, fetchWorldTime, fetchExchange } from '@/api/all'
import { getBaseImgUrl } from '@/utils/index'

var cityWeather; var tqArr = []
var initNow = true

var cityInfor, max_wor
const moneyObj = { 美元: [require('../assets/guoqi/flag_USA.png'), 'USD'], 英镑: [require('../assets/guoqi/flag_UK.png'), 'GBR'], 韩元: [require('../assets/guoqi/flag_korea.png'), 'KRW'], 港币: [require('../assets/guoqi/flag_HK.png'), 'HKD'], 澳大利亚元: [require('../assets/guoqi/flag_Australia.png'), 'AUD'], 欧元: [require('../assets/guoqi/flag_EU.png'), 'EUR'], 日元: [require('../assets/guoqi/flag_Japan.png'), 'JPY'], 新加坡元: [require('../assets/guoqi/flag_singapore.png'), 'SGD'], 加拿大元: [require('../assets/guoqi/flag_canada.png'), 'CAD'], 泰国铢: [require('../assets/guoqi/flag_thailand.png'), 'THB'] }

export default {
  name: 'Lvyou',
  components: {
    Bg
  },
  props: {
    suggestArr: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    qltyFilter (qlty) {
      if (!qlty) {
        return '暂无数据'
      }
      return qlty
    },
    cityTimeFilter (time) {
      return time.split(' ')[0]
    },
    timeFilter (time, id) {
      var tt = time.split(' ')[1]
      return tt[id]
    },
    moneyFilter (moneyName) {
      return moneyObj[moneyName][0]
    }
  },
  data () {
    return {
      // areaID,nowID，保存焦点，跳转页面时记录焦点，激活页面时还原焦点
      focusArr: [0, 0],
      navArr: [
        {
          name: '全国天气'
        },
        {
          name: '世界时间'
        },
        {
          name: '全球汇率'
        }
      ],
      nowNavID: 0, // 当前导航id
      weatherData: [],
      nowWeather: {},

      rollHei: 0,
      cityTimeData: [],

      worldMoneyData: []
    }
  },
  computed: {
    ...mapState(['focus']),
    nowWeatherImg: function () {
      if (!this.nowWeather.url) {
        return ''
      }
      return getBaseImgUrl(this.nowWeather.url)
    }
  },
  watch: {
    weatherData: function (val, oldVal) {
      /// 第一次进来默认显示当前城市（沈阳），所以这里不能进行改变，当焦点按下后才开始改变
      if (!initNow) {
        this.nowWeather = val[this.focus.nowID]
      }
    }
  },
  created () {
    fetchAllWeather().then(rs => {
      cityWeather = rs.datas
      for (var i = cityWeather.length - 1; i >= 0; i--) {
        if (cityWeather[i].defaultCity == cityWeather[i].cityname) {
          cityWeather.unshift(cityWeather.splice(i, 1)[0])
          break
        }
      }
      for (i = 4; i >= 0; i--) {
        this.weatherData.push(cityWeather[cityWeather.length - i - 1])
        tqArr.push(cityWeather.length - i - 1)
      }
      for (i = 0; i < 6; i++) {
        this.weatherData.push(cityWeather[i])
        tqArr.push(i)
      }
      this.nowWeather = cityWeather[0]
    })
    fetchWorldTime().then(rs => {
      cityInfor = rs.datas
      max_wor = Math.ceil(cityInfor.length / 6)
      this.rollHei = parseInt(496 / max_wor)
      this.showWorldTime()
    })
    fetchExchange().then(rs => {
      this.worldMoneyData = rs.datas
    })
    if (this.$router.history.current.meta) {

    }
  },
  methods: {
    setFocus (arr) {
      this.focusArr = arr
      store.commit('setFocus', arr)

      /// 保存当前导航navID
      if (arr[0] === 0) {
        this.nowNavID = arr[1]
      }
    },
    showWorldTime () {
      var startID = 0 * 6
      var endID = startID + 6
      this.cityTimeData = cityInfor.slice(startID, endID)
    },
    init () {
      this.setFocus([0, 0])
      KeyObj.toLeft = () => {
        if (this.focus.areaID === 0) {
          if (this.focus.nowID > 0) {
            this.setFocus([0, this.focus.nowID - 1])
          }
        } else if (this.focus.areaID === 1) {
          if (this.focus.nowID > 0) {
            this.weatherData = []
            for (var i = 0; i < tqArr.length; i++) {
              tqArr[i] = (parseInt(tqArr[i]) - 1)
              if (tqArr[i] < 0) {
                tqArr[i] = cityWeather.length - 1
              }
              this.weatherData.push(cityWeather[tqArr[i]])
            }
            // this.setFocus([1,this.focus.nowID-1]);
          }
        } else if (this.focus.areaID === 2) {
          if (this.focus.nowID > 0) {
            this.setFocus([2, this.focus.nowID - 1])
          }
        }
      }
      KeyObj.toRight = () => {
        if (this.focus.areaID === 0) {
          if (this.focus.nowID < this.navArr.length - 1) {
            this.setFocus([0, this.focus.nowID + 1])
          }
        } else if (this.focus.areaID === 1) {
          if (this.focus.nowID < this.weatherData.length - 1) {
            this.weatherData = []
            for (var i = 0; i < tqArr.length; i++) {
              tqArr[i] = (parseInt(tqArr[i]) + 1) % cityWeather.length
              this.weatherData.push(cityWeather[tqArr[i]])
            }
            // this.setFocus([1,this.focus.nowID+1]);
          }
        } else if (this.focus.areaID === 2) {
          if (this.focus.nowID < this.cityTimeData.length - 1) {
            this.setFocus([2, this.focus.nowID + 1])
          }
        }
      },
      KeyObj.toUp = () => {
        if (this.focus.areaID === 1) {
          this.setFocus([0, 0])
        } else if (this.focus.areaID === 2) {
          if (this.focus.nowID <= 2) {
            this.setFocus([0, 1])
          } else {
            this.setFocus([2, this.focus.nowID - 3])
          }
        }
      },
      KeyObj.toDown = () => {
        if (this.focus.areaID === 0 && this.nowNavID === 0) {
          initNow = false
          this.setFocus([1, 5])
        } else if (this.focus.areaID === 0 && this.nowNavID === 1) {
          this.setFocus([2, 0])
        } else if (this.focus.areaID === 2) {
          if (this.focus.nowID < this.cityTimeData.length - 1 - 3) {
            this.setFocus([2, this.focus.nowID + 3])
          } else {
            this.setFocus([2, this.cityTimeData.length - 1])
          }
        }
      },
      KeyObj.toBack = () => {
        this.$router.push({ path: '/' })
      }
    }
  },
  activated () {
    this.init()
  }
}
</script>
<style scoped>
#nav{width:100%;font-size:24px;color:#fff;text-align:center;position: relative;}
#nav li{height:57px;padding:0 20px;padding-top:23px;display:inline-block;margin-right:10px;text-align:center;white-space: nowrap;margin-top: 8px;}
#nav li.active{color:#06A0FE}
#nav li.focus{background-image:url(../assets/meetBtn.png);background-size:100% 100%;border-radius:16px}
.page{width:1280px;height:632px;overflow:hidden;}
.wNav{position:absolute;left:0;top:586px;width:1280px;height:140px;background: rgba(0,0,0,0.4);}
.navArr{float:left;width:34px;height:50px;margin-top:47px;background-repeat:no-repeat;background-size:100% 100%}
.upArr{background-image:url(../assets/arr_Left.png)}
.downArr{background-image:url(../assets/arr_Right.png)}
.cityList{float:left;width:1210px;height:140px;overflow:hidden}
.wsubNav{width:1280px;height:70px;overflow:hidden;padding-top:40px;}
.wsubNav .active{background-image:url(../assets/meetBtn.png);background-size:100% 100%;border-radius:16px;transform:scale(1.1,1.1);-ms-transform:scale(1.1,1.1);-moz-transform:scale(1.1,1.1);-webkit-transform:scale(1.1,1.1);-o-transform:scale(1.1,1.1)}
.cityList li{font-size:26px;height:46px;line-height:42px;color:#FFF;text-align:center;padding:10px 30px;float:left}
.weatherDetail{width:1044px;height:438px;position:absolute;left:126px;top:114px;background-image:url(../assets/tqbg.png);background-repeat:no-repeat;background-size:100% 100%}
.weatherDetail .w_bot{width:439px;height:439px;color:#FFF;float:left}
.weatherDetail .w_bot .place{font-size:36px;height:51px;line-height:51px;margin-left:32px;margin-top:40px}
.weatherDetail .w_bot img{width:206px;margin-left:120px;margin-top:11px}
.w_imgAlt{height:46px;text-align:center;margin-top:12px;font-size:33px;line-height:46px;color:#fff}
.weatherDetail .bty{width:2px;height:321px;background:#FFF;float:left;margin-top:58px}
.weatherDetail .w_top{width:602px;height:439px;float:left;color:#FFF}
.weatherDetail .w_top .w_city{height:56px;font-size:40px;margin-left:113px;margin-top:111px}
.weatherDetail .w_top .du_Num{font-size:117px;margin-left:113px;min-height:80px}
.weatherDetail .w_top .w_intro{font-size:23px;margin-left:113px}
.weatherDetail .w_top .w_intro span{margin-left:46px}
.timeList{position:absolute;width:1210px;height:534px;left:35px;top:110px;padding-top:56px;background-image:url(../assets/sjbg.png);background-repeat:no-repeat;background-size:100% 100%;color:#FFF;overflow:hidden}
.timeList li{display:inline-block;margin-bottom:75px;margin-left:90px;color: #fff;}
.timeList li.active{color:#06A0FE}
.timeList p{text-align:center}
.timeList .t_hour{font-size:60px;padding:18px;background:rgba(255,255,255,.4);box-shadow:inset 0 1px 3px 0 rgba(0,0,0,.5);border-radius:6px}
.timeList .t_place{margin-top:13px;font-size:26px}
.timeList .t_date{margin-top:3px;font-size:20px}
.t_hour span{padding:4px 8px;background:url(../assets/timeBg.png) no-repeat 0 0;background-size:100% 100%;margin:0 2px;border-radius:4px}
.scroll{position:absolute;left:1210px;top:143px;width:10px;height:496px;background:rgba(0,0,0,.65);border-radius:16px}
#rollLine{width:10px;background:rgba(255,255,255,.8);border-radius:25px}
.moneyCont{position:absolute;width:1210px;height:590px;left:35px;top:110px;background-image:url(../assets/sjbg.png);background-repeat:no-repeat;background-size:100% 100%;color:#FFF}
.cn{width:1210px;height:117px;margin-top:20px;background:rgba(255,255,255,.2)}
.cn_left{margin-left:20px}
.cn_left>*{float:left}
.cn_left img{width:140px;display:block;margin-top:15px}
.cn_left p{font-size:50px;margin-left:10px;margin-top:15px}
.cn_left p span{font-size:32px;vertical-align:middle}
.cn_right{margin-right:20px;float:right;font-size:22px;margin-top:55px}
.foreign{margin-top:20px;width:1210px}
.foreign li{width:563px;padding:0 20px;height:86px;float: left;}
.foreign img{height:40px;margin:23px 12px;float:left}
.foreign p{font-size:24px;line-height:86px}
.foreign .guoqi_type{float:left}
.foreign .money{float:right}
.foreign_left{border-right:solid 1px rgba(255,255,255,.4)}
.foreign li.bg{background:rgba(255,255,255,.2)}
</style>
