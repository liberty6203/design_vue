<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>论文申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="treatiseForm" :model="treatise" :rules="rules" label-width="80px" >
                    <el-form-item label="论文题目" prop="title" >
                        <el-input v-model="treatise.title"></el-input>
                    </el-form-item>
					<el-form-item label="论文级别" prop="level">
					    <el-radio-group v-model="treatise.level" >
					        <el-radio label="1" value="1">EI</el-radio>
					        <el-radio label="2" value="2">SCI</el-radio>
					        <el-radio label="3" value="3">中文核心刊</el-radio>
					        <el-radio label="5" value="3">普通期刊</el-radio>
					        <el-radio label="4" value="4">其他</el-radio>
					    </el-radio-group>
					</el-form-item>
					<el-form-item label="论文类别" prop="type">
					    <el-radio-group v-model="treatise.type">
							<el-radio label="0" value="0">学位</el-radio>
					        <el-radio label="1" value="1">期刊</el-radio>
					        <el-radio label="2" value="2">会议</el-radio>
					        <el-radio label="3" value="3">其他</el-radio>
					    </el-radio-group>
					</el-form-item>
					<el-form-item label="学科门类" prop="subject">
					    <el-input v-model="treatise.subject"></el-input>
					</el-form-item>
					<el-form-item label="提交年份" prop="year">
                          <el-select v-model="treatise.year" placeholder="请选择年份">
                            <el-option
                              v-for="item in years"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                          </el-select>
                    </el-form-item>
					<el-form-item label="简介" prop="introduction">
					    <el-input type="textarea" rows="5" v-model="treatise.introduction"></el-input>
					</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('treatiseForm')">表单提交</el-button>
                        <el-button @click="resetForm('treatiseForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {add} from '../../api/treatiseSubmit.js'
export default {
    name: 'treatiseSubmit',
	created(){
		for(var y=2000;y<=2050;y++){
			this.years.push(y+"");
		}
	},
    data() {
        return {
			treatise:{
				pId:localStorage.getItem('pId'),
				title:"",
				type:"",
				level:"",
				subject:"",
				year:'2020',
				introduction:"",
			},
			years:[],
			rules:{
			   title:[
				   { required: true, message: '请输入论文名称', trigger: 'blur' },
			   ],
			   type:[
				   { required: true, message: '请选择论文类别', trigger: 'change' },
			   ],
			   level:[
				   { required: true, message: '请选择论文级别', trigger: 'change' },
			   ],
			   subject:[
				   { required: true, message: '请输入论文主题', trigger: 'blur' },
			   ],
			   year:[
				   { required: true, message: '请选择论文年份', trigger: 'blur' },
			   ],
			   introduction:[
				   { required: true, message: '请输入论文简介', trigger: 'blur' },
			   ],
			}
        };
    },
    methods: {
		submitForm(formName) {
			this.$refs.treatiseForm.validate((valid) => {
				if (valid) {
					var that = this;
					add(this.treatise).then(res=>{
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