<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="passwordForm" :model="passwordForm" :rules="rules" label-width="100px" >
                    <el-form-item label="旧密码:" prop="oldPassword" >
                        <el-input v-model="passwordForm.oldPassword"></el-input>
                    </el-form-item>
					<el-form-item label="新密码:" prop="newPassword" >
					    <el-input v-model="passwordForm.newPassword"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码:" prop="newPasswordAgain" >
					    <el-input v-model="passwordForm.newPasswordAgain"></el-input>
					</el-form-item>
					
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('passwordForm')">提交</el-button>
                        <el-button @click="resetForm('passwordForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {modifyPassword} from '../../api/modifyPassword.js'
export default {
    name: 'modifyPassword',
    data() {
		var validatePass = (rule, value, callback) => {
		  if (value === '') {
		    callback(new Error('请再次输入密码'));
		  } else if (value !== this.passwordForm.newPassword) {
		    callback(new Error('两次输入密码不一致!'));
		  } else {
		    callback();
		  }
		};
        return {
			passwordForm:{
				oldPassword:"",
				newPassword:"",
				newPasswordAgain:""
			},
			      
			years:[],
			rules:{
			   oldPassword:[
				   { required: true, message: '请输入原密码', trigger: 'blur' },
			   ],
			   newPassword:[
					{ required: true, message: '请输入新密码', trigger: 'blur' },
			   ],
			   newPasswordAgain:[
					{required: true, validator:validatePass, trigger: 'blur' },
			   ],
			}
        };
    },
    methods: {
		submitForm(formName) {
			this.$refs.passwordForm.validate((valid) => {
				if (valid) {
					var that = this;
					modifyPassword(this.passwordForm).then(res=>{
						if(res.status === 200){
							this.$message.success("修改成功")
							this.$router.push('/dashboard')
						}else{
							this.$message.error(res.msg)
						}
					},err=>{console.log(err)})
				} 
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
    }
};
</script>