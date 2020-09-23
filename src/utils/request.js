import axios from 'axios'
import { baseRequestUrl } from '../config.js'

// create an axios instance
const service = axios.create({
  baseURL: baseRequestUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.result === 0) {
      return res
    } else {
      console.log('err' + res)
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
