import request from '@/utils/request'
import store from '@/store'

/**
 * 首页接口
 * @param {String} stbId
 * @param {string} pageType
 * @param {string} platform
 * @returns {string | null} promise
 */
export function fetchIndex (query) {
  return request({
    url: 'api/data/index',
    method: 'get',
    params: Object.assign({ stbId: store.state.stbId, pageType: 'index' }, query)
  })
}

/* 首页时间 */
export function fetchTime () {
  return request({
    url: 'apk/getTime',
    method: 'get'
  })
}

/* 首页天气 */
export function fetchWeather () {
  return request({
    url: 'weather/getWeather',
    method: 'get',
    params: { stbId: store.state.stbId }
  })
}

/* 热门城市天气 */
export function fetchAllWeather () {
  return request({
    url: 'weather/getAllWeather',
    method: 'get',
    params: { stbId: store.state.stbId }
  })
}

/* 世界时间 */
export function fetchWorldTime () {
  return request({
    url: 'world/getWorldTime',
    method: 'get'
  })
}

/* 汇率 */
export function fetchExchange () {
  return request({
    url: 'world/exchange',
    method: 'get'
  })
}
