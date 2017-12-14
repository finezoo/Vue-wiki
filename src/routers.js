import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes:[{
    path: '/',
    meta: {
      title: '首页'
    },
    component: (resolve) => require(['./index.vue'], resolve)
  },
    {
      path: '/content/:category/:oid',
      meta: {
        title: '详细内容'
      },
      component: (resolve) => require(['./content.vue'], resolve)
    },
  ]
})