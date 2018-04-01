<template>
	<panpel class="panpel">
		<div slot="header">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			  	<el-menu-item index="1">未分配</el-menu-item>
			  	<el-menu-item index="2">已分配</el-menu-item>
			  	<el-menu-item index="3">待服务</el-menu-item>
			  	<el-menu-item index="4">服务中</el-menu-item>
			</el-menu>
			<div class="bottom">
				<el-input v-model="input" placeholder="请输入内容" class="bottom-input1"></el-input>
				<el-button type="primary" class="bottom-button1">搜索</el-button>
				<el-button type="primary" class="bottom-button2">添加订单</el-button>
			</div>
		</div>
		<div slot="body" class="body">
		    <div class="body-table table">
		        <div class="thead body-table-thead">
		            <div class="tr">
		                <div class="td">订单编号</div>
		                <div class="td">预约人</div>
		                <div class="td">预约时间</div>
		                <div class="td">预约内容</div>
		                <div class="td">预约地点</div>
		                <div class="td">操作</div>
		            </div>
		        </div>
		        <div class="tbody">
		            <div class="tr body-table-tr" v-for="(item,index) of data" :key="index">
		                <div class="td">123456789</div>
		                <div class="td">张三</div>
		                <div class="td">2018-02-11-12:33</div>
		                <div class="td">内容</div>
		                <div class="td">地点</div>
		                <div class="td">
		                	<a href="javascript:void(0)">分配</a>
		                	<a href="javascript:void(0)">删除</a>
		                </div>
		            </div>
		        </div>
		    </div>
		    <div class="body-page">
		    	<el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
		    </div>
		</div>
	</panpel>
</template>

<script type="text/javascript">
import Panpel from "base/panpel"
	export default {
		components:{
			Panpel
		},
		data(){
			return {
				data:10,
				activeName:'first',
				activeIndex:'1',
				input:'',
				tableData:[{
		            date: '2016-05-02',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		            date: '2016-05-04',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1517 弄'
		        }, {
		            date: '2016-05-01',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1519 弄'
		        }, {
		            date: '2016-05-03',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1516 弄'
		        }]
			}
		},
		methods:{
			handleClick(){

			},
			handleSelect(){

			}
		}
	}
</script>

<style type="text/css" scoped>
	.body{
		/* background-color: #fff; */
	}
	.bottom{
		padding: 10px 0;
		box-sizing: border-box;
	}
	.bottom .bottom-input1{
		width: 230px;
	}
	.bottom .bottom-button1{
		margin-left: 10px;
	}
	.bottom .bottom-button2{
		float: right;
	}
	.body-content {
	  padding: 10px 0 20px 0;
	  font-size: 12px;
	}
	.body-table-thead {
	  margin-bottom: 5px;
	}
	.body-table-tr {
	  background-color: #fff;
	  margin-top: 5px;
	}
	.body-page{
		padding: 10px 0;
		text-align: right;
	}
</style>
