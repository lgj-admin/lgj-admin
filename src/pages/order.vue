<template>
	<div class="order">
		<panpel class="panpel">
			<div slot="header">
				<el-menu :default-active="active_index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				  	<el-menu-item index="0">未分配</el-menu-item>
				  	<el-menu-item index="1">已分配</el-menu-item>
				  	<el-menu-item index="2">待服务</el-menu-item>
				  	<el-menu-item index="3">服务中</el-menu-item>
				  	<el-menu-item index="4">已完成</el-menu-item>
				</el-menu>
				<div class="bottom">
					<el-input v-model="searche_input" placeholder="请输入内容" class="bottom-input1"></el-input>
					<el-button type="primary" class="bottom-button1">搜索</el-button>
					<el-button type="primary" class="bottom-button2" @click="addOrder">添加订单</el-button>
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
			                <!-- <div class="td" v-if="active_index == '2' || active_index == '3'">服务员工</div> -->
			                <div class="td" v-if="active_index == '4'">完成时间</div>
			                <div class="td">操作</div>
			            </div>
			        </div>
			        <div class="tbody">
			            <div class="tr body-table-tr" v-for="(item,index) of orderList" :key="index">
			                <div class="td">{{item.order_sn}}</div>
			                <div class="td">{{item.consignee}}</div>
			                <div class="td">{{item.reservation_time}}</div>
			                <div class="td">
                          <div v-for="(item2,index2) in item.goods_list" :key="index2" style="padding:4px 2px;">
                              {{item2.goods_name}}-{{item2.attr_name}}
                          </div>
                      </div>
			                <div class="td">{{item.address}}</div>
			                <!-- <div class="td" v-if="active_index == '2' || active_index == '3'">员工</div> -->
			                <div class="td" v-if="active_index == '4'">{{item.finish_time}}</div>
			                <div class="td">
			                	<a href="javascript:void(0)" @click="handleManagerOrder(item.order_id)">分配订单</a>
			                	<!-- <a href="javascript:void(0)" @click="handleManagerOrder(item.order_id)">管理</a> -->
			                	<a href="javascript:void(0)" @click="handleDelete(item.order_id)">删除</a>
			                </div>
			            </div>
			        </div>
			    </div>
			    <div class="body-page">
			    	<el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
			    </div>
			</div>
		</panpel>
		<model-box @selectSubmit="addOrder" :show.sync="add_order_switch" title="添加订单" :width="'60%'">
		  	<div slot="dialog-body">
		    	<el-form ref="form" :model="ruleForm" label-width="115px" :label-position="'right'" :rules="rules">
		    	  	<el-form-item label="预约客户姓名:" prop="user_name">
		    	    	<el-input v-model="ruleForm.user_name"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="联系电话:" prop="user_phone">
		    	    	<el-input v-model="ruleForm.user_phone"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约时间:">
		    	    	<el-input v-model="ruleForm.user_reservation_time"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约城市:">
		    	    	<el-input v-model="ruleForm.user_reservation_city"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约小区:">
		    	    	<el-input v-model="ruleForm.user_reservation_xiaoqu"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="详细地址:">
		    	    	<el-input v-model="ruleForm.user_reservation_address"></el-input>
		    	  	</el-form-item>
	  	    	  	<el-form-item label="预约大类:">
	  					<el-select v-model="ruleForm.user_reservation_service" clearable placeholder="请选择活动区域">
	  					  	<el-option label="专业清洗" value="shanghai"></el-option>
	  					  	<el-option label="家电清洗" value="beijing"></el-option>
	  					</el-select>
	  	    	  	</el-form-item>
		    	  	<el-form-item label="预约大类的子类:">
						<el-select v-model="ruleForm.user_reservation_service" clearable placeholder="请选择活动区域">
						  	<el-option label="日常清洗" value="shanghai"></el-option>
						  	<el-option label="除尘除螨" value="beijing"></el-option>
						</el-select>
		    	  	</el-form-item>
	  	    	  	<el-form-item label="日常清洁的项目:">
	  					<el-select v-model="ruleForm.user_reservation_service_item" clearable placeholder="请选择活动区域">
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
	  	    	  				<el-input-number size="mini" v-model="ruleForm.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>沙发</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="ruleForm.num1"></el-input-number>
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
	  	    	  				<el-input-number size="mini" v-model="ruleForm.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>中型灯</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="ruleForm.num1"></el-input-number>
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
	  	    	  				<el-input-number size="mini" v-model="ruleForm.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  		<div class="service-item">
	  	    	  			<div class="left">
	  	    	  				<p>壁挂式空调</p>
	  	    	  				<p>100元</p>
	  	    	  			</div>
	  	    	  			<div class="right">
	  	    	  				<el-input-number size="mini" v-model="ruleForm.num1"></el-input-number>
	  	    	  			</div>
	  	    	  		</div>
	  	    	  	</el-form-item>
	  	    	  	<el-form-item label="地板打蜡的项目:">
	  	    	  		<el-radio v-model="ruleForm.radio8" label="1" border size="medium">地板打蜡</el-radio>
	  	    	  		<el-radio v-model="ruleForm.radio8" label="2" border size="medium">地板起腊</el-radio>
	  	    	  		<el-radio v-model="ruleForm.radio8" label="3" border size="medium">起腊打蜡</el-radio>
	  	    	  	</el-form-item>
	  	    	  	<el-form-item label="面积(地板打蜡):">
		    	    	<el-input v-model="ruleForm.user_reservation_city" placeholder="请输入平米数"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="地毯清洗的项目:">
		    	  		<el-radio v-model="ruleForm.radio8" label="1" border size="medium">地板打蜡</el-radio>
		    	  		<el-radio v-model="ruleForm.radio8" label="2" border size="medium">地板起腊</el-radio>
		    	  		<el-radio v-model="ruleForm.radio8" label="3" border size="medium">起腊打蜡</el-radio>
		    	  	</el-form-item>
		    	  	<el-form-item label="面积(地毯清洗):">
		    	    	<el-input v-model="ruleForm.user_reservation_city" placeholder="请输入平米数"></el-input>
		    	  	</el-form-item>
	  	    	  	<el-form-item label="预约备注:">
		    	    	<el-input v-model="ruleForm.user_reservation_remark"></el-input>
		    	  	</el-form-item>
		    	</el-form>
		  	</div>
		</model-box>
		<model-box :show.sync="allot_order_switch" title="分配订单" :width="'40%'" :showButton="false">
			<div slot="dialog-body">
          <el-form ref="form" :model="ruleForm" label-width="115px" :label-position="'right'">
              <el-form-item label="订单编号:">
                  <p>{{order_details.order_sn}}</p>
              </el-form-item>
              <el-form-item label="预约人:">
                  <p>{{order_details.consignee}}</p>
              </el-form-item>
              <el-form-item label="联系电话:">
                  <p>{{order_details.mobile}}</p>
              </el-form-item>
              <el-form-item label="预约时间:">
                  <p>{{order_details.reservation_time}}</p>
              </el-form-item>
              <el-form-item label="预约地点:">
                  <p>{{order_details.address}}</p>
              </el-form-item>
              <el-form-item label="预约内容:">
                  <p v-for="(item,index) in order_details.goods_info" :key="index">{{item.goods_name}}——{{item.attr_name}}</p>
              </el-form-item>
              <el-form-item label="预约备注:">
                  <p>{{order_details.user_note}}</p>
              </el-form-item>
              <el-form-item label="订单金额:">
                  <p>{{order_details.order_amount}}</p>
              </el-form-item>
              <el-form-item label="分配对象:">
                  <el-radio v-model="ruleForm.identityRadio" label="1" border size="medium">大区经理</el-radio>
                  <el-radio v-model="ruleForm.identityRadio" label="2" border size="medium">区域经理</el-radio>
                  <el-radio v-model="ruleForm.identityRadio" label="3" border size="medium">员工</el-radio>
              </el-form-item>
              <el-form-item label="大区经理:" v-if="ruleForm.identityRadio == 1">
                  <a href="javascript:void(0)" @click="selectEmployee = true" style="vertical-align: top;">分配</a>
              </el-form-item>
              <el-form-item label="区域经理:" v-if="ruleForm.identityRadio == 2">
                  <a href="javascript:void(0)" @click="selectEmployee = true" style="vertical-align: top;">分配</a>
              </el-form-item>
              <el-form-item label="服务内容:" v-if="ruleForm.identityRadio == 3">
                  <div>
                      <ul>
                          <li v-for="(item,index) in order_details.goods_info" :key="index">
                              {{item.goods_name}}——{{item.attr_name}} <a href="javascript:void(0)" @click="handleSelectEmployee(item.rec_id)" style="vertical-align: top;">分配</a>
                          </li>
                      </ul>
                  </div>
              </el-form-item>
          </el-form>
			</div>
		</model-box>
    <model-box @selectSubmit="allocateOrder('ruleForm')"  :show.sync="selectEmployee" title="选择员工" :width="'40%'">
        <div class="body-table table" slot="dialog-body">
 					    <div class="thead body-table-thead">
 					        <div class="tr">
                      <div class="td">员工姓名</div>
                      <div class="td">员工电话</div>
                      <div class="td">员工状态</div>
 					        </div>
 					    </div>
 					    <div class="tbody">
 					        <div class="tr body-table-tr">
 					            <div class="td">
 					        		    <el-checkbox v-model="ruleForm.checked"></el-checkbox>
                         员工
                      </div>
 					            <div class="td">12312345678</div>
 					            <div class="td">空闲</div>
 					        </div>
 					    </div>
 					</div>
    </model-box>
	</div>
</template>

<script type="text/javascript">
import Panpel from "base/panpel"
import ModelBox from "components/modelBox";
import {ApiDataModule,CODE_OK,CODE_ERR} from "config/axios.js";


	export default {
		components:{
			Panpel,
			ModelBox
		},
		data(){
			return {
				active_index:'0',//tab索引
				searche_input:'',//搜索框value
        add_order_switch:false,//添加订单模态框状态
        selectEmployee:false,//选择员工模态框状态
        allot_order_switch:false,//分配订单模态框value
        ruleForm:{
          identityRadio:'1',
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
        rules:{
          user_name:[
            {required:true,message:'请输入预约人名字',trigger:'blur'},
            {min:3,max:5,message:'长度在 3 到 5 个字符',trigger: 'blur'}
          ],
          user_phone:[
            {required:true,type:'string',pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,message:'请填写有效的电话号码',trigger:'blur'},
          ]
        },
        orderList:[],//订单列表
        order_id:null,//订单id
        order_details:{},//订单详情数据
			}
    },
    created(){
      ApiDataModule('GETORDERLIST',{
        status:this.active_index
      }).then(res=>{
        this.orderList = res.data;
        console.log(res);
      })
    },
		methods:{
      addOrder(){
        this.add_order_switch = true;
        this.order_id = null;
      },
      //处理商品内容
      handleGoodsList(list){
        list.map((item,index)=>{

        })
      },
      //分配订单
      handleManagerOrder(id){
        this.order_id = id;
        this.allot_order_switch = true;
        ApiDataModule('GETORDERINFO',{
          id:id
        }).then(res=>{
          console.log(res);
          this.order_details = res.data;
        })
      },
      //分配订单到员工
      handleSelectEmployee(rec_id){
        this.selectEmployee = true;
      },
      allocateOrder(formName){
        console.log('allotOrder');
        this.$refs[formName].validate(valid=>{
          if(valid){
            this.selectEmployee = false;
          }else{
            return false;
          }
        })
			},
			handleClick(){

			},
			handleSelect(index){
				console.log('index',index);
        this.active_index = index;
        ApiDataModule('GETORDERLIST',{
          status:this.active_index
        }).then(res=>{
          this.orderList = res.data;
          console.log(res);
        })
			},
			addOrder(){
				console.log('addOrder');
			},
      //删除
      handleDelete(id) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            ApiDataModule("EMPLOYEEDELETE", { id: id }).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                ApiDataModule("EMPLOYEELIST").then(res => {
                  this.employeeList = res.data.data;
                  this.total = res.data.total;
                  this.page = res.data.current_page;
                });
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
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
