import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

Vue.prototype.router = router;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 科研信息采集系统`;
    const role = localStorage.getItem('role');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        // role === 'admin' ? next() : next('/403');
		if(to.meta.permission.indexOf(role) === -1){
			next('/403');
		}else{
			next();
		}
    } else {
        next();
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');