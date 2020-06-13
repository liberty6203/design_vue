<template>
	<div id="container" style="width: 100%;height: 100%;">
		
		<el-steps :active="active" process-status="success"  simple finish-status="success">
		  <el-step title="下载EXCEL"></el-step>
		  <el-step title="上传EXCEL"></el-step>
		  <el-step title="完成"></el-step>
		</el-steps>
		
		
		
		<el-card class="box-card" style="width: 100%;height: calc(100% - 66px); margin-top: 10px;" shadow="hover">
			<div style="width: 100%; height: calc(100% - 84px);">
				<div v-if="active === 0" class="step-container">
					
					  
					<h2 align="center"style="margin-bottom: 30px;font-size: 30px;">下载EXCEL</h2>
					<p style="font-size: 20px;">操作步骤:</p>
					<p style="font-size: 20px;">1.<a  href="http://localhost:8888/Data/TreatiseExcelDownload">下载EXCEL</a></p>
					<p style="font-size: 20px;">2.按列填写论文的信息</p>
					<p style="font-size: 20px;">3.点击下一步</p>
					
				</div>
				<div v-if="active === 1" class="step-container">
					<h2 align="center"style="margin-bottom: 30px;font-size: 30px;">上传EXCEL</h2>
					<el-upload
					  class="upload-demo"
					  drag
					  action="http://localhost:8888/Data/TreatiseImport"
					  :with-credentials='true'
					  multiple>
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过10MB</div>
					</el-upload>
				</div>
				<div v-if="active === 2" class="step-container">
					<h2 align="center"style="margin-bottom: 30px;font-size: 30px;">论文导入完成</h2>
					<p style="font-size: 20px;text-align: center;">论文导入完成，请等待审核。</p>
				</div>
				
			</div>
			<div >
				<el-button style="margin-top: 12px;float: right;" @click="next" v-show="active<2">下一步</el-button>
			</div>
			
		</el-card>
		
	
		
	</div>
	
	
</template>

<script>
import {getExcel,postExcel} from '../../api/treatiseImport.js'
export default {
	data() {
		return {
			active: 0,
		};
	},

	methods: {
		next() {
			if (this.active++ > 2) this.active = 0;
		}

	}
}
</script>

<style>
	.el-card__body{
		height: 100%;
	}
	.step-container{
		width: 400px;
		margin: 0 auto;
	}
	.href{
		color: #409eff;
	}
	.href:hover{
		color: #8cc5ff;
		cursor: pointer;
	}
</style>
