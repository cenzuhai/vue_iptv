import store from '../store/index'
import { baseImg } from '../config.js'
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (timeObj) {
  var today, hour, second, minute, year, month, date, interval
  var systemDate

  var ssYear = timeObj.split('-')[0]
  var ssMonth = timeObj.split('-')[1]
  var ssDate = timeObj.split('-')[2].split(' ')[0]
  var dates = timeObj.split('-')[2].split(' ')[1].split(':')

  today = new Date()
  today.setFullYear(ssYear)
  today.setMonth(parseInt(ssMonth) - 1)
  today.setDate(ssDate)

  today.setHours(dates[0])
  today.setMinutes(dates[1])
  today.setSeconds(dates[2])

  systemDate = new Date()/// 获取服务器时间时当前系统时间
  refreshTime()
  setInterval(function () {
    refreshTime()
  }, 1000)

  var weekday = ['日', '一', '二', '三', '四', '五', '六']
  var yearTxt = timeObj.split(' ')[0].replace(/-/g, '/')
  var weekTxt = '星期' + weekday[today.getDay()]
  store.commit('setYearTxt', yearTxt)
  store.commit('setWeekTxt', weekTxt)
  function refreshTime () {
    var nowSystemDate = new Date()/// 系统时间
    var timeLen = parseInt(nowSystemDate.getTime(), 10) - parseInt(systemDate.getTime(), 10)/// /时间间隔
    var nowDateTime = today.getTime() + timeLen

    var nowDate = new Date(nowDateTime)

    year = nowDate.getFullYear()
    month = nowDate.getMonth() + 1
    date = nowDate.getDate()
    hour = nowDate.getHours()
    minute = nowDate.getMinutes()
    second = nowDate.getSeconds()

    if (hour >= 0 && hour < 6) { interval = '凌晨 ' } else if (hour >= 6 && hour < 12) { interval = '上午 ' } else if (hour >= 12 && hour < 18) { interval = '下午 ' } else { interval = '晚上 ' }

    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second
    var timeTxt = hour + ':' + minute + ':' + second
    store.commit('setTimeTxt', timeTxt)
  }
}

export function getBaseImgUrl (purl) {
  if (purl) {
    if (purl.indexOf('http:') != 0) {
      purl = baseImg + purl
    }
    return purl
  }
  return 'null'
}

export function urlParams () {
  if (window.upr != undefined) {
    return window.upr
  }
  var s = window.location.href.split('?')[1]
  return { stbId: 'guanglianbq03' }

  var params = {}
  var key = null
  var value = null
  for (var i = 0; i < s.length; i++) {
    var w = s.substring(i, i + 1)
    if (w == ' ') {
      continue
    } else if (w == '=') {
      value = ''
    } else if (w != '?' && w != '#' && w != '&') {
      if (key == null || value == null) {
        key = (key == null ? '' : key) + w
      } else {
        value = (value == null ? '' : value) + w
      }
    }
    if (w == '?' || w == '#' || w == '&' || (i + 1) == s.length) {
      if (key != null && value != null) {
        params[key] = value
      }
      key = null
      value = null
      continue
    }
  }
  window.upr = params
  return params
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
