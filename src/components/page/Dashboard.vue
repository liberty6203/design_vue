<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" style="">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}},欢迎使用科研信息采集系统</div>
                            <div class="user-info-role">当前身份：{{role}}</div>
                        </div>
                    </div>
                </el-card>
				
            </el-col>
			<el-col :span="24">
			    <el-card shadow="hover">
			        <schart ref="treatis" class="schart" canvasId="treatise" :options="treatiseChart"></schart>
			    </el-card>
			</el-col>
			<el-col :span="24">
			    <el-card shadow="hover">
			        <schart ref="project" class="schart" canvasId="project" :options="projectChart"></schart>
			    </el-card>
			</el-col>
			<el-col :span="24">
			    <el-card shadow="hover">
			        <schart ref="book" class="schart" canvasId="book" :options="bookChart"></schart>
			    </el-card>
			</el-col>
			<el-col :span="24">
				<el-card shadow="hover">
					<el-table :data="treatiseScore" border style="width: 100%">
						<el-table-column label="个人论文积分统计" align="center">
							<el-table-column prop="year" label="年份" width="200" align="center"></el-table-column>
							<el-table-column prop="eiScore" label="EI论文得分" width="200" align="center"></el-table-column>
							<el-table-column prop="sciScore" label="SCI论文得分" width="200" align="center"></el-table-column>
							<el-table-column prop="coreScore" label="中文核心刊论文得分" width="200" align="center"></el-table-column>
							<el-table-column prop="commonJournalScore" label="普通期刊论文得分" width="200" align="center"></el-table-column>
							<el-table-column prop="otherScore" label="其他论文得分" width="200" align="center"></el-table-column>
							<el-table-column prop="totalScore" label="论文总得分" align="center"></el-table-column>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="24">
				<el-card shadow="hover">
					<el-table :data="projectScore" border  >
						<el-table-column label="个人项目积分统计" align="center">
							<el-table-column prop="year" label="年份" width="200" align="center"></el-table-column>
							<el-table-column prop="countryScore" label="国家项目得分" width="200" align="center"></el-table-column>
							<el-table-column prop="cityScore" label="省部项目得分" width="200" align="center"></el-table-column>
							<el-table-column prop="schoolScore" label="学校项目得分" width="200" align="center"></el-table-column>
							<el-table-column prop="otherScore" label="其他项目得分" width="200" align="center"></el-table-column>
							<el-table-column prop="totalScore" label="项目总得分" align="center"></el-table-column>
						</el-table-column>
			
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="24">
				<el-card shadow="hover">
					<el-table :data="bookScore" border style="width: 100%">
						<el-table-column label="个人论著积分统计" align="center">
							<el-table-column prop="year" label="年份" width="200" align="center"></el-table-column>
							<el-table-column prop="bookScore" label="论著总得分" align="center"></el-table-column>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import {getTreatiseScore,getProjectScore,getBookScore} from '../../api/dashboard.js'
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('username'),
			role: localStorage.getItem('role'),
            treatiseChart: {
                type: 'bar',
                title: {
                    text: '个人最近几年论文数量统计'
                },
                labels: [],
                datasets: [
                    {
                        label: 'EI',
                        data: []
                    },
                    {
                        label: 'SCI',
                        data: []
                    },
                    {
                        label: '中文核心刊',
                        data: []
                    },
					{
						label:'普通期刊',
						data: []
					},
					{
					    label: '其他',
					    data: []
					},
                ]
            },
			projectChart: {
			    type: 'bar',
			    title: {
			        text: '个人最近几年项目数量统计'
			    },
			    labels: [],
			    datasets: [
			        {
			            label: '国家级',
			            data: []
			        },
			        {
			            label: '省部级',
			            data: []
			        },
			        {
			            label: '校级',
			            data: []
			        },
					{
						label:'其他',
						data: []
					},

			    ]
			},
			bookChart: {
			    type: 'line',
			    title: {
			        text: '个人最近几年论著数量统计'
			    },
			    labels: [],
			    datasets: [
			        {
			            label: '数量',
			            data: []
			        },

			    ]
			},
			treatiseScore:[],
			projectScore:[],
			bookScore:[]
        };
    },
    components: {
        Schart
    },
	created(){
		this.getTreatiseScoreList();
		this.getProjectScoreList();
		this.getBookScoreList();
	},
    methods: {
		getTreatiseScoreList(){
			var that = this;
			getTreatiseScore({pId:localStorage.getItem('pId')})
			.then(res=>{
				var data = res.data;
				for(var i=0;i<data.length;i++){
					that.treatiseChart.labels.push(data[i].year)
					that.treatiseChart.datasets[0].data.push(data[i].eiCount)
					that.treatiseChart.datasets[1].data.push(data[i].sciCount)
					that.treatiseChart.datasets[2].data.push(data[i].coreCount)
					that.treatiseChart.datasets[3].data.push(data[i].commonJournalCount)
					that.treatiseChart.datasets[4].data.push(data[i].otherCount)
				}
				that.treatiseScore = data;
			},err=>{
				console.log(err)
			})
		},
		getProjectScoreList(){
			var that = this;
			getProjectScore({pId:localStorage.getItem('pId')})
			.then(res=>{
				var data = res.data;
				for(var i=0;i<data.length;i++){
					that.projectChart.labels.push(data[i].year)
					that.projectChart.datasets[0].data.push(data[i].countryCount)
					that.projectChart.datasets[1].data.push(data[i].cityCount)
					that.projectChart.datasets[2].data.push(data[i].schoolCount)
					that.projectChart.datasets[3].data.push(data[i].otherCount)
				}
				that.projectScore = data;
			},err=>{
				console.log(err)
			})
		},
		getBookScoreList(){
			var that = this;
			getBookScore({pId:localStorage.getItem('pId')})
			.then(res=>{
				var data = res.data;
				for(var i=0;i<data.length;i++){
					that.bookChart.labels.push(data[i].year)
					that.bookChart.datasets[0].data.push(data[i].bookCount)
				}
				that.bookScore = data;
			},err=>{
				console.log(err)
			})
		},
		
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}
.user-info-cont .user-info-role{
	margin-top: 10px;
	font-size: 16px;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
