<template>
	<div class="order">
		<panpel class="panpel">
			<div slot="header">
				<el-menu :default-active="active_index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				  	<el-menu-item index="1">未分配</el-menu-item>
				  	<el-menu-item index="2">已分配</el-menu-item>
				  	<el-menu-item index="3">待服务</el-menu-item>
				  	<el-menu-item index="4">服务中</el-menu-item>
				  	<el-menu-item index="5">已完成</el-menu-item>
				</el-menu>
				<div class="bottom">
					<el-input v-model="searche_input" placeholder="请输入内容" class="bottom-input1"></el-input>
					<el-button type="primary" class="bottom-button1">搜索</el-button>
					<el-button type="primary" class="bottom-button2" @click="add_order_switch = true">添加订单</el-button>
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
			                <div class="td" v-if="active_index == '3' || active_index == '4'">服务员工</div>
			                <div class="td" v-else-if="active_index == '5'">完成时间</div>
			                <div class="td">操作</div>
			            </div>
			        </div>
			        <div class="tbody">
			            <div class="tr body-table-tr" v-for="item of data">
			                <div class="td">123456789</div>
			                <div class="td">张三</div>
			                <div class="td">2018-02-11-12:33</div>
			                <div class="td">内容</div>
			                <div class="td">地点</div>
			                <div class="td" v-if="active_index == '3' || active_index == '4'">员工</div>
			                <div class="td" v-else-if="active_index == '5'">2017.3.15</div>
			                <div class="td">
			                	<a href="javascript:void(0)" @click="allot_order_switch = true">分配</a>
			                	<a href="javascript:void(0)">管理</a>
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
		<model-box @selectSubmit="addOrder" :show.sync="add_order_switch" title="添加订单" :width="'40%'">
		  	<div slot="dialog-body">
		    	<el-form ref="form" :model="add_order_data" label-width="115px" :label-position="'right'" :rules="add_order_rules">
		    	  	<el-form-item label="预约客户姓名:" prop="user_name">
		    	    	<el-input v-model="add_order_data.user_name"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="联系电话:" prop="user_phone">
		    	    	<el-input v-model="add_order_data.user_phone"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约时间:">
		    	    	<el-input v-model="add_order_data.user_reservation_time"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约城市:">
		    	    	<el-input v-model="add_order_data.user_reservation_city"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约小区:">
		    	    	<el-input v-model="add_order_data.user_reservation_xiaoqu"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="详细地址:">
		    	    	<el-input v-model="add_order_data.user_reservation_address"></el-input>
		    	  	</el-form-item>
	  	    	  	<el-form-item label="预约大类:">
	  					<el-select v-model="add_order_data.user_reservation_service" clearable placeholder="请选择活动区域">
	  					  	<el-option label="专业清洗" value="shanghai"></el-option>
	  					  	<el-option label="家电清洗" value="beijing"></el-option>
	  					</el-select>
	  	    	  	</el-form-item>
		    	  	<el-form-item label="预约大类的子类:">
						<el-select v-model="add_order_data.user_reservation_service" clearable placeholder="请选择活动区域">
						  	<el-option label="日常清洗" value="shanghai"></el-option>
						  	<el-option label="除尘除螨" value="beijing"></el-option>
						</el-select>
		    	  	</el-form-item>
	  	    	  	<el-form-item label="日常清洁的项目:">
	  					<el-select v-model="add_order_data.user_reservation_service_item" clearable placeholder="请选择活动区域">
	  					  	<el-option label="区域一" value="shanghai"></el-option>
	  					  	<el-option label="区域二" value="beijing"></el-option>
	  					</el-select>
	  	    	  	</el-form-item>
	  	    	  	<el-form-item label="除尘除螨的项目:">
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>床</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="add_order_data.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>沙发</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="add_order_data.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  	</el-form-item>
	  	    	  	<el-form-item label="灯具清洗的项目:">
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>小型灯</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="add_order_data.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>中型灯</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="add_order_data.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  	</el-form-item>
	  	    	  	<el-form-item label="家电清洗的项目:">
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>油烟机</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="add_order_data.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>壁挂式空调</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="add_order_data.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  	</el-form-item>
	  	    	  	<el-form-item label="地板打蜡的项目:">
	  	    	  		<el-radio v-model="add_order_data.radio8" label="1" border size="medium">地板打蜡</el-radio>
	  	    	  		<el-radio v-model="add_order_data.radio8" label="2" border size="medium">地板起腊</el-radio>
	  	    	  		<el-radio v-model="add_order_data.radio8" label="3" border size="medium">起腊打蜡</el-radio>
	  	    	  	</el-form-item>
	  	    	  	<el-form-item label="面积(地板打蜡):">
		    	    	<el-input v-model="add_order_data.user_reservation_city" placeholder="请输入平米数"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="地毯清洗的项目:">
		    	  		<el-radio v-model="add_order_data.radio8" label="1" border size="medium">地板打蜡</el-radio>
		    	  		<el-radio v-model="add_order_data.radio8" label="2" border size="medium">地板起腊</el-radio>
		    	  		<el-radio v-model="add_order_data.radio8" label="3" border size="medium">起腊打蜡</el-radio>
		    	  	</el-form-item>
		    	  	<el-form-item label="面积(地毯清洗):">
		    	    	<el-input v-model="add_order_data.user_reservation_city" placeholder="请输入平米数"></el-input>
		    	  	</el-form-item>
	  	    	  	<el-form-item label="预约备注:">
		    	    	<el-input v-model="add_order_data.user_reservation_remark"></el-input>
		    	  	</el-form-item>
		    	</el-form>
		  	</div>
		</model-box>
		<model-box @selectSubmit="allotOrder" :show.sync="allot_order_switch" title="分配订单">
			<div slot="dialog-body">
				<el-form ref="form" :model="allot_order_data" label-width="115px" :label-position="'right'">
					<el-form-item label="订单编号:">
		    	    	<p>bh989898</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约人:">
		    	    	<p>张三</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="联系电话:">
		    	    	<p>12311112222</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约时间:">
		    	    	<p>2018.3.18</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约地点:">
		    	    	<p>x市x区</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约内容:">
		    	    	<p>日常清理</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="服务项目:">
		    	    	<p>一居室</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约备注:">
		    	    	<p>备注</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="订单金额:">
		    	    	<p>100元</p>
		    	  	</el-form-item>
		    	  	<el-form-item label="地毯清洗的项目:">
		    	  		<el-radio v-model="allot_order_data.radio1" label="1" border size="medium">区域经理</el-radio>
		    	  		<el-radio v-model="allot_order_data.radio1" label="2" border size="medium">员工</el-radio>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约大类:">
	  					<el-select v-model="allot_order_data.daqujingli" clearable placeholder="请选择大区经理">
	  					  	<el-option label="张三" value="shanghai"></el-option>
	  					  	<el-option label="李四" value="beijing"></el-option>
	  					</el-select>
	  	    	  	</el-form-item>
	  	    	  	<el-form-item label="预约大类:">
	  					<el-select v-model="allot_order_data.quyujingli" clearable placeholder="请选择区域经理">
	  					  	<el-option label="张三" value="shanghai"></el-option>
	  					  	<el-option label="李四" value="beijing"></el-option>
	  					</el-select>
	  	    	  	</el-form-item>
				</el-form>
			</div>
		</model-box>
	</div>
</template>

<script type="text/javascript">
import Panpel from "base/panpel"
import ModelBox from "components/modelBox";
	export default {
		components:{
			Panpel,
			ModelBox
		},
		data(){
			return {
				data:10,

				active_index:'1',

				searche_input:'',

		        add_order_switch:false,
		        add_order_data:{
		        	user_name:'',
		        	user_phone:'',
		        	user_reservation_time:'',
		        	user_reservation_city:'',
		        	user_reservation_xiaoqu:'',
		        	user_reservation_address:'',
		        	user_reservation_service:'',
		        	user_reservation_service_item:'',
		        	user_reservation_remark:'',
		        	num1:'',
		        	radio8:''
		        },
		        add_order_rules:{
		        	user_name:[
			        	{required:true,message:'请输入预约人名字',trigger:'blur'},
			        	{min:3,max:5,message:'长度在 3 到 5 个字符',trigger: 'blur'}
		        	],
		        	user_phone:[
		        		{required:true,type:'string',pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,message:'请填写有效的电话号码',trigger:'blur'},
		        	]
		        },


		        allot_order_switch:false,
		        allot_order_data:{
		        	radio1:'',
		        	daqujingli:'',
		        	quyujingli:''
		        },
		        allot_order_rules:[
		        	{},
		        ]
			}
		},
		methods:{
			handleClick(){

			},
			handleSelect(index){
				console.log('index',index);
				this.active_index = index;
			},
			addOrder(){
				console.log('addOrder');
			},
			allotOrder(){
				console.log('allotOrder');
			}
		}
	}
</script>

<style type="text/css" scoped>
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
	.service-item{
		display: flex;
		flex-direction:row;
		box-sizing: border-box;
		border-bottom: 1px solid #eeeeee;
		padding: 5px 0;
	}
	.service-item .left{
		width: 50%;
		box-sizing: border-box;
		padding: 0 0 0 20px;
	}
	.service-item .left p{
		font-size: 14px;
		height: 20px;
		line-height: 20px;
		vertical-align: middle;
	}
	.service-item .right{
		height: 50%;
	}
</style>