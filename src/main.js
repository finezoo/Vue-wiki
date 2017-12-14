import Vue from 'vue'
import router from './routers'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import config from './config/config'
import store from './store'


Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || ''} - ${config.wiki.name}`
  store.commit('updateLoadingStatus', { isLoading: true });
  next()
});

router.afterEach(() => {
  window.scrollTo(0, 0)
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
