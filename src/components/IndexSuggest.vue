<template>
  <ul class="main">
    <li key=0 :id="getID(0)" :class="(focus.areaID===areaID&&focus.nowID==0)?'active':''">
      <template v-for="(item, index) in runArr">
        <img class="recom-img" :src="getPic(item.content)" :key="index" v-if="picID==index">
      </template>
    </li>
    <template v-for="(item, index) in suggestArr">
      <li :key="index" :id="getID(index)" v-if="index>0" :class="(focus.areaID===areaID&&focus.nowID==index)?'active':''">
        <img class="recom-img" :src="getPic(item.contents[0].content)">
        <span :id="'listName'+(index+1)" class="title"></span>
      </li>
    </template>
  </ul>
</template>

<script>
import { getBaseImgUrl } from '@/utils/index'
import { mapState } from 'vuex'

var turnPicTimer

export default {
  name: 'IndexSuggest',
  props: {
    suggestArr: {
      type: Array,
      default: () => []
    },
    areaID: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      runArr: [],
      picID: 0
    }
  },
  computed: {
    ...mapState(['focus'])
  },
  watch: {
    suggestArr: function (val, oldVal) {
      if (this.runArr.length > 0) return
      this.runArr = val[0].contents
      turnPicTimer = setTimeout(this.turnPic, 3000)
    },
    movePic: function (val, oldVal) {
      this.runPic = this.getPic(val)
    }
  },
  methods: {
    turnPic: function () {
      turnPicTimer = setTimeout(this.turnPic, 3000)
      this.picID++
      if (this.picID > this.runArr.length - 1) {
        this.picID = 0
      }
    },
    getID: function (id) {
      return 'list' + id
    },
    getPic: function (url) {
      return getBaseImgUrl(url)
    }
  },
  beforeDestroy () {
    // clearTimeout(turnPicTimer);
  }
}
</script>

<style lang="less" scoped>
@borderRadius:5px;
@listHei:179px;
.main{width:1280px;height:440px;position:relative;margin-top: 10px;}
.main li{position:absolute;border: 4px solid transparent}
.main #list0.active{transform-origin:center bottom;transform:scale(1);-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1)}
.main li.active{transform-origin:center bottom;transform:scale(1.05);-ms-transform:scale(1.05);-moz-transform:scale(1.05);-webkit-transform:scale(1.05);z-index:99;border-color:#01e3fb;box-shadow:#01e3fb 0 0 30px 5px;border-radius:@borderRadius}
.main li span{display:none;position:absolute;bottom:0;left:0;width:100%;height:30px;line-height:30px;color:#fff;font-size:15px;text-align:center;background:#07a1ff;overflow:hidden}
.main li.active span{z-index:10;border:1px solid #07a1ff;box-sizing:border-box}
#list0{width:685px;height:440px;left:70px}
#list1{width:440px;height:252px;left:765px}
#list2{left:765px;width:440px;height:@listHei;top:261px}
#list3{left:915px;width:140px;height:@listHei;top:261px}
#list4{left:1065px;width:140px;height:@listHei;top:261px}
#list0 .recom-img{width:685px;height:440px;border-radius:@borderRadius}
.recom-video{width:685px;height:440px;border-radius:@borderRadius}
.play-img{position:absolute;z-index:5;left:295px;top:175px}
#list1 .recom-img{width:440px;height:252px;border-radius:@borderRadius}
#list2 .recom-img{width:440px;height:@listHei;border-radius:@borderRadius}
#list3 .recom-img{width:140px;height:@listHei;border-radius:@borderRadius}
#list4 .recom-img{width:140px;height:@listHei;border-radius:@borderRadius}
</style>
