<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>项目申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="projectForm" :model="project" :rules="rules" label-width="80px" >
                    <el-form-item label="项目名称" prop="title" >
                        <el-input v-model="project.title"></el-input>
                    </el-form-item>
					<el-form-item label="项目级别" prop="level">
					    <el-radio-group v-model="project.level" >
					        <el-radio label="1" value="1">国家级</el-radio>
					        <el-radio label="2" value="2">省市级</el-radio>
					        <el-radio label="3" value="3">校级</el-radio>
					        <el-radio label="4" value="4">其他</el-radio>
					    </el-radio-group>
					</el-form-item>
					<el-form-item label="学科门类" prop="subject">
					    <el-input v-model="project.subject"></el-input>
					</el-form-item>
					<el-form-item label="所属部门" prop="department">
					    <el-input v-model="project.department"></el-input>
					</el-form-item>
					<el-form-item label="项目经费" prop="money">
					    <el-input v-model="project.money"></el-input>
					</el-form-item>
					<el-form-item label="起始时间" prop="startTime">
					    
						<el-date-picker
						      v-model="project.startTime"
						      type="date"
							  format="yyyy-M-d"
							  value-format="timestamp"
						      placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间" prop="endTime">
					    <el-date-picker
					          v-model="project.endTime"
					          type="date"
							  format="yyyy-M-d"
							  value-format="timestamp"
					          placeholder="选择日期">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="提交年份" prop="year">
                          <el-select v-model="project.year" placeholder="请选择年份">
                            <el-option
                              v-for="item in years"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                          </el-select>
                    </el-form-item>
					<el-form-item label="简介" prop="introduction">
					    <el-input type="textarea" rows="5" v-model="project.introduction"></el-input>
					</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('projectForm')">表单提交</el-button>
                        <el-button @click="resetForm('projectForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {add} from '../../api/projectSubmit.js'
export default {
    name: 'projectSubmit',
	created(){
		for(var y=2000;y<=2050;y++){
			this.years.push(y+"");
		}
	},
    data() {
        return {
			project:{
				pId:localStorage.getItem('pId'),
				title:"",
				level:"",
				subject:"",
				department:"",
				money:undefined,
				startTime:"",
				endTime:"",
				year:undefined,
				introduction:"",
			},
			years:[],
			rules:{
			   title:[
				   { required: true, message: '请输入论文名称', trigger: 'blur' },
			   ],
			   level:[
				   { required: true, message: '请选择论文级别', trigger: 'change' },
			   ],
			   subject:[
				   { required: true, message: '请输入论文主题', trigger: 'blur' },
			   ],
			   department:[
			   		{ required: true, message: '请输入所属部门', trigger: 'blur' },
			   ],
			   money:[
			   		{ required: true, message: '请输入项目资金', trigger: 'blur' },
			   ],
			   startTime:[
			   		{ required: true, message: '请选择项目开始时间', trigger: 'change' },
			   ],
			   endTime:[
					{ required: true, message: '请选择项目结束时间', trigger: 'change' },
			   ],
			   year:[
				   { required: true, message: '请选择论文年份', trigger: 'change' },
			   ],
			   introduction:[
				   { required: true, message: '请输入论文简介', trigger: 'blur' },
			   ],
			}
        };
    },
    methods: {
		submitForm(formName) {
			this.$refs.projectForm.validate((valid) => {
				if (valid) {
					var that = this;
					add(this.project).then(res=>{
						if(res.status === 200){
							that.$message.success("申报成功")
						}else{
							that.$message.error(res.msg);
						}
					},err=>{console.log(err)})
					.catch(err=>{})
				} 
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
    }
};
</script>