import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import routes from './routes'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router);
const router = new Router({ routes });
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
