import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import axios from 'axios'


import VueRouter from 'vue-router'

Vue.prototype.$echarts = echarts 
Vue.prototype.$axios = axios 

Vue.config.productionTip = false

Vue.use( ElementUI );
Vue.use( VueRouter );

import xxxTree from './components/xxxTree.vue'
import HelloWorld from './components/HelloWorld.vue'
const routes = [
  { path: '/', component: HelloWorld },
  { path: '/link/:api', name: 'link', component: xxxTree },
]

const router = new VueRouter({routes})

//new Vue({
//  render: h => h(App),
//}).$mount('#app')
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
