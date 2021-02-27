import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

Vue.config.productionTip = false
window.sessionStorage.clear();
Vue.use(Antd);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
