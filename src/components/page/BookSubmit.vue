<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>论著申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="bookForm" :model="book" :rules="rules" label-width="80px" >
                    <el-form-item label="论著名称" prop="title" >
                        <el-input v-model="book.title"></el-input>
                    </el-form-item>

					<el-form-item label="出版社" prop="publisher">
					    <el-input v-model="book.publisher"></el-input>
					</el-form-item>
					<el-form-item label="ISBN" prop="isbn">
					    <el-input v-model="book.isbn"></el-input>
					</el-form-item>

					<el-form-item label="提交年份" prop="year">
                          <el-select v-model="book.year" placeholder="请选择年份">
                            <el-option
                              v-for="item in years"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                          </el-select>
                    </el-form-item>
					<el-form-item label="简介" prop="introduction">
					    <el-input type="textarea" rows="5" v-model="book.introduction"></el-input>
					</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('bookForm')">表单提交</el-button>
                        <el-button @click="resetForm('bookForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {add} from '../../api/bookSubmit.js'
export default {
    name: 'bookSubmit',
	created(){
		for(var y=2000;y<=2050;y++){
			this.years.push(y+"");
		}
	},
    data() {
        return {
			book:{
				pId:localStorage.getItem('pId'),
				title:"",
				publisher:"",
				isbn:"",
				year:undefined,
				introduction:"",
			},
			years:[],
			rules:{
			   title:[
				   { required: true, message: '请输入论著名称', trigger: 'blur' },
			   ],
			   publisher:[
				   { required: true, message: '请输入论著出版社', trigger: 'blur' },
			   ],
			   isbn:[
			   		{ required: true, message: '请输入ISBN', trigger: 'blur' },
			   ],
			   year:[
				   { required: true, message: '请选择论著年份', trigger: 'change' },
			   ],
			   introduction:[
				   { required: true, message: '请输入论著简介', trigger: 'blur' },
			   ],
			}
        };
    },
    methods: {
		submitForm(formName) {
			this.$refs.bookForm.validate((valid) => {
				if (valid) {
					var that = this;
					add(this.book).then(res=>{
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