import Vue from 'vue'
import App from './App.vue'
import Search from './Search.vue'
Vue.component("search",Search)

new Vue({
  el: '#app',
  render: h => h(App)
})
