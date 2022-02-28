import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import routes from './routes'
import echarts from 'echarts'
import global from '@/global/global.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router);
Vue.prototype.$echarts = echarts
Vue.prototype.global = global
const router = new Router({ routes });
document.title = 'Klog'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
