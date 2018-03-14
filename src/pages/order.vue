<template>
	<panpel class="panpel">
		<div slot="header">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			  	<el-menu-item index="1">未分配</el-menu-item>
			  	<el-menu-item index="2">已分配</el-menu-item>
			  	<el-menu-item index="3">待服务</el-menu-item>
			  	<el-menu-item index="4">服务中</el-menu-item>
			</el-menu>
			<div class="header-line2">
				<el-row>
				  	<el-col :span="4">
					  	<el-input v-model="input" placeholder="请输入内容"></el-input>
			  		</el-col>
			  		<el-col :span="2">
					  	<el-button>搜索</el-button>
			  		</el-col>
			  		<el-col :span="16">
			  			
			  		</el-col>
			  		<el-col :span="2">
					  	<el-button>默认按钮</el-button>
			  		</el-col>
				</el-row>	
			</div>
		</div>
		<div slot="body" class="body">
			
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
				data:[1,2,3,4,5,6,7,8,9],
				activeName:'first',
				activeIndex:'1',
				input:'',
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
		background-color: #fff;
	}
	.header-line2{
		padding: 10px 0;
		box-sizing: border-box;
	}
	.header-line2 .el-button{
		margin-left: 10px;
	}
</style>