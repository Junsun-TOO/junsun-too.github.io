// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
import ratings from './components/ratings/ratings'		
import './common/stylus/icon.styl'

import './common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)



// 配置路由
var routes=[
	{path:'/',redirect: '/goods'}, 
	{path:'/goods',component:goods},
	{path:'/ratings',component:ratings},
	{path:'/seller',component:seller}
]

var router=new VueRouter({
	linkActiveClass: 'active',//router-link时，会添加属性
	linkExactActiveClass: 'active',	
  	routes
});

new Vue({
	el:'#app',
	router,
	VueResource,
	render:h=>h(App)
})

