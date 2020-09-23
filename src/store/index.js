import Vue from 'vue'
import Vuex from 'vuex'
import { urlParams } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgImg: '',
    stbId: urlParams().stbId,
    yearTxt: '',
    weekTxt: '',
    timeTxt: '',

    focus: {
      areaID: 0,
      nowID: 0
    }
  },
  mutations: {
    setBgImg (state, url) {
      state.bgImg = url
    },
    setYearTxt (state, yt) {
      state.yearTxt = yt
    },
    setWeekTxt (state, wt) {
      state.weekTxt = wt
    },
    setTimeTxt (state, tt) {
      state.timeTxt = tt
    },
    setFocus (state, arr) {
      state.focus.areaID = arr[0]
      state.focus.nowID = arr[1]
    }
  },
  actions: {
  },
  getters: {

  },
  modules: {

  }
})
