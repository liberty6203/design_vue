<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 论著审核
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input  v-model="query.title" placeholder="论著名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" >搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="50px" align="center"></el-table-column>
                <el-table-column prop="title" label="论著名称" width="200px" align="center"></el-table-column>
                <el-table-column prop="auditStatus" label="审核状态" :formatter="auditStatusFormatter" width="150px" align="center"></el-table-column>
                <el-table-column prop="publisher" label="出版社" width="150px" align="center"></el-table-column>
                <el-table-column prop="isbn" label="ISBN" width="150px" align="center"></el-table-column>
                <el-table-column prop="introduction"  label="简介"  align="center"></el-table-column>
				<el-table-column label="操作" width="200px" align="center">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="handleEdit(scope.$index, scope.row)">审核</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog title="论著审核" :visible.sync="editVisible"  width="30%">
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
						<el-form-item label="论文简介:">
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
				<el-row><el-col ><h3>论文审核</h3></el-col></el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="审核意见">
						      <el-radio v-model="audit.opinion" label="0">审核通过</el-radio>
						      <el-radio v-model="audit.opinion" label="1">审核未通过</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="审核理由">
						      <el-input
						        type="textarea"
						        :rows="2"
						        placeholder="请输入内容"
						        v-model="audit.opinionReason">
						      </el-input>
						</el-form-item>
					</el-col>
				</el-row>
            </el-form>
			
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getList,detail,audit,remove } from '../../api/bookAudit.js'
import formatter from '../../utils/formatter.js'
export default {
    name: 'bookAudit',
    data() {
        return {
            query: {
				title:"",
                page: 1,
                limit: 12
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {
				book:{
					title:"",
					auditStatus:1
				},
				person:{
					name:""
				}
			},
            idx: -1,
            id: -1,
			audit:{
				bId:undefined,
				opinion:undefined,
				opinionReason:""
			}

        };
    },
    created() {
		this.getData();
    },
    methods: {
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
		getDetail(row){
			var that = this;
			detail({bId:row.id}).then(res=>{
				console.log(res.data)
				that.form = res.data;
				
			},err=>{
				console.log(err)
			}).catch(err=>{})
		},
        // 触发搜索按钮
        handleSearch() {
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
        // 编辑操作
        handleEdit(index, row) {
			this.audit.bId = row.id;
			this.getDetail(row);
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
			// console.log(this.audit);
			var that = this;
			audit(this.audit).then(res=>{
				if(res.status === 200){
					this.$message.success("审核成功")
				}
				that.editVisible = false;
			},err=>{
				console.log(err)
			}).catch(err=>{console.log(err)})
            // this.editVisible = false;
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.query.page = val
            this.getData();
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
