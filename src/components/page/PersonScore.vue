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
				<el-select v-model="query.year" clearable placeholder="年份" style="width: 100px;margin-right: 10px;">
					<el-option  label="2020" value="2020"></el-option>
					<el-option  label="2019" value="2019"></el-option>
					<el-option  label="2018" value="2018"></el-option>
					<el-option  label="2017" value="2017"></el-option>
					<el-option  label="2016" value="2016"></el-option>
				</el-select>
                <el-input  v-model="query.name" placeholder="姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" >搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
				@row-click="handleClickRow"
            >
                <el-table-column type="selection" width="50px" align="center"></el-table-column>
				<!-- <el-table-column prop="year" label="年份" width="100px" align="center"></el-table-column> -->
                <el-table-column prop="person.name" label="姓名" width="100px" align="center"></el-table-column>
                <el-table-column prop="treatiseCountDTOList[0].totalCount" label="论文总数" width="100px" align="center"></el-table-column>
                <el-table-column prop="treatiseCountDTOList[0].totalScore" label="论文总分" width="100px" align="center"></el-table-column>
                <el-table-column prop="projectCountDTOList[0].totalCount" label="项目总数" width="100px" align="center"></el-table-column>
                <el-table-column prop="projectCountDTOList[0].totalScore" label="项目总分" width="100px" align="center"></el-table-column>
                <el-table-column prop="bookCountDTOList[0].bookCount" label="论著总数" width="100px" align="center"></el-table-column>
                <el-table-column prop="bookCountDTOList[0].bookScore" label="论著总分" width="100px" align="center"></el-table-column>
                <el-table-column prop="sum" label="个人总分" width="100px" align="center"></el-table-column>
				<el-table-column label="操作"  align="center">
				</el-table-column>
            </el-table>
           <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :page-count="query.page"
                    :page-size="query.limit"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->
        </div>
		<el-dialog title="积分详情" :visible.sync="detailVisiable"  width="80%" >

			<el-table :data="detail.treatiseCountDTOList" border style="width: 100%">
				<el-table-column label="个人论文积分统计" align="center">
					<el-table-column prop="year" label="年份" width="100px" align="center"></el-table-column>
					<el-table-column prop="eiScore" label="EI论文得分" width="200" align="center"></el-table-column>
					<el-table-column prop="sciScore" label="SCI论文得分" width="200" align="center"></el-table-column>
					<el-table-column prop="coreScore" label="中文核心刊论文得分" width="200" align="center"></el-table-column>
					<el-table-column prop="commonJournalScore" label="普通期刊论文得分" width="200" align="center"></el-table-column>
					<el-table-column prop="otherScore" label="其他论文得分" width="200" align="center"></el-table-column>
					<el-table-column prop="totalScore" label="论文总得分" align="center"></el-table-column>
				</el-table-column>
			</el-table>

			<el-table :data="detail.projectCountDTOList" border  >
				<el-table-column label="个人项目积分统计" align="center">
					<el-table-column prop="year" label="年份" width="100px" align="center"></el-table-column>
					<el-table-column prop="countryScore" label="国家项目得分" width="200" align="center"></el-table-column>
					<el-table-column prop="cityScore" label="省部项目得分" width="200" align="center"></el-table-column>
					<el-table-column prop="schoolScore" label="学校项目得分" width="200" align="center"></el-table-column>
					<el-table-column prop="otherScore" label="其他项目得分" width="200" align="center"></el-table-column>
					<el-table-column prop="totalScore" label="项目总得分" align="center"></el-table-column>
				</el-table-column>
			
					</el-table>


			<el-table :data="detail.bookCountDTOList" border style="width: 100%">
				<el-table-column label="个人论著积分统计" align="center">
					<el-table-column prop="year" label="年份" width="100px" align="center"></el-table-column>
					<el-table-column prop="bookScore" label="论著总得分"  align="center"></el-table-column>
				</el-table-column>
			</el-table>

		</el-dialog>

	
	</div>
</template>

<script>
import {getPersonScore,getPersonScoreByPid} from '../../api/personScore.js'
export default {
    name: 'personScore',
    data() {
        return {
            query: {
				year:"2020",
				name:"",
                page: 1,
                limit: 12
            },
            tableData: [],
			detail:{},
			detailVisiable:false
        };
    },
    created() {
		this.getScore()

    },
    methods: {
		
		getScore(){
			var that = this;
			getPersonScore(this.query)
			.then(res=>{
				that.tableData = res.data
				for(var i=0;i<that.tableData.length;i++){
					that.tableData[i].sum = res.data[i].treatiseCountDTOList[0].totalScore 
											+ res.data[i].projectCountDTOList[0].totalScore
											+ res.data[i].bookCountDTOList[0].bookScore;
				}
			},err=>{console.log(err)})
		},

        // 触发搜索按钮
        handleSearch() {
			this.getScore()
        },
		handleClickRow(row,column,event){
			// this.detail = row;
			var that = this;
			getPersonScoreByPid({pId:row.person.id})
			.then(res=>{
				that.detail = res.data[0];
				that.detailVisiable = true;
			},err=>{console.log(err)})
			
			
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
