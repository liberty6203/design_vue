<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 论著列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input  v-model="query.name" placeholder="姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" >搜索</el-button>
				<el-button type="primary" icon="el-icon-plus" @click="handleAdd" >添加用户</el-button>
				<!-- <a  href="http://localhost:8888/Data/PersonExcelDownload" style="margin: 0 10px;"><el-button type="primary" icon="el-icon-download" >下载批量导入模板</el-button></a>
				<form action="http://localhost:8888/Data/PersonImport">
					<el-input type="file"></el-input>
				  <el-button size="small" type="primary">点击上传</el-button>
				</form> -->
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="selection" width="50px" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="200px" align="center"></el-table-column>
                <el-table-column prop="department" label="学院" width="200px" align="center"></el-table-column>
                <el-table-column prop="position" label="职务" width="100px" align="center"></el-table-column>
                <el-table-column prop="phone"  label="联系电话"  align="center"></el-table-column>
                <el-table-column prop="email"  label="邮箱"  align="center"></el-table-column>
                <el-table-column prop="role"  label="系统角色"  align="center" :formatter="roleFormatter" ></el-table-column>
				<el-table-column label="操作" width="200px" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)" >编辑</el-button>
						<el-button size="mini" @click.stop="handleDelete(scope.$index, scope.row)" type="danger" >删除</el-button>
					</template>
				</el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :page-count="query.page"
                    :page-size="query.limit"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
		
		<el-dialog title="用户信息" :visible.sync="eidtVisiable"  width="30%">
			<el-form ref="personForm" :model="person"  label-width="80px" >
			    <el-form-item label="姓名" prop="name" >
			        <el-input v-model="person.name"></el-input>
			    </el-form-item>
				<el-form-item label="身份证号" prop="idcard" >
				    <el-input v-model="person.idcard"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" >
				    <el-input v-model="person.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email" >
				    <el-input v-model="person.email"></el-input>
				</el-form-item>
				<el-form-item label="学位" prop="degree" >
				    <el-input v-model="person.degree"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone" >
				    <el-input v-model="person.phone"></el-input>
				</el-form-item>
				<el-form-item label="所属院系" prop="department" >
				    <el-input v-model="person.department"></el-input>
				</el-form-item>
				<el-form-item label="职务" prop="position" >
				    <el-input v-model="person.position"></el-input>
				</el-form-item>
				<el-form-item label="系统角色" prop="role" >
					<el-select v-model="person.role">
						<el-option label="普通用户" value="0"></el-option>
						<el-option label="院系管理员" value="1"></el-option>
						<el-option label="系统管理员" value="2"></el-option>
					</el-select>
				</el-form-item>

			    <el-form-item>
			        <el-button type="primary" @click="submitForm('personForm')" style="float: right;">提交</el-button>
			        <!-- <el-button @click="editVisiable=false">取消</el-button> -->
			    </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {getPersonList,addPerson,removePerson,updatePerson} from '../../api/UserList.js'
import formatter from '../../utils/formatter.js'
export default {
    name: 'userList',
    data() {
        return {
			mode:"",
            query: {
				name:"",
                page: 1,
                limit: 12
            },
			person:{
				id:undefined,
				idcard:"",
				password:"",
				email:"",
				name:"",
				degree:"",
				phone:"",
				deparrtment:"",
				position:"",
				role:undefined
			},
            tableData: [],
            eidtVisiable: false,
            pageTotal: 0,
			rules:[],
        };
    },
    created() {
		this.getData();

    },
    methods: {
		roleFormatter(row, column, cellValue){
			return formatter.roleFormat(cellValue);
		},
        getData() {
           var that = this;
           getPersonList(this.query).then(res=>{
				that.tableData = res.data.list;
				that.pageTotal = res.data.total;
			
           },err=>{
				console.log(err)
           })
        },
        // 触发搜索按钮
        handleSearch() {
			this.getData();
        },

        // 分页导航
        handlePageChange(val) {
            this.query.page = val
            this.getData();
        },
		handleEdit(index,row){
			this.person.name = row.name;
			this.person.id = row.id;
			this.person.idcard = row.idcard;
			this.person.password = row.password;
			this.person.email = row.email;
			this.person.degree = row.degree;
			this.person.phone = row.phone;
			this.person.department = row.department;
			this.person.position = row.position;
			this.eidtVisiable = true;
			this.mode="update"
		},
		submitForm(){
			// console.log(this.person)
			var that = this;
			if(this.mode === "update"){
				
				updatePerson(this.person)
				.then(res=>{
					if(res.status === 200){
						that.$message.success("修改成功")
						that.getData();
						that.eidtVisiable = false;
					}
					
				},err=>{
					console.log(err);
					that.eidtVisiable = false;
				})
			}else if(this.mode === "add"){
				addPerson(this.person)
				.then(res=>{
					if(res.status === 200){
						that.$message.success("添加成功")
						that.getData();
						that.eidtVisiable = false;
					}
				},err=>{console.log(err);that.eidtVisiable = false;})
			}else{
				this.$message.error("状态错误")
			}
			
		},
		handleAdd(){
			this.eidtVisiable = true;
			this.person = {
				id:undefined,
				idcard:"",
				password:"",
				email:"",
				name:"",
				degree:"",
				phone:"",
				deparrtment:"",
				position:"",
				role:undefined
			}
			this.mode="add"
		},
		handleDelete(index,row){
			console.log(row);
			var that = this;
			removePerson({id:row.id})
			.then(res=>{
				if(res.status === 200){
					that.$message.success("删除成功")
				}else{
					that.$message.err(res.msg)
				}
			},err=>{console.log(err)})
		}

    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.el-dialog__body h3{
	text-align: center;
	margin-bottom: 20px;
}

</style>
