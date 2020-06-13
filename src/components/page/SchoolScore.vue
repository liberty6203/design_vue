<template>
	<div>
		
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
		
	</div>
</template>

<script>
import Schart from 'vue-schart';
import {getTreatiseScore,getProjectScore,getBookScore} from '../../api/schoolScore.js'
export default {
	name: 'schoolScore',
	data(){
		return {
			treatiseChart: {
			    type: 'bar',
			    title: {
			        text: '全校最近几年论文数量统计'
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
			        text: '全校最近几年项目数量统计'
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
			        text: '全校最近几年论著数量统计'
			    },
			    labels: [],
			    datasets: [
			        {
			            label: '数量',
			            data: []
			        },
			
			    ]
			},
			
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
	methods:{
		getTreatiseScoreList(){
			var that = this;
			getTreatiseScore()
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
			getProjectScore()
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
			getBookScore()
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
}
</script>

<style scoped="scoped">
	.schart {
	    width: 100%;
	    height: 300px;
	}
</style>
