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
				<el-select v-model="mode" clearable placeholder="查询视图" style="width: 100px;margin-right: 10px;">
					<el-option  label="全部论著" value="1"></el-option>
					<el-option  label="个人论著" value="2"></el-option>
					<el-option  label="个人审核中论著" value="3"></el-option>
					<el-option  label="个人审核未通过论著" value="4"></el-option>
				</el-select>
                <el-input  v-model="query.title" placeholder="论著题目" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" >搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
				@row-click="handleClickRow"
            >
                <el-table-column type="selection" width="50px" align="center"></el-table-column>
                <el-table-column prop="title" label="论著题目" width="200px" align="center"></el-table-column>
                <el-table-column prop="auditStatus" label="审核状态" :formatter="auditStatusFormatter" width="150px" align="center"></el-table-column>
                <el-table-column prop="publisher" label="出版社" width="150px" align="center"></el-table-column>
                <el-table-column prop="year" label="年份" width="100px" align="center"></el-table-column>
                <el-table-column prop="introduction"  label="简介"  align="center"></el-table-column>
				<el-table-column label="操作" width="200px" align="center">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click.stop="handleEdit(scope.$index, scope.row)" :disabled="editDisable" >编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click.stop="handleDelete(scope.$index, scope.row)" :disabled="isAdmin()">删除</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="论著详情" :visible.sync="detailVisiable"  width="30%">
            <el-form ref="form"  :model="form" label-width="80px">
				<el-row><el-col ><h3>论著信息</h3></el-col></el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="论著名称:">
						    {{form.book.title}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="审核状态:">
						    {{auditStatusFormatter(0,0,form.book.auditStatus)}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="出版社:">
						    {{form.book.publisher}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="ISBN:">
						    {{form.book.isbn}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					
					<el-col :span="12">
						<el-form-item label="发表年份:">
						    {{form.book.year}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="论著简介:">
						    {{form.book.introduction}}
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row><el-col ><h3>作者信息</h3></el-col></el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="作者姓名">
						    {{form.person.name}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属院系">
						    {{form.person.department}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="作者电话">
						    {{form.person.phone}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="作者邮箱">
						    {{form.person.email}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row><el-col ><h3>审核记录</h3></el-col></el-row>
				<el-table
					:data="form.bookAuditList"
					border
					class="table"
					ref="multipleTable"
					header-cell-class-name="table-header">
					<el-table-column prop="adId"  label="审核人"  align="center" width="60"></el-table-column>
					<el-table-column prop="auditOpinion" :formatter="auditOpinionFormater" label="审核意见"  align="center" width="150"></el-table-column>
					<el-table-column prop="auditOpinionReason"  label="审核理由"  align="center" width="150"></el-table-column>
					<el-table-column prop="auditTime"   label="审核时间"  align="center"></el-table-column>
				</el-table>
			</el-form>
        </el-dialog>
		<el-dialog title="论著信息编辑" :visible.sync="editVisiable"  width="30%">
			<el-form ref="bookForm" :model="book" :rules="rules" label-width="80px" >
			    <el-form-item label="论著名称" prop="title" >
			        <el-input v-model="book.title"></el-input>
			    </el-form-item>
				<el-form-item label="出版社" prop="subject">
				    <el-input v-model="book.publisher"></el-input>
				</el-form-item>
				<el-form-item label="ISBN" prop="subject">
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
			        <el-button type="primary" @click="submitForm('bookForm')">提交</el-button>
			        <el-button @click="editVisiable=false">取消</el-button>
			    </el-form-item>
			</el-form>
		</el-dialog>
	
	</div>
</template>

<script>
import {getList,detail,update,remove} from '../../api/bookList.js'
import formatter from '../../utils/formatter.js'
export default {
    name: 'bookAudit',
    data() {
        return {
			mode:"",
            query: {
				title:"",
				isPersonal:false,
				isAuditing:false,
				isBlocked:false,
                page: 1,
                limit: 12
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            detailVisiable: false,
            pageTotal: 0,
            form: {
				book:{
					title:"",
					auditStatus:"1"
				},
				person:{
					name:""
				}
			},
            idx: -1,
            id: -1,
			editDisable:true,
			editVisiable:false,
			deleteDisable:true,
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
			   		{ required: true, message: '请输入出版社', trigger: 'blur' },
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
    created() {
		this.getData();
		for(var y=2000;y<=2050;y++){
			this.years.push(y+"");
		}
    },
    methods: {
		isAdmin(){return !('院系管理员'===localStorage.getItem('role')||'系统管理员'===localStorage.getItem('role'))},
		auditStatusFormatter(row, column, cellValue){
			return formatter.auditStatusFormat(cellValue);
		},
		auditOpinionFormater(row, column, cellValue){
			return formatter.auditOpinionFormat(cellValue);
		},
		timeFromater(row, column, cellValue){
			return formatter.timeFormat(cellValue);;
		},
        // 获取 easy-mock 的模拟数据
        getData() {
           var that = this;
           getList(this.query).then(res=>{
				that.tableData = res.data.list;
				that.pageTotal = res.data.total;
			
           },err=>{
				console.log(err)
           })
        },
		getDetail(id){
			var that = this;
			
			detail({bId:id}).then(res=>{
				that.form = res.data;
				
			},err=>{
				console.log(err)
			}).catch(err=>{})
		},
        // 触发搜索按钮
        handleSearch() {
			
			switch(this.mode){
				case '1':
					this.query.isPersonal=false;
					this.query.isAuditing=false;
					this.query.isBlocked=false;
					this.editDisable = true;
					break;
				case '2':
					this.query.isPersonal=true;
					this.query.isAuditing=false;
					this.query.isBlocked=false;
					this.editDisable = true;
					break;
				case '3':
					this.query.isPersonal=true;
					this.query.isAuditing=true;
					this.query.isBlocked=false;
					this.editDisable = true;
					break;
				case '4':					
					this.query.isPersonal=true;
					this.query.isAuditing=true;
					this.query.isBlocked=true;
					this.editDisable = false;
					break;
			}
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
			.then(() => {
				remove({bId:row.id})
				.then(res=>{
					if(res.status === 200){
						this.$message.success('删除成功');
						this.tableData.splice(index, 1);
					}else{
						this.$message.error(res.msg);
					}
				},err=>{
					console.log(err)
				}).catch(err=>{console.log(err)})
			}).catch(err=>{console.log(err)})
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 详情操作
        handleClickRow(row,column,event) {
			this.getDetail(row.id);
            this.detailVisiable = true;
        },
		handleEdit(index,tableRow){
			var row = this.tableData[index]
			this.book.bId = row.id;
			this.book.title = row.title;
			this.book.level = row.level;
			this.book.subject = row.subject;
			this.book.department = row.department;
			this.book.money = row.money;
			this.book.year = row.year;
			this.book.introduction = row.introduction;
			this.editVisiable = true;
		},
        // 分页导航
        handlePageChange(val) {
            this.query.page = val
            this.getData();
        },
		submitForm(formName) {
			this.$refs.bookForm.validate((valid) => {
				if (valid) {
					var that = this;
					this.editVisiable = false;
					update(this.book).then(res=>{
						if(res.status === 200){
							that.$message.success("修改成功")
						}else{
							that.$message.error(res.msg);
						}
					},err=>{console.log(err)})
					.catch(err=>{})
				} 
			});
		},
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
