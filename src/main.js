import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.css'

Vue.config.productionTip = false

new Vue({
  router,
  beforeMount () {
    const keywordsEl = document.createElement('meta')
    keywordsEl.content = '1280*720'
    keywordsEl.name = 'page-view-size'
    document.head.appendChild(keywordsEl)
  },
  store,
  render: h => h(App)
}).$mount('#app')
