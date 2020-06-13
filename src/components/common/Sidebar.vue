<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
				{
				    icon: 'el-icon-lx-calendar',
				    title: '论文模块',
					index: '1',
				    subs: [
				        {
				            icon: 'el-icon-lx-searchlist',
				            index: 'treatiseAudit',
				            title: '论文审核'
				        },
				        {
				            icon: 'el-icon-lx-edit',
				            index: 'treatiseSubmit',
				            title: '论文申报'
				        },
				        {
				            icon: 'el-icon-lx-sort',
				            index: 'treatiseList',
				            title: '论文列表'
				        },
				    ]
				},
				{
				    icon: 'el-icon-lx-news',
				    index: '2',
				    title: '项目模块',
				    subs: [
						{
							icon: 'el-icon-lx-searchlist',
							index: 'projectAudit',
							title: '项目审核'
						},
						{
							icon: 'el-icon-lx-edit',
							index: 'projectSubmit',
							title: '项目申报'
						},
						{
							icon: 'el-icon-lx-sort',
							index: 'projectList',
							title: '项目列表'
						},
				    ]
				},
				{
				    icon: 'el-icon-lx-read',
				    title: '论著模块',
					index: '3',
				    subs: [
						{
							icon: 'el-icon-lx-searchlist',
							index: 'bookAudit',
							title: '论著审核'
						},
						{
							icon: 'el-icon-lx-edit',
							index: 'bookSubmit',
							title: '论著申报'
						},
						{
							icon: 'el-icon-lx-sort',
							index: 'bookList',
							title: '论著列表'
						},
				    ]
				},
				{
				    icon: 'el-icon-s-data',
				    title: '积分模块',
					index: '4',
				    subs: [
				        {
				            icon: 'el-icon-lx-searchlist',
				            index: 'personScore',
				            title: '积分查询'
				        },
						{
						    icon: 'el-icon-lx-searchlist',
						    index: 'schoolScore',
						    title: '全校统计'
						},
				        
				    ]
				},
				{
				    icon: 'el-icon-user',
				    title: '用户模块',
					index: '5',
				    subs: [
				        {
				            icon: 'el-icon-lx-searchlist',
				            index: 'modifyPassword',
				            title: '修改密码'
				        },
						{
						    icon: 'el-icon-lx-searchlist',
						    index: 'userList',
						    title: '用户列表'
						},
				        
				    ]
				},
                // {
                //     icon: 'el-icon-lx-calendar',
                //     title: '数据模块',
                // 	index: '5',
                //     subs: [
                //         {
                //             icon: 'el-icon-lx-searchlist',
                //             index: 'treatiseImport',
                //             title: '论文导入'
                //         },
                        
                //     ]
                // },
				


				
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
