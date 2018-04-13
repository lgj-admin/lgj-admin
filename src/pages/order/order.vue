<template>
	<div class="order">
		<panpel class="panpel">
			<div slot="header">
				<el-menu :default-active="active_index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				  	<el-menu-item index="0">未分配</el-menu-item>
				  	<el-menu-item index="1">分配中</el-menu-item>
				  	<el-menu-item index="2">待服务</el-menu-item>
				  	<el-menu-item index="3">服务中</el-menu-item>
				  	<el-menu-item index="4">已完成</el-menu-item>
				</el-menu>
				<div class="bottom">
					<el-input v-model="searche_input" placeholder="请输入内容" class="bottom-input1"></el-input>
					<el-button type="primary" class="bottom-button1">搜索</el-button>
					<el-button type="primary" class="bottom-button2" @click="addOrder()">添加订单</el-button>
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
			                <div class="td" v-if="active_index == '1'">分配状态</div>
			                <div class="td" v-if="active_index == '2' || active_index == '3' || active_index == '4'">服务员工</div>
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
			                <div class="td" v-if="active_index == '1'">{{allocateStatus(item.area_boss_id)}}</div>
			                <div class="td" v-if="active_index == '2' || active_index == '3' || active_index == '4'">
                          <div v-for="(item3,index3) in item.goods_list" :key="index3" style="padding:4px 2px;">
                              {{item3.staff_name}}
                          </div>
                      </div>
			                <div class="td" v-if="active_index == '4'">{{item.finish_time}}</div>
			                <div class="td">
			                	<a href="javascript:void(0)" @click="handleManagerOrder(item.order_id)" v-if="active_index == '1' || active_index=='0'">分配订单</a>
			                	<a href="javascript:void(0)" @click="handleManagerOrder(item.order_id)" v-if="active_index == '2' || active_index=='3'">管理</a>
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
		<model-box  :show.sync="add_order_switch" :showButton="false" title="添加订单" :width="'60%'">
		  	<div slot="dialog-body">
            <add-order v-if="add_order_switch" @selectAddOrder="handleAddOrder" :orderid="id"></add-order>
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
                  <span>{{order_details.city_boss_name}}</span>
                  <a href="javascript:void(0)" @click="handleSelectOrder(1,1,1)" style="vertical-align: top;">分配</a>
              </el-form-item>
              <el-form-item label="区域经理:" v-if="ruleForm.identityRadio == 2">
                  <span>{{order_details.area_boss_name}}</span>
                  <a href="javascript:void(0)" @click="handleSelectOrder(2,2,2)" style="vertical-align: top;">分配</a>
              </el-form-item>
              <el-form-item label="服务内容:" v-if="ruleForm.identityRadio == 3">
                  <div>
                      <ul>
                          <li v-for="(item,index) in order_details.goods_info" :key="index">
                              <span>{{item.goods_name}}——{{item.attr_name}}</span>
                              <span>{{item.staff_name}}</span>
                              <a href="javascript:void(0)" @click="handleSelectOrder(item.goods_id,item.rec_id,3)" style="vertical-align: top;">分配</a>
                          </li>
                      </ul>
                  </div>
              </el-form-item>
          </el-form>
			</div>
		</model-box>
    <model-box @selectSubmit="allocateOrder()"  :show.sync="selectEmployee" title="选择员工" :width="'60%'">
        <div class="body-table table" slot="dialog-body">
 					    <div class="thead body-table-thead">
                 <div class="tr" v-if="ruleForm.identityRadio == 1">
                      <div class="td" style="text-align: left;">大区经理姓名</div>
                      <div class="td" style="text-align: left;">城市</div>
 					        </div>
                 <div class="tr" v-if="ruleForm.identityRadio == 2">
                      <div class="td" style="text-align: left;">区域经理姓名</div>
                      <div class="td" style="text-align: left;">区域经理电话</div>
 					        </div>
 					        <div class="tr" v-if="ruleForm.identityRadio == 3">
                      <div class="td" style="text-align: left;">员工姓名</div>
                      <div class="td" style="text-align: left;">员工电话</div>
                      <div class="td" style="text-align: left;">员工状态</div>
 					        </div>
 					    </div>
 					    <div class="tbody">
                  <div class="tr body-table-tr" v-for="(item,index) in staffList" :key="index"  v-if="ruleForm.identityRadio == 1">
 					            <div class="td td-word" style="text-align: left;">
                          <el-radio v-model="selectRadioValue" :label="item.admin_id">{{item.user_name}}</el-radio>
                      </div>
 					            <div class="td" style="text-align: left;">{{item.city_name}}</div>
 					        </div>
                   <div class="tr body-table-tr" v-for="(item,index) in staffList" :key="index"  v-if="ruleForm.identityRadio == 2">
 					            <div class="td" style="text-align: left;">
                          <el-radio v-model="selectRadioValue" :label="item.id">{{item.name}}</el-radio>
                      </div>
 					            <div class="td" style="text-align: left;">{{item.tel}}</div>
 					        </div>
 					        <div class="tr body-table-tr" v-for="(item,index) in staffList" :key="index" v-if="ruleForm.identityRadio == 3">
 					            <div class="td" style="text-align: left;">
                          <el-radio v-model="selectRadioValue" :label="item.id">{{item.name}}</el-radio>
                      </div>
 					            <div class="td" style="text-align: left;">{{item.tel}}</div>
 					            <div class="td" style="text-align: left;">{{getWorkStatus(item.work_status)}}</div>
 					        </div>

 					    </div>
 					</div>
    </model-box>
	</div>
</template>

<script type="text/javascript">
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import addOrder from "./addOrder";



export default {
  components: {
    Panpel,
    ModelBox,
    addOrder
  },
  data() {
    return {
      id:null,
      active_index: "0", //tab索引
      searche_input: "", //搜索框value
      add_order_switch: false, //添加订单模态框状态
      selectEmployee: false, //选择员工模态框状态
      allot_order_switch: false, //分配订单模态框value
      selectRadioValue: null, //选择员工/大区经理/区域经理value id
      goodsAttributesList:[],
      extend_cat_id: null, //服务项目类型
      getGoodsArray:[],
      getCategoryList:[],
      ruleForm: {
        identityRadio: "1", //分配对象radio
      },
      rules: {
      },
      orderList: [], //订单列表
      order_id: null, //订单id
      order_details: {}, //订单详情数据
      rec_id: null, //订单商品id
      staffList: [], //员工列表
      cityBossId: null, //大区经理id
      areaBossId: null //区域经理id
    };
  },
  created() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      //订单列表
      ApiDataModule("GETORDERLIST", {
        status: this.active_index
      }).then(res => {
        this.orderList = res.data;
        console.log(res);
      });
    },
    addOrder() {
      this.add_order_switch = true;
      this.order_id = null;
    },
    //添加订单
    handleAddOrder(form) {
      console.log(form)
      let formData = {};
      if(form){
        formData.user_tel = form.order_account_number;//用户账号
        formData.consignee = form.order_name;//联系人
        formData.city = form.order_reservation_city; //预约城市
        formData.address = form.order_reservation_address;//详细地址
        formData.mobile = form.order_phone;//联系电话
        formData.user_note = form.order_reservation_remark;//预约备注
        formData.goods_id = form.serviceItem;//服务id

        formData.total_price = form.serviceTotal;//商品价格
        formData.reservation_time = `${form.order_reservation_date} ${form.order_reservation_time}`;//预约时间
        formData.goods_attr = form.goods_attr;//服务数组

      }
      ApiDataModule('ADDORDER',formData).then(res=>{
        console.log(res,'sdfsdf');
        if(res.code == CODE_OK){
          this.add_order_switch = false;
          this.$message({type:'success',message:'添加成功'})
        }else{
          this.$message({type:'warning',message:res.msg})
        }
        // this.add_order_switch = false;
      })
    },
    //分配订单
    handleManagerOrder(id) {
      this.order_id = id;
      this.allot_order_switch = true;
      ApiDataModule("GETORDERINFO", {
        id: id
      }).then(res => {
        console.log(res);
        this.order_details = res.data;
        if (res.data.area_boss_id != 0 || res.data.area_boss_id != null) {
          this.areaBossId = res.data.area_boss_id;
        }
        if (res.data.city_boss_id != 0 || res.data.city_boss_id != null) {
          this.cityBossId = res.data.city_boss_id;
        }
      });
    },
    //分配订单
    handleSelectOrder(id, rec_id, type) {
      this.selectEmployee = true;
      const formData = {};
      if (type == 1) {
        //分配订单到大区经理
        ApiDataModule("GETCITYBOSS").then(res => {
          console.log(res);
          this.staffList = res.data;
        });
        return;
      }
      if (type == 2) {
        //分配订单到区域经理
        if (!this.cityBossId) {
          this.selectEmployee = false;
          this.$message({ type: "warning", message: "请先分配到大区经理" });
          this.ruleForm.identityRadio = "1";
          return;
        }
        formData.id = this.cityBossId;
        ApiDataModule("GETAREABOSSBYCITY", formData).then(res => {
          console.log(res);
          this.staffList = res.data;
        });
        return;
      }
      if (type == 3) {
        //分配到员工
        if (!this.areaBossId) {
          this.selectEmployee = false;
          this.$message({ type: "warning", message: "请先分配到区域经理" });
          this.ruleForm.identityRadio = "2";
          return;
        }
        formData.id = id;
        formData.area_id = this.areaBossId;
        this.rec_id = rec_id;
        ApiDataModule("GETSTAFFBYGOODS", formData).then(res => {
          console.log(res);
          this.staffList = res.data;
        });
        return;
      }
    },
    allocateOrder() {
      console.log("allotOrder");
      if (this.selectRadioValue == null) {
        this.$message({ type: "warning", message: "请选择分配人员" });
        return;
      }
      const formData = {
        status: this.ruleForm.identityRadio,
        order_id: this.order_id
      };
      if (this.ruleForm.identityRadio == 1) {
        //大区经理
        formData.city_id = this.selectRadioValue;
        this.cityBossId = this.selectRadioValue;
      } else if (this.ruleForm.identityRadio == 2) {
        //区域经理
        formData.area_id = this.selectRadioValue;
        this.areaBossId = this.selectRadioValue;
      } else if (this.ruleForm.identityRadio == 3) {
        //员工
        console.log("bbb");
        formData.rec_id = this.rec_id;
        formData.staff_id = this.selectRadioValue;
      }
      ApiDataModule("DISTRIBUTIONORDER", formData).then(res => {
        if (res.code == CODE_OK) {
          ApiDataModule("GETORDERLIST", {
            status: this.active_index
          }).then(res => {
            this.orderList = res.data;
          });
          this.$message({ type: "success", message: "分配成功" });
          this.handleManagerOrder(this.order_id);
          this.selectEmployee = false;
          this.selectRadioValue = null;
        } else {
          this.$message({ type: "warning", message: res.msg });
        }
        console.log(res);
      });
    },
    handleSelect(index) {
      console.log("index", index);
      this.active_index = index;
      ApiDataModule("GETORDERLIST", {
        status: this.active_index
      }).then(res => {
        this.orderList = res.data;
        console.log(res);
      });
    },
    //员工工作状态
    getWorkStatus(index) {
      if (index == 0) {
        return "空闲";
      }
      if (index == 1) {
        return "工作中";
      }
    },
    //列表分配状态
    allocateStatus(index) {
      if (index == 0) {
        return "已分配到大区经理";
      }
      if (index != 0) {
        return "已分配到区域经理";
      }
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
};
</script>

<style type="text/css" scoped>
.bottom {
  padding: 10px 0;
  box-sizing: border-box;
}
.bottom .bottom-input1 {
  width: 230px;
}
.bottom .bottom-button1 {
  margin-left: 10px;
}
.bottom .bottom-button2 {
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
.body-page {
  padding: 10px 0;
  text-align: right;
}
.service-item {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
  padding: 5px 0;
}
.service-item .left {
  width: 50%;
  box-sizing: border-box;
  padding: 0 0 0 20px;
}
.service-item .left p {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
}
.service-item .right {
  height: 50%;
}
.selectproject {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.selectproject > div {
  flex: 1;
  text-align: left;
}
</style>
