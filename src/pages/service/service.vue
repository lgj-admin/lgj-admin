<template>
    <div class="service">
        <panpel>
            <div slot="header" class="header-content">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">服务分类</el-menu-item>
                    <el-menu-item index="2">服务内容</el-menu-item>
                    <el-menu-item index="3">生活套餐</el-menu-item>
                    <el-menu-item index="4">上传图标</el-menu-item>
                </el-menu>
                <div class="bottom">
                    <div class="header-content-left">
                        <el-button v-show="activeIndex == 1" @click="handleAddMethods('addServiceCategory')" type="primary">添加分类</el-button>
                        <el-button v-show="activeIndex == 2" @click="handleAddMethods('addService')" type="primary">添加服务</el-button>
                        <el-button v-show="activeIndex == 3" @click="handleAddMethods('addpackage')" type="primary">添加生活套餐</el-button>
                        <!-- <el-button  @click="addlifepackage = true" type="primary">上传服务图标</el-button> -->
                        <upload
                            v-show="activeIndex == 4"
                            @selectUpload="handleUploadFile"
                            listType="file">
                        </upload>
                        <span v-show="activeIndex == 4">上传图标 (建议尺寸:200X200)</span>
                    </div>
                    <div class="header-content-right">
                    </div>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div  v-if="activeIndex == 1">
                        <div class="body-table table">
                            <div class="thead body-table-thead">
                                <div class="tr">
                                    <div class="td">分类名称</div>
                                    <div class="td">操作</div>
                                </div>
                            </div>
                            <div class="tbody">
                                <div class="tr body-table-tr" v-for="(item,index) in getCategoryList" :key="index">
                                    <div class="td">{{item.name}}</div>
                                    <div class="td">
                                      <a href="javascript:void(0)" @click="handleEditServiceItem(item.id,'editServiceCategory')">编辑</a>
                                      <a href="javascript:void(0)" @click="handleDelete(item.id,'getCategoryList')">删除</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-table table" v-if="activeIndex == 2">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">服务名称</div>
                                <div class="td">服务分类</div>
                                <div class="td">价格</div>
                                <div class="td">全部地区</div>
                                <div class="td">上架</div>
                                <div class="td">首页分类展示</div>
                                <div class="td">精选</div>
                                <!-- <div class="td">排序</div> -->
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in getGoodsList" :key="index">
                                <div class="td">{{item.goods_name}}</div>
                                <div class="td">{{item.cat_name}}</div>
                                <div class="td">{{item.min_price}}起</div>
                                <div class="td">{{item.shipping_area_city}}</div>
                                <div class="td" @click="changeStatus(item.goods_id,item.is_on_sale,'is_on_sale','service')" style="cursor:pointer;">
                                  <a href="javascript:void(0)">{{judgmentStatus(item.is_on_sale,'is_on_sale')}}</a>
                                </div>
                                <div class="td" @click="changeStatus(item.goods_id,item.is_on_sale,'is_hot','service')" style="cursor:pointer;">
                                  <a href="javascript:void(0)">{{judgmentStatus(item.is_hot,'is_hot')}}</a>
                                </div>
                                <div class="td" @click="changeStatus(item.goods_id,item.is_on_sale,'is_new','service')" style="cursor:pointer;">
                                  <a href="javascript:void(0)">{{judgmentStatus(item.is_new,'is_new')}}</a>
                                </div>
                                <!-- <div class="td">1</div> -->
                                <div class="td">
                                  <a href="javascript:void(0)" @click="handleEditServiceItem(item.goods_id,'getGoodsInfo')">编辑</a>
                                  <a href="javascript:void(0)" @click="handleDelete(item.goods_id,'deleteService')">删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-table table" v-if="activeIndex == 3">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">服务名称</div>
                                <div class="td">价格</div>
                                <div class="td">全部地区</div>
                                <div class="td">上架</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in getServerPackageList" :key="index">
                                <div class="td">{{item.goods_name}}</div>
                                <div class="td">{{item.market_price}}</div>
                                <div class="td">太原</div>
                                <div class="td" @click="changeStatus(item.goods_id,item.is_on_sale,'is_on_sale','package')">
                                  <a href="javascript:void(0)">{{judgmentStatus(item.is_on_sale,'is_on_sale')}}</a>
                                </div>
                                <div class="td">
                                  <a href="javascript:void(0)" @click="handleEditServiceItem(item.goods_id,'editPackageService')">编辑</a>
                                  <a href="javascript:void(0)" @click="handleDelete(item.goods_id,'deletePackage')">删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="serviceIcon-content">
                        <div class="serviceIcon-item" v-if="activeIndex == 4"  v-for="(item,index) in iconList" :key="index" >
                            <img :src="item.url" alt="" width='40' height="40">
                            <div class="serviceIcon-delete">
                                <i class="el-icon-delete" @click="handleDelete(item.id,'serviceIcon')"></i>
                            </div>
                        </div>
                    </div>
                    <div class="body-page">
                        <!-- <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000"
                        >
                        </el-pagination> -->
                    </div>
                </div>
            </div>
        </panpel>
        <model-box
            @selectSubmit="handleAddService('ruleForm')"
            :show.sync="addcategory"
            :title="!categoryId?'添加分类':'编辑分类'"
        >
            <div slot="dialog-body">
                <el-form
                    v-if="addcategory"
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    :status-icon="true"
                    label-width="35%"
                >
                    <el-form-item label="分类名称" prop="categoryName">
                        <el-input v-model="ruleForm.categoryName" placeholder="请输入服务分类名称"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box
            :show.sync="addservice"
            title="添加服务"
            :showButton="false"
            width="70%">
            <div slot="dialog-body">
                <add-service
                    v-if="addservice"
                    @selectAddService="handleSubmitAddService"
                    @selectAddStatus="addIconStatus"
                    :serviceList="serviceList"
                    :serviceListIcon="serviceListIcon"
                    :serviceListArea="serviceListArea"
                    :getCategoryList="getCategoryList"
                    :goodsInfo="goodsInfo"
                    :area="area"
                >
                </add-service>
            </div>
        </model-box>
        <model-box
            :showButton="false"
            :show.sync="addlifepackage"
            title="添加生活套餐"
            width="60%"
        >
            <div slot="dialog-body">
                <add-package-service
                    v-if="addlifepackage"
                    @selectAddServicePackage="handleSubmitAddServicePackage"
                    @selectAddServiceItem="handleSelectAddServiceItem"
                    @selectEditServiceItem="handleSelectEditServiceItem"
                    @selectDeleteServiceItem="handleSelectDeleteServiceItem"
                    :selectgoodsItemList="selectgoodsItemList"
                    :goodsInfo="goodsInfo"
                    :area="area"
                >
                </add-package-service>
            </div>
        </model-box>
        <model-box
            @selectSubmit="handleAddServiceItem('ruleForm')"
            :show.sync="manageservice"
            :title="!sgp_id?'添加服务项目':'管理服务项目'"
            width="60%"
        >
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
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
                    <el-form-item label="选择服务项目" prop="selectServiceItem">
                        <div class="selectproject">
                            <div v-if="extend_cat_id != null">名称</div>
                            <div v-if="extend_cat_id == 2">套餐价</div>
                            <div v-if="extend_cat_id == 3">服务面积</div>
                            <div v-if="extend_cat_id == 1 || extend_cat_id == 3">套餐单价</div>
                            <div v-if="extend_cat_id != null">员工提成</div>
                            <div  v-if="extend_cat_id == 1">服务数量</div>
                        </div>
                        <div class="selectproject" v-if="extend_cat_id == 2" v-for="(item,index) in goodsAttributesList" :key="index">
                            <div>
                                <el-radio :disabled="getSgp_id_radio_Status(item.sgp_id)?true:false" v-if="extend_cat_id == 2" v-model="ruleForm.selectServiceItem" :label="item.sgp_id">{{item.key_name}}</el-radio>
                            </div>
                            <div>
                                {{item.package_price}}元
                            </div>
                            <div>
                                {{item.mc_rebate}}%
                            </div>
                        </div>
                        <div class="selectproject" v-if="extend_cat_id == 1" v-for="(item,index) in goodsAttributesList" :key="index">
                            <div>
                                <el-radio :disabled="getSgp_id_radio_Status(item.sgp_id)?true:false" v-if="extend_cat_id == 1" v-model="ruleForm.selectServiceItem" :label="item.sgp_id">{{item.key_name}}</el-radio>
                            </div>
                            <div>
                                {{item.package_price}}元
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
                                <el-radio :disabled="getSgp_id_radio_Status(item.sgp_id)?true:false" v-if="extend_cat_id == 3" v-model="ruleForm.selectServiceItem" :label="item.sgp_id">{{item.key_name}}</el-radio>
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
                                {{item.package_price}}元
                            </div>
                            <div>
                                {{item.mc_rebate}}%
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box :show.sync="iconStatus" title="选择图标" :showButton="iconSubmitBtn">
            <div slot="dialog-body">
                <div class="serviceIcon-content">
                    <div class="serviceIcon-item" v-for="(item,index) in iconList" :key="index" >
                        <img :src="item.url" alt="" width='40' height="40">
                        <div class="serviceIcon-delete">
                            <i class="el-icon-check" @click="handleAddIcon(item.id)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </model-box>
    </div>
</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import Upload from "components/upload";
import CartContral from "components/cartcontral";
import AddService from "./addService";
import AddPackageService from "./addPackageService";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";

export default {
  data() {
    return {
      activeIndex: "1", //tag索引
      addcategory: false, //添加分类状态
      addservice: false, //添加服务状态
      addlifepackage: false, //添加生活套餐状态
      manageservice: false, //管理服务状态
      iconStatus: false, //选择图标状态
      iconActiveIndex: null, //添加服务项目图标索引
      iconSubmitBtn: false,
      area: [],
      ruleForm: {
        selectServiceItem: null, //套餐里服务项目radio值
        serviceCategory: null, //选择服务分类Value
        serviceItem: null, //选择服务Value
        categoryName: null, //服务分类名称value
        goods_name: null //服务名称value
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        serviceCategory: [
          { required: true, message: "请选择服务分类", trigger: "change" }
        ],
        serviceItem: [
          { required: true, message: "请选择服务", trigger: "change" }
        ],
        selectServiceItem: [
          { required: true, message: "请选择服务项目", trigger: "change" }
        ],
        categoryName: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      //服务项目无图标数据
      serviceList: [
        {
          key_name: null, //服务名称
          price: null, //服务价格
          package_price: null, //服务套餐价格
          mc_rebate: null, //员工提成
          mc_packrebate: null //套餐员工提成
        }
      ],
      //服务项目有图标数据
      serviceListIcon: [
        {
          key_name: null, //服务名称
          attr_icon: null, //服务图标
          price: null, //服务价格
          package_price: null, //服务套餐价格
          mc_rebate: null, //员工提成
          mc_packrebate: null //套餐员工提成
        }
      ],
      //服务项目和面积数据
      serviceListArea: [
        {
          key_name: null, //服务名称
          min_area: null, //最小服务面积
          price: null, //服务面积单价
          mc_rebate: null, //员工提成
          package_price: null, //服务套餐价格
          mc_packrebate: null //套餐员工提成
        }
      ],
      getCategoryList: [], //分类列表数据
      getGoodsArray: [], //通过id获取商品数组
      categoryId: null, //服务分类id
      iconList: [], //图标列表数据
      getGoodsList: [], //服务列表数据
      getServerPackageList: [], //服务套餐列表数据
      extend_cat_id: null, //服务项目类型
      goodsAttributesList: [], //服务项目类型
      selectgoodsItemList: [], //选择商品属性数组
      sgp_id: null, //套餐里服务项目属性id
      sgp_id_radio: [], //套餐里服务项目属性id 用于判断是否被选
      goods_id: null, //服务列表 服务id
      goodsInfo: {} //服务信息
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //服务分类列表
      ApiDataModule("GETCATEGORY").then(res => {
        console.log(res);
        this.getCategoryList = res.data;
      });
      //城市区域
      ApiDataModule("CITYLIST").then(res => {
        this.area = res.data.data;
        console.log(res);
      });
      //图标列表
      ApiDataModule("ICONLIST").then(res => {
        console.log(res);
        this.iconList = res.data;
      });
    },
    //el-menu
    handleSelect(e) {
      this.activeIndex = e;
      if (e == 2) {
        //服务列表
        ApiDataModule("GETGOODSLIST").then(res => {
          console.log(res, "getGoodsList");
          this.getGoodsList = res.data;
        });
        return;
      }
      if (e == 3) {
        //服务套餐列表
        ApiDataModule("GETSERVERPACKAGELIST").then(res => {
          this.getServerPackageList = res.data;
          console.log(res, "GETSERVERPACKAGELIST");
        });
        return;
      }
    },
    //生活套餐 添加服务项目
    handleSelectAddServiceItem() {
      this.ruleForm.serviceCategory = null;
      this.ruleForm.serviceItem = null;
      this.ruleForm.selectServiceItem = null;
      this.sgp_id = null;
      this.goodsAttributesList = [];
      this.getGoodsArray = [];
      this.manageservice = true;
    },
    //编辑服务套餐里的管理服务项目
    handleSelectEditServiceItem(id) {
      this.manageservice = true;
      this.sgp_id = id;
      this.sgp_id_radio = [];
      this.ruleForm.selectServiceItem = null;
      console.log(id, "asdsad");
      this.selectgoodsItemList.map((item, index) => {
        if (item.sgp_id == id) {
          ApiDataModule("GETATTRBYATTR", {
            id: id
          }).then(res => {
            console.log(res, "根据商品获取商品属性");
            // console.log(this.selectgoodsItemList[index].goods_id, "goods_id");
            this.extend_cat_id = res.data.info.extend_cat_id;
            this.goodsAttributesList = res.data.list;
            this.$nextTick(() => {
              ApiDataModule("GETGOODSBYCATE", {
                cate: res.data.info.cat_id
              }).then(res => {
                console.log(res,'通过分类获取服务项目');
                if (res.code == CODE_OK) {
                  this.getGoodsArray = res.data;
                }else{
                  this.$message({
                    type:'warning',
                    message:'通过分类获取服务项目失败'
                  })
                }
              });
              this.goodsAttributesList.map((item2, index2) => {
                if (item2.sgp_id == id) {
                  console.log("一致");
                  if (this.extend_cat_id != 3) {
                    this.goodsAttributesList[
                      index2
                    ].count = this.selectgoodsItemList[index].count;
                  } else {
                    console.log("一致2");
                    console.log(this.selectgoodsItemList[index], "一致22222");
                    let packagearea = `packagearea${item2.sgp_id}`;
                    document.getElementsByClassName(
                      packagearea
                    )[0].value = this.selectgoodsItemList[index].count;
                    console.log("一致3");
                  }
                }
              });
              this.selectgoodsItemList.map((item3, index) => {
                this.goodsAttributesList.map((item4, index2) => {
                  if (item3.sgp_id == item4.sgp_id) {
                    this.sgp_id_radio.push(item3.sgp_id);
                  }
                });
              });
            });
          });
          this.ruleForm.serviceCategory = this.selectgoodsItemList[
            index
          ].cate_id;
          console.log(this.selectgoodsItemList, "selectgoodsItemList");
          this.ruleForm.serviceItem = this.selectgoodsItemList[index].goods_id;
          this.ruleForm.selectServiceItem = this.selectgoodsItemList[
            index
          ].sgp_id;
          return;
        }
      });
    },
    //删除套餐里 服务项目
    handleSelectDeleteServiceItem(index) {
      this.sgp_id_radio.map((item, index2) => {
        if (item == this.selectgoodsItemList[index].sgp_id) {
          this.sgp_id_radio.splice(index2, 1);
        }
      });
      this.selectgoodsItemList.splice(index, 1);
    },
    //处理添加按钮的方法
    handleAddMethods(type) {
      this.goods_id = null;
      this.goodsInfo = {};
      this.selectgoodsItemList = [];
      //添加服务分类
      if (type == "addServiceCategory") {
        this.ruleForm.categoryName = null;
        this.categoryId = null;
        this.addcategory = true;
        return;
      }
      //添加服务
      if (type == "addService") {
        //服务项目无图标数据
        this.serviceList = [
          {
            key_name: null, //服务名称
            price: null, //服务价格
            package_price: null, //服务套餐价格
            mc_rebate: null, //员工提成
            mc_packrebate: null //套餐员工提成
          }
        ];
        //服务项目有图标数据
        this.serviceListIcon = [
          {
            key_name: null, //服务名称
            attr_icon: null, //服务图标
            price: null, //服务价格
            package_price: null, //服务套餐价格
            mc_rebate: null, //员工提成
            mc_packrebate: null //套餐员工提成
          }
        ];
        //服务项目和面积数据
        this.serviceListArea = [
          {
            key_name: null, //服务名称
            min_area: null, //最小服务面积
            price: null, //服务面积单价
            mc_rebate: null, //员工提成
            package_price: null, //服务套餐价格
            mc_packrebate: null //套餐员工提成
          }
        ];
        this.addservice = true;
        return;
      }
      //添加生活套餐
      if (type == "addpackage") {
        this.selectgoodsItemList = [];
        this.addlifepackage = true;
        return;
      }
    },
    //处理编辑/管理按钮的方法
    handleEditServiceItem(id, type) {
      //编辑服务分类
      if (type == "editServiceCategory") {
        this.categoryId = id;
        ApiDataModule("GETCATEGORYINFO", {
          id: id
        }).then(res => {
          if (res.code == CODE_OK) {
            this.ruleForm.categoryName = res.data.name;
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        });
        this.addcategory = true;
        return;
      }
      //编辑 获取商品服务信息
      if (type == "getGoodsInfo") {
        ApiDataModule("GETGOODSINFO", {
          id: id
        }).then(res => {
          console.log(res, "getGoodsInfo");
          if (res.code == CODE_OK) {
            this.goods_id = res.data.goods_id;
            this.goodsInfo = res.data;
            if (res.data.extend_cat_id == 1) {
              this.serviceListIcon = res.data.goods_attr;
            } else if (res.data.extend_cat_id == 3) {
              this.serviceListArea = res.data.goods_attr;
            } else {
              this.serviceList = res.data.goods_attr;
            }
            this.$nextTick(() => {
              this.addservice = true;
            });
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        });
        return;
      }
      // 编辑 获取商品套餐服务信息
      if (type == "editPackageService") {
        this.selectgoodsItemList = [];
        ApiDataModule("GETSERVERPACKAGEINFO", { id: id }).then(res => {
          console.log(res);
          if (res.code == CODE_OK) {
            this.goods_id = res.data.goods_id;
            this.goodsInfo = res.data;
            this.selectgoodsItemList = res.data.server_goods;
            this.$nextTick(() => {
              this.addlifepackage = true;
            });
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        });
        return;
      }
    },
    //添加服务分类提交方法
    handleAddService(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = {
            name: this.ruleForm.categoryName
          };
          if (this.categoryId) {
            formData.id = this.categoryId;
          }
          ApiDataModule("ADDCATEGORY", formData).then(res => {
            console.log(res);
            if (res.code == CODE_OK) {
              this.$message({ type: "success", message: "添加成功" });
              ApiDataModule("GETCATEGORY").then(res => {
                this.getCategoryList = res.data;
              });
            } else {
              this.$message({ type: "warning", message: res.msg });
            }
          });
          this.addcategory = false;
        } else {
          return false;
        }
      });
    },
    //添加服务提交方法
    handleSubmitAddService(formName) {
      console.log(formName, "formName");
      console.log(this.serviceListIcon, "serviceListIcon");
      let form = new FormData();
      if (formName.serviceType == 1) {
        const serviceListIcon = JSON.stringify(this.serviceListIcon);
        form.append("goods_attr", serviceListIcon);
      } else if (formName.serviceType == 3) {
        const serviceListArea = JSON.stringify(this.serviceListArea);
        form.append("goods_attr", serviceListArea);
      } else {
        const serviceList = JSON.stringify(this.serviceList);
        form.append("goods_attr", serviceList);
      }
      form.append("goods_content", formName.content);
      form.append("goods_name", formName.goods_name);
      form.append("goods_remark", formName.goods_remark);
      form.append("cat_id", formName.serviceCategory);
      form.append("shipping_area_ids", formName.checkedArea);
      form.append("extend_cat_id", formName.serviceType);
      form.append("original_type_img", formName.original_type_img);
      form.append("original_img", formName.original_img);
      formName.banner_img.map((item, index) => {
        form.append(`banner_img${index}`, formName.banner_img[index]);
      });
      if (this.goods_id) {
        //编辑
        console.log("编辑");
        form.append("id", this.goods_id);
        ApiDataModule("EDITGOODS", form).then(res => {
          console.log(res, "编辑");
          if (res.data.code == CODE_OK) {
            this.addservice = false;
            //服务列表
            ApiDataModule("GETGOODSLIST").then(res => {
              this.getGoodsList = res.data;
            });
            this.$message({ type: "success", message: "编辑成功" });
          } else {
            this.$message({ type: "warning", message: res.data.msg });
          }
        });
        return;
      } else {
        //添加
        console.log("添加");
        ApiDataModule("ADDGOODS", form).then(res => {
          console.log(res);
          if (res.data.code == CODE_OK) {
            this.addservice = false;
            //服务列表
            ApiDataModule("GETGOODSLIST").then(res => {
              this.getGoodsList = res.data;
            });
            this.$message({
              type: "success",
              message: "提交成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
          }
        });
        return;
      }
    },
    //生活套餐里添加项目提交方法
    handleAddServiceItem(formName) {
      console.log(this.goodsAttributesList, "goodsAttributesList");
      console.log(this.sgp_id_radio, "sgp_id_radio");
      console.log(this.selectgoodsItemList, "ruleForm.selectgoodsItemList");
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.sgp_id) {
            //编辑
            console.log("编辑");
            this.selectgoodsItemList.map((item, index) => {
              if (item.sgp_id == this.sgp_id) {
                this.selectgoodsItemList.splice(index, 1);

                this.goodsAttributesList.map((item2, index2) => {
                  if (item2.sgp_id == this.ruleForm.selectServiceItem) {
                    if (this.extend_cat_id == 3) {
                      let packagearea = `packagearea${item2.sgp_id}`;
                      if (
                        document.getElementsByClassName(packagearea)[0].value !=
                        ""
                      ) {
                        item2.count = document.getElementsByClassName(
                          packagearea
                        )[0].value;
                      } else {
                        this.$message({
                          type: "warning",
                          message: "面积不能为空"
                        });
                        return;
                      }
                    }
                    console.log(
                      this.goodsAttributesList[index2],
                      " this.goodsAttributesList[index2]"
                    );
                    this.selectgoodsItemList.push(
                      this.goodsAttributesList[index2]
                    );
                    console.log(
                      this.selectgoodsItemList,
                      "selectgoodsItemList"
                    );
                  }
                });
              }
            });
          } else {
            //添加
            console.log("添加");
            this.goodsAttributesList.map((item, index) => {
              if (item.sgp_id == this.ruleForm.selectServiceItem) {
                if (this.extend_cat_id == 3) {
                  let packagearea = `packagearea${item.sgp_id}`;
                  if (
                    document.getElementsByClassName(packagearea)[0].value != ""
                  ) {
                    item.count = document.getElementsByClassName(
                      packagearea
                    )[0].value;
                  } else {
                    this.$message({
                      type: "warning",
                      message: "面积不能为空"
                    });
                    return;
                  }
                }
                this.selectgoodsItemList.push(item);
                console.log(
                  this.selectgoodsItemList,
                  "ruleForm.selectgoodsItemList"
                );
              }
            });
          }
          this.manageservice = false;
        } else {
          return false;
        }
      });
    },
    //添加生活套餐提交方法
    handleSubmitAddServicePackage(formName) {
      if (this.selectgoodsItemList.length <= 0) {
        this.$message({
          type: "warning",
          message: "请添加服务内容"
        });
        return;
      }
      let goods_list = [];
      const form = new FormData();
      form.append("goods_name", formName.goods_name);
      form.append("goods_remark", formName.goods_remark);
      form.append("shipping_area_ids", formName.checkedArea);
      form.append("original_img", formName.original_img);
      formName.banner_img.map((item, index) => {
        form.append(`banner_img${index}`, formName.banner_img[index]);
      });
      form.append("goods_content", formName.content);
      form.append("market_price", formName.serviceTotal);
      console.log("请添加服务内容");
      this.selectgoodsItemList.map((item, index) => {
        goods_list.push({
          goods_attr_id: item.sgp_id,
          goods_num: item.count
        });
      });
      const goods_list_new = JSON.stringify(goods_list);
      form.append("goods_attr", goods_list_new);
      if (this.goods_id) {
        form.append("id", this.goods_id);
        //编辑套餐
        ApiDataModule("EDITGOODSPACKAGE", form).then(res => {
          console.log(res);
          if (res.data.code == CODE_OK) {
            this.$message({ type: "success", message: "编辑成功" });
            //服务套餐列表
            ApiDataModule("GETSERVERPACKAGELIST").then(res => {
              this.getServerPackageList = res.data;
              this.$nextTick(() => {
                this.addlifepackage = false;
              });
            });
          } else {
            this.$message({ type: "warning", message: res.data.msg });
          }
        });
      } else {
        //添加套餐
        ApiDataModule("ADDGOODSPACKAGE", form).then(res => {
          if (res.data.code == CODE_OK) {
            this.$message({
              type: "success",
              message: "提交成功"
            });
            //服务套餐列表
            ApiDataModule("GETSERVERPACKAGELIST").then(res => {
              this.getServerPackageList = res.data;
            });
            this.$nextTick(() => {
              this.addlifepackage = false;
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
          }
          console.log(res);
        });
      }
    },
    //选择添加图标的服务项目
    addIconStatus(index) {
      this.iconActiveIndex = null;
      this.iconStatus = true;
      this.iconActiveIndex = index;
    },
    //添加服务图标
    handleAddIcon(id) {
      // this.serviceListIcon.attr_icon = id;
      console.log(id);
      this.serviceListIcon[this.iconActiveIndex].attr_icon = id;

      this.$message({
        type: "success",
        message: "添加成功"
      });
      this.iconStatus = false;
    },
    //通过分类获取商品
    handleGetServiceItem(id) {
      this.ruleForm.serviceItem = null;
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
        this.$nextTick(() => {
          this.selectgoodsItemList.map((item, index) => {
            this.goodsAttributesList.map((item2, index2) => {
              if (item.sgp_id == item2.sgp_id) {
                this.sgp_id_radio.push(item.sgp_id);
                const sgp_id_radio = this.sgp_id_radio.sort();
                const sgp_id_radio_new = [sgp_id_radio[0]];
                this.sgp_id_radio.map((item, index) => {
                  if (
                    sgp_id_radio[index] !==
                    sgp_id_radio_new[sgp_id_radio_new.length - 1]
                  ) {
                    sgp_id_radio_new.push(sgp_id_radio[index]);
                    this.sgp_id_radio = sgp_id_radio_new;
                    console.log(this.sgp_id_radio, "this.sgp_id_radio");
                  }
                });
              }
            });
          });
        });
      });
    },
    getSgp_id_radio_Status(id) {
      let status = false;
      this.sgp_id_radio.map((item, index) => {
        if (item == id) {
          status = true;
        }
      });
      return status;
    },
    //upload 上传图标
    handleUploadFile(e) {
      console.log(e);
      const file = e.target.files[0];
      const form = new FormData();
      form.append("icon", file);
      ApiDataModule("UPLOAD_ICON", form).then(res => {
        console.log(res);
        if (res.data.code == CODE_OK) {
          this.$message({
            type: "success",
            message: "上传成功"
          });
          ApiDataModule("ICONLIST").then(res => {
            this.iconList = res.data;
          });
        }
      });
    },
    //判断列表状态
    judgmentStatus(index, type) {
      let desc = "";
      if (type == "is_on_sale") {
        if (index == 0) {
          desc = "否";
          return desc;
        }
        if (index == 1) {
          desc = "是";
          return desc;
        }
      }
      if (type == "is_hot") {
        if (index == 0) {
          desc = "否";
          return desc;
        }
        if (index == 1) {
          desc = "是";
          return desc;
        }
      }
      if (type == "is_new") {
        if (index == 0) {
          desc = "否";
          return desc;
        }
        if (index == 1) {
          desc = "是";
          return desc;
        }
      }
    },
    //改变列表状态
    changeStatus(id, status, type, cate) {
      this.$confirm("此操作将改变列表状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const formData = {
            id: id
          };
          if (cate == "service") {
            //上架
            if (type == "is_on_sale") {
              formData.type = 0;
              if (status == 0) {
                formData.operating = 1;
              }
              if (status == 1) {
                formData.operating = 0;
              }
            }
            //分类展示
            if (type == "is_hot") {
              formData.type = 1;
              if (status == 0) {
                formData.operating = 1;
              }
              if (status == 1) {
                formData.operating = 0;
              }
            }
            //精选
            if (type == "is_new") {
              formData.type = 2;
              if (status == 0) {
                formData.operating = 1;
              }
              if (status == 1) {
                formData.operating = 0;
              }
            }
            ApiDataModule("EDITGOODSSTATUS", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                ApiDataModule("GETGOODSLIST").then(res => {
                  this.getGoodsList = res.data;
                });
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
            return;
          }
          if (cate == "package") {
            //上架
            if (type == "is_on_sale") {
              if (status == 0) {
                formData.status = 1;
              }
              if (status == 1) {
                formData.status = 0;
              }
            }
            ApiDataModule("CHANGESALESTATUS", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                ApiDataModule("GETSERVERPACKAGELIST").then(res => {
                  this.getServerPackageList = res.data;
                });
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //处理删除按钮的方法
    handleDelete(id, type) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const formData = {
            id: id
          };
          if (type == "getCategoryList") {
            ApiDataModule("DELCATEGORY", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                ApiDataModule("GETCATEGORY").then(res => {
                  this.getCategoryList = res.data;
                });
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
            return;
          }
          if (type == "serviceIcon") {
            ApiDataModule("DEL_ICON", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                //图标列表
                ApiDataModule("ICONLIST").then(res => {
                  this.iconList = res.data;
                });
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
            return;
          }
          //删除服务
          if (type == "deleteService") {
            ApiDataModule("DELGOODS", { id: id }).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                //服务列表
                ApiDataModule("GETGOODSLIST").then(res => {
                  this.getGoodsList = res.data;
                });
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
              console.log(res);
            });
            return;
          }
          //删除套餐
          if (type == "deletePackage") {
            ApiDataModule("DELPACKAGE", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$message({ type: "success", message: "删除成功" });
                //服务套餐列表
                ApiDataModule("GETSERVERPACKAGELIST").then(res => {
                  this.getServerPackageList = res.data;
                });
              } else {
                this.$message({ type: "warning", message: res.msg });
              }
            });
            return;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {
    Panpel,
    ModelBox,
    Upload,
    CartContral,
    AddService,
    AddPackageService
  }
};
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
}
.header-content-left {
  flex: 1;
}
.search-button {
  margin-left: 10px;
}
.body-table-thead {
  margin-bottom: 5px;
}
.body-table-tr {
  background-color: #fff;
  margin-top: 5px;
}
.body-table-tr span {
  cursor: pointer;
}
.body-page {
  text-align: right;
  padding: 10px 0;
}
.td i {
  vertical-align: middle;
  font-size: 20px;
  cursor: pointer;
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
.serviceIcon-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.serviceIcon-item {
  position: relative;
  padding: 5px;
}
.serviceIcon-delete {
  display: none;
}
.serviceIcon-item:hover .serviceIcon-delete {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.serviceIcon-delete i {
  color: #fff;
  cursor: pointer;
  font-size: 20px;
}
</style>

