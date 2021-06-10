import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index'
import './styles/theme0/index'
const App = () => import('./App')

console.log(Vue);
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})