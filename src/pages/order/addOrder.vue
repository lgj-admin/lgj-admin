<template>
    <div class="addOrder">
        <el-form ref="ruleForm" :model="ruleForm" label-width="115px" :label-position="'right'" :rules="rules">
		    	  	<el-form-item label="联系人:" prop="order_name">
		    	    	  <el-input v-model="ruleForm.order_name"></el-input>
		    	  	</el-form-item>
              <el-form-item label="联系电话:" prop="order_phone">
		    	    	  <el-input v-model="ruleForm.order_phone"></el-input>
		    	  	</el-form-item>
              <el-form-item label="预约客户账号:" prop="order_account_number">
		    	    	  <el-input v-model="ruleForm.order_account_number"></el-input>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约日期:" prop="order_reservation_date">
		    	    	  <el-menu
                      :default-active="ruleForm.order_reservation_date"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelectDate"
                  >
                      <el-menu-item
                          v-for="(item,index) in dateList"
                          :key="index" :index="item">
                          {{item}}
                      </el-menu-item>
                  </el-menu>
		    	  	</el-form-item>
              <el-form-item label="预约时间:" prop="order_reservation_time">
                  <el-menu
                      :default-active="ruleForm.order_reservation_time"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelectTime"
                  >
                      <el-menu-item
                          v-model="ruleForm.order_reservation_time"
                          v-for="(item,index) in Time"
                          :key="index" :index="item">
                          {{item}}
                      </el-menu-item>
                  </el-menu>
		    	  	</el-form-item>
		    	  	<el-form-item label="预约城市:" prop="order_reservation_city">
                  <el-select
                      v-model="ruleForm.order_reservation_city"
                      clearable placeholder="请选择预约城市"

                  >
                      <el-option
                          v-for="item in cityList"
                          :key="item.id"
                          :label="item.city"
                          :value="item.id"
                      >
                      </el-option>
                  </el-select>
		    	  	</el-form-item>
		    	  	<el-form-item label="详细地址:" prop="order_reservation_address">
		    	    	  <el-input v-model="ruleForm.order_reservation_address"></el-input>
		    	  	</el-form-item>
              <el-form-item label="选择服务分类" prop="serviceCategory">
                  <el-select v-model="ruleForm.serviceCategory" placeholder="服务分类" @change="handleGetServiceItem">
                        <el-option
                              v-for="item in getCategoryList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="选择服务项目" prop="serviceItem">
                    <el-select v-model="ruleForm.serviceItem" placeholder="服务项目" @change="handleGetGoodsItem">
                        <el-option
                              v-for="item in getGoodsArray"
                              :key="item.goods_id"
                              :label="item.goods_name"
                              :value="item.goods_id">
                        </el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="选择服务" :prop="extend_cat_id == 1?'checkServiceItem':'selectServiceItem'">
                    <div class="selectproject">
                        <div v-if="extend_cat_id == 1">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="CheckAllChange">名称</el-checkbox>
                        </div>
                        <div v-if="extend_cat_id != 1">名称</div>
                        <div v-if="extend_cat_id == 2">单价</div>
                        <div v-if="extend_cat_id == 3">服务面积</div>
                        <div v-if="extend_cat_id == 1 || extend_cat_id == 3">套餐单价</div>
                        <div v-if="extend_cat_id != null">员工提成</div>
                        <div  v-if="extend_cat_id == 1">服务数量</div>
                    </div>
                    <div class="selectproject" v-if="extend_cat_id == 2" v-for="(item,index) in goodsAttributesList" :key="index">
                        <div>
                            <el-radio-group v-model="ruleForm.selectServiceItem">
                                <el-radio v-if="extend_cat_id == 2"  :label="item.sgp_id">{{item.key_name}}</el-radio>
                            </el-radio-group>
                        </div>
                        <div>
                            {{item.price}}元
                        </div>
                        <div>
                            {{item.mc_rebate}}%
                        </div>
                    </div>
                    <div class="selectproject" v-if="extend_cat_id == 1" v-for="(item,index) in goodsAttributesList" :key="index">
                        <div>
                            <el-checkbox-group v-model="ruleForm.checkServiceItem" @change="handleCheckedCitiesChange">
                                <el-checkbox :label="item.sgp_id" :value="item.sgp_id" :key="index">{{item.key_name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div>
                            {{item.price}}元
                        </div>
                        <div>
                            {{item.mc_rebate}}%
                        </div>
                        <div>
                            <cart-contral  :count="item"></cart-contral>
                        </div>
                    </div>
                    <div class="selectproject" v-if="extend_cat_id == 3" v-for="(item,index) in goodsAttributesList" :key="index">
                        <div>
                            <el-radio-group v-model="ruleForm.selectServiceItem">
                                <el-radio v-if="extend_cat_id == 3"  :label="item.sgp_id">{{item.key_name}}</el-radio>
                            </el-radio-group>
                        </div>
                        <div>
                            <input
                                type="text"
                                :class="`packagearea${item.sgp_id}`"
                                style="border:1px solid #ccc;width:60px;"
                                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                            />
                        </div>
                        <div>
                            {{item.price}}元
                        </div>
                        <div>
                            {{item.mc_rebate}}%
                        </div>
                    </div>
              </el-form-item>
              <el-form-item label="预约备注:" prop="order_reservation_remark">
                  <el-input v-model="ruleForm.order_reservation_remark" type="textarea"></el-input>
		    	  	</el-form-item>
              <div class="selectproject">
                  <el-button @click="handleAddOrder('ruleForm')">提交</el-button>
              </div>
		    	</el-form>
    </div>
</template>

<script>
import CartContral from "components/cartcontral";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import { isMobil } from "config/utils";

export default {
  props: {
    orderid: {
      type: Number,
      default: null
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入手机号"));
      } else {
        if (this.ruleForm.checkPhone !== null) {
          if (!isMobil(value)) {
            callback(new Error("请输入正确手机号"));
          }
        }
        callback();
      }
    };
    return {
      goodsAttributesList: [],
      selectgoodsItemList: [],
      extend_cat_id: null, //服务项目类型
      getGoodsArray: [],
      getCategoryList: [],
      dateList: [],
      cityList: [],
      checkAll: false,
      isIndeterminate: false,
      ruleForm: {
        goods_attr: [],
        serviceTotal: null,
        order_name: null, //联系人
        order_phone: null, //联系电话
        order_account_number: null, //预约客户账号
        order_reservation_date: null, //预约日期
        order_reservation_time: null, //预约时间
        order_reservation_city: "", //预约城市
        order_reservation_address: "", //预约详细地址
        serviceCategory: null, //选择服务分类Value
        serviceItem: null, //选择服务项目Value
        selectServiceItem: null, //选择服务Value
        checkServiceItem: [], //选择服务复选框Value
        order_reservation_remark: "" //预约备注
      },
      rules: {
        order_name: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        order_phone: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ],
        order_account_number: [
          { required: true, message: "请输入预约客户账户", trigger: "blur" }
        ],
        order_reservation_city: [
          { required: true, message: "请选择预约城市", trigger: "change" }
        ],
        order_reservation_address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        serviceCategory: [
          { required: true, message: "请选择服务分类", trigger: "change" }
        ],
        selectServiceItem: [
          { required: true, message: "请选择服务", trigger: "change" }
        ],
        checkServiceItem: [
          { required: true, message: "请选择服务", trigger: "change" }
        ],
        serviceItem: [
          { required: true, message: "请选择服务项目", trigger: "change" }
        ],
        order_reservation_date: [
          { required: true, message: "请选择日期", trigger: "blur" }
        ],
        order_reservation_time: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      },
      Time: [
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00"
      ]
    };
  },
  created() {
    //获取七天日期
    ApiDataModule("GETDATEADDSEVEN").then(res => {
      console.log(res);
      this.dateList = res.data;
      this.$nextTick(() => {
        this.ruleForm.order_reservation_date = this.dateList[0];
        this.ruleForm.order_reservation_time = this.Time[0];
      });
    });
    //服务分类列表
    ApiDataModule("GETCATEGORY").then(res => {
      console.log(res);
      this.getCategoryList = res.data;
    });
    //获取城市数据
    ApiDataModule("CITYLIST").then(res => {
      console.log(res);
      this.cityList = res.data.data;
    });
    if (this.orderid) {
      console.log("存在", this.orderid);
    } else {
      console.log("不存在", this.orderid);
    }
  },
  methods: {
    //全选事件
    CheckAllChange(e, val) {
      console.log(e, val);
      var newArticList = [];
      this.goodsAttributesList.map(function(item, index) {
        newArticList.push(item.sgp_id);
      });
      this.ruleForm.checkServiceItem = this.checkAll ? newArticList : [];
      this.isIndeterminate = false;
    },
    //复选框事件
    handleCheckedCitiesChange(value) {
      console.log(value);
      this.ruleForm.checkServiceItem = value;
      var checkedCount = value.length;
      this.checkAll = checkedCount === this.goodsAttributesList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.goodsAttributesList.length;
    },
    //通过分类获取商品
    handleGetServiceItem(id) {
      this.ruleForm.serviceItem = null;
      this.ruleForm.selectServiceItem = null;
      this.ruleForm.checkServiceItem = [];

      ApiDataModule("GETGOODSBYCATE", {
        cate: id
      }).then(res => {
        console.log(res);
        if (res.code == CODE_OK) {
          this.getGoodsArray = res.data;
        }
      });
    },
    //根据商品获取商品属性
    handleGetGoodsItem(id) {
      ApiDataModule("GETATTRBYGOODS", {
        id: id
      }).then(res => {
        console.log(res, "根据商品获取商品属性");
        this.extend_cat_id = res.data.info.extend_cat_id;
        this.goodsAttributesList = res.data.list;
      });
    },
    getSelectGoodsItemList() {
      let btn = true;
      this.ruleForm.serviceTotal = null;
      this.selectgoodsItemList = [];
      this.ruleForm.goods_attr = [];
      let total = 0;
      if (this.extend_cat_id == 1) {
        this.goodsAttributesList.map((item,index)=>{
          this.ruleForm.checkServiceItem.filter((item2,index2)=>{
              if(item.sgp_id == item2){
                this.selectgoodsItemList.push(item);
              }
          });
        })
        this.selectgoodsItemList.map((item,index)=>{
          this.ruleForm.goods_attr.push({
            goods_num:item.count,
            price:item.price,
            sgp_id:item.sgp_id,
            key_name:item.key_name
          })
        })
        console.log(this.ruleForm.goods_attr,'aaaaaaaaaaaaa')
        this.ruleForm.goods_attr.map((item2,index2)=>{
          total += item2.goods_num * item2.price;
        })
        this.ruleForm.serviceTotal = total;
        return btn;
      }
      if (this.extend_cat_id != 1) {
        this.goodsAttributesList.map((item, index) => {
          if (item.sgp_id == this.ruleForm.selectServiceItem) {
            if (this.extend_cat_id == 3) {
              let packagearea = `packagearea${item.sgp_id}`;
              if (document.getElementsByClassName(packagearea)[0].value != "") {
                item.count = document.getElementsByClassName(
                  packagearea
                )[0].value;
              } else {
                this.$message({
                  type: "warning",
                  message: "面积不能为空"
                });
                btn = false;
                return;
              }
            }
            console.log(item, "dszfdsfds");
            this.selectgoodsItemList.push(item);
          }
        });
        this.selectgoodsItemList.map((item,index)=>{
          this.ruleForm.goods_attr.push({
            goods_num:item.count,
            price:item.price,
            sgp_id:item.sgp_id,
            key_name:item.key_name
          })
        })
        console.log(this.ruleForm.goods_attr,'bbbbbbbbbbbbbb');
        this.ruleForm.goods_attr.map((item2,index2)=>{
          total += item2.goods_num * item2.price;
        })
        this.ruleForm.serviceTotal = total;
        return btn;
      }
    },
    handleAddOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.getSelectGoodsItemList()) {
            return;
          }
          this.$emit("selectAddOrder", this.ruleForm);
        } else {
          return false;
        }
      });
    },
    handleSelectDate(e) {
      this.ruleForm.order_reservation_date = e;
      console.log(this.ruleForm.order_reservation_date, "asdasd");
    },
    handleSelectTime(e) {
      this.ruleForm.order_reservation_time = e;
    }
  },
  components: {
    CartContral
  }
};
</script>

<style scoped>
.selectproject {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.selectproject > div {
  flex: 1;
  text-align: left;
}
.select-time {
  padding: 5px 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
}
</style>

