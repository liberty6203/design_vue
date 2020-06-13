import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import( '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
				{
				    path: '/treatiseAudit',
				    component: () => import( '../components/page/TreatiseAudit.vue'),
				    meta: { title: '论文审核',permission:["院系管理员","系统管理员"] }
				},
				{
				    path: '/treatiseSubmit',
				    component: () => import( '../components/page/TreatiseSubmit.vue'),
				    meta: { title: '论文申报' }
				},
				{
				    path: '/treatiseList',
				    component: () => import( '../components/page/TreatiseList.vue'),
				    meta: { title: '论文列表' }
				},
				{
				    path: '/treatiseImport',
				    component: () => import( '../components/page/TreatiseImport.vue'),
				    meta: { title: '论文导入' }
				},
				{
				    path: '/projectAudit',
				    component: () => import( '../components/page/ProjectAudit.vue'),
				    meta: { title: '项目审核',permission:["院系管理员","系统管理员"] }
				},
				{
				    path: '/projectSubmit',
				    component: () => import( '../components/page/ProjectSubmit.vue'),
				    meta: { title: '项目申报' }
				},
				{
				    path: '/projectList',
				    component: () => import( '../components/page/ProjectList.vue'),
				    meta: { title: '项目列表' }
				},
				{
				    path: '/bookAudit',
				    component: () => import( '../components/page/BookAudit.vue'),
				    meta: { title: '论著审核',permission:["院系管理员","系统管理员"] }
				},
				{
				    path: '/bookSubmit',
				    component: () => import( '../components/page/BookSubmit.vue'),
				    meta: { title: '论著申报' }
				},
				{
				    path: '/bookList',
				    component: () => import( '../components/page/BookList.vue'),
				    meta: { title: '项目列表' }
				},
				{
				    path: '/modifyPassword',
				    component: () => import( '../components/page/ModifyPassword.vue'),
				    meta: { title: '修改密码' }
				},
				{
				    path: '/userList',
				    component: () => import( '../components/page/UserList.vue'),
				    meta: { title: '用户列表',permission:["系统管理员"] }
				},
				{
				    path: '/personScore',
				    component: () => import( '../components/page/PersonScore.vue'),
				    meta: { title: '积分详情',permission:["院系管理员","系统管理员"] }
				},
				{
				    path: '/schoolScore',
				    component: () => import( '../components/page/SchoolScore.vue'),
				    meta: { title: '全校统计',permission:["院系管理员","系统管理员"] }
				},
               {
                   path: '/404',
                   component: () => import( '../components/page/404.vue'),
                   meta: { title: '页面不存在' }
               },
			   {
                    path: '/403',
                    component: () => import( '../components/page/403.vue'),
                    meta: { title: '没有权限' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
			component: () => import(/* webpackChunkName: "login" */ '../components/page/404.vue'),
            redirect: '/404'
        }
    ]
});
