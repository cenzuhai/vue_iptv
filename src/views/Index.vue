<template>
  <div>
    <Bg />
    <IndexHead :marquee="marquee" />
    <IndexNav :navArr="navArr" />
    <IndexSuggest :suggestArr="suggestArr" />
    <Notice />
  </div>
</template>

<script>
// @ is an alias to /src
import Bg from '@/components/Bg'
import IndexHead from '@/components/IndexHead.vue'
import IndexNav from '@/components/IndexNav.vue'
import IndexSuggest from '@/components/IndexSuggest.vue'
import Notice from '@/components/Notice.vue'
import { fetchIndex, fetchTime } from '@/api/all'
import { getBaseImgUrl } from '@/utils/index'
import store from '@/store'
import { mapState } from 'vuex'
import { KeyObj } from '@/utils/key'

// areaID,nowID，保存焦点，跳转页面时记录焦点，激活页面时还原焦点
var focusArr = [0, 0]

export default {
  name: 'Index',
  components: {
    Bg,
    IndexHead,
    IndexNav,
    IndexSuggest,
    Notice
  },
  data () {
    return {
      // areaID,nowID，保存焦点，跳转页面时记录焦点，激活页面时还原焦点
      focusArr: [0, 0],
      navArr: [],
      marquee: '',
      logo: '',
      suggestArr: []
    }
  },
  computed: {
    ...mapState(['focus'])
  },
  created () {
    window.focus()
    this.init()
    fetchIndex({ platform: 'zx' }).then(rs => {
      var pageBlockMap = rs.datas[0].pageBlockMap
      this.marquee = '1111111111111111'
      for (var name in pageBlockMap) {
        if (name == 'category') {
          this.navArr = rs.datas[0].pageBlockMap.category
          var navList = ''
          var id = 0
          this.navArr.map(obj => {
            var imgUrl = obj.contents[0].content
            if (!imgUrl || imgUrl.indexOf('/') < 0) {
              imgUrl = obj.contents[1].content
            }
            obj.contents[0].content = getBaseImgUrl(imgUrl)
            obj.id = this.getliID(id)
            id++
            return obj
          })
        } else if (name == 'statusBar') {
          if (rs.datas[0].pageBlockMap.statusBar[0].contents) {
            var imgUrl = rs.datas[0].pageBlockMap.statusBar[0].contents[0].content
            this.logo = getBaseImgUrl(imgUrl)
          }
        } else if (name == 'pageBackground') {
          var imgUrl = rs.datas[0].pageBlockMap.pageBackground[0].contents[0].content
          store.commit('setBgImg', getBaseImgUrl(imgUrl))
        } else if (name == 'suggest') {
          this.suggestArr = rs.datas[0].pageBlockMap.suggest
        } else if (name == 'marquee') {
          this.marquee = rs.datas[0].pageBlockMap.marquee[0].contents[0].content
        }
      }
    })
  },
  methods: {
    getliID (id) {
      return 'navList' + id
    },
    setFocus (arr) {
      this.focusArr = arr
      store.commit('setFocus', arr)
    },
    init () {
      this.setFocus(this.focusArr)
      KeyObj.toLeft = () => {
        if (this.focus.areaID === 0) {
          if (this.focus.nowID > 0) {
            this.setFocus([0, this.focus.nowID - 1])
          }
        } else {
          this.setFocus([1, 0])
        }
      }
      KeyObj.toRight = () => {
        if (this.focus.areaID === 0) {
          if (this.focus.nowID < this.navArr.length - 1) {
            this.setFocus([0, this.focus.nowID + 1])
          }
        } else {
          this.setFocus([1, 1])
        }
      },
      KeyObj.toUp = () => {
        if (this.focus.areaID === 1) {
          if (this.focus.nowID !== 2) {
            this.setFocus([0, 0])
          } else {
            this.setFocus([1, this.focus.nowID - 1])
          }
        }
      },
      KeyObj.toDown = () => {
        if (this.focus.areaID === 0) {
          this.setFocus([1, 0])
        } else {
          if (this.focus.nowID === 1) {
            this.setFocus([1, 2])
          }
        }
      },
      KeyObj.toOK = () => {
        this.$router.push({ path: '/lvyou' })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      /// vue全部初始化完毕
    })
  },
  activated () {
    this.init()
  },
  beforeDestroy () {

  }
}
</script>
<style scoped>
.head{width:1280px;height:80px;line-height:100px;position: relative;}
.nav{width:1250px;height:140px;margin-left:63px;margin-top:30px;position:relative}
</style>
