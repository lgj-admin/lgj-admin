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
                                <div class="td" @click="changeStatus(item.goods_id,item.is_on_sale,'is_on_sale')" style="cursor:pointer;">
                                  <a href="javascript:void(0)">{{judgmentStatus(item.is_on_sale,'is_on_sale')}}</a>
                                </div>
                                <div class="td" @click="changeStatus(item.goods_id,item.is_on_sale,'is_hot')" style="cursor:pointer;">
                                  <a href="javascript:void(0)">{{judgmentStatus(item.is_hot,'is_hot')}}</a>
                                </div>
                                <div class="td" @click="changeStatus(item.goods_id,item.is_on_sale,'is_new')" style="cursor:pointer;">
                                  <a href="javascript:void(0)">{{judgmentStatus(item.is_new,'is_new')}}</a>
                                </div>
                                <!-- <div class="td">1</div> -->
                                <div class="td">
                                  <a href="javascript:void(0)" @click="handleEditServiceItem(item.goods_id,'getGoodsInfo')">编辑</a>
                                  <a href="javascript:void(0)" @click="handleDelete">删除</a>
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
                                <div class="td">{{judgmentStatus(item.is_on_sale,'is_on_sale')}}</div>
                                <div class="td">
                                  <a href="javascript:void(0)" @click="handleEditServiceItem()">编辑</a>
                                  <a href="javascript:void(0)" @click="handleDelete">删除</a>
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
        <model-box @selectSubmit="handleAddService('ruleForm')" :show.sync="addcategory" :title="!categoryId?'添加分类':'编辑分类'">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="分类名称" prop="categoryName">
                        <el-input v-model="ruleForm.categoryName" placeholder="请输入服务分类名称"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handleSubmitAddService('ruleForm')" :show.sync="addservice" title="添加服务" width="70%">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="选择服务分类" prop="serviceCategory">
                        <el-select v-model="ruleForm.serviceCategory" placeholder="服务分类">
                            <el-option
                                  v-for="item in getCategoryList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务名称" prop="goods_name">
                        <el-input v-model="ruleForm.goods_name" placeholder="请输入服务名称"></el-input>
                    </el-form-item>
                    <el-form-item label="服务简介" prop="goods_remark">
                        <el-input v-model="ruleForm.goods_remark" placeholder="请输入服务简介"></el-input>
                    </el-form-item>
                    <el-form-item label="选择服务地区" prop="checkedArea">
                        <el-checkbox-group
                              v-model="ruleForm.checkedArea"
                        >
                            <el-checkbox v-for="item in area" :label="item.id" :key="item.id">{{item.city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="添加服务项目" prop="serviceType">
                        <el-radio v-model="ruleForm.serviceType" label="1">按照服务项目(有图标)</el-radio>
                        <el-radio v-model="ruleForm.serviceType" label="2">按照服务项目(无图标)</el-radio>
                        <el-radio v-model="ruleForm.serviceType" label="3">按照服务项目和服务面积</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <div class="addservice">
                            <div class="service-content">
                                <div class="service-item" style="flex:0 0 145px">名称</div>
                                <div class="service-item" v-show="ruleForm.serviceType == 3" style="flex:0 0 100px">最小服务面积</div>
                                <div class="service-item" style="flex:0 0 120px">单价</div>
                                <div class="service-item">员工提成</div>
                                <!-- <div class="service-item" v-show="ruleForm.serviceType == 3">套餐服务面积</div> -->
                                <div class="service-item" v-show="ruleForm.serviceType == 3">
                                    套餐单价
                                </div>
                                <div class="service-item" v-show="ruleForm.serviceType != 3">生活套餐价格</div>
                                <div class="service-item">套餐员工提成</div>
                                <div class="service-item" style="flex:0 0 40px;">删除</div>
                            </div>
                            <div class="service-content" v-for="(item,index) in serviceListIcon" :key="index" v-if="ruleForm.serviceType == 1">
                                <div class="service-item" style="flex:0 0 145px">
                                    <el-input  v-model="item.key_name" placeholder="服务项目"></el-input>
                                    <el-button style="display:inline-block" @click="addIconStatus(index)">添加图标</el-button>
                                </div>

                                <div class="service-item" style="flex:0 0 120px">
                                    <el-input v-model="item.price" ></el-input><span>元/次</span>
                                </div>
                                <div class="service-item">
                                    <el-input v-model="item.mc_rebate" placeholder="请填写提成"></el-input><span>%</span>
                                </div>

                                <div class="service-item">
                                    <el-input v-model="item.package_price"></el-input><span>元/次</span>
                                </div>
                                <div class="service-item">
                                    <el-input v-model="item.mc_packrebate" placeholder="请填写提成"></el-input><span>%</span>
                                </div>
                                <div class="service-item service-i" style="flex:0 0 40px;">
                                    <i class="el-icon-remove" @click="handleDelServiceItem(index,'removeServiceItem')"></i>
                                </div>
                            </div>
                            <div class="service-content" v-for="(item,index) in serviceList" :key="index" v-if="ruleForm.serviceType == 2">
                                <div class="service-item" style="flex:0 0 145px">
                                    <el-input v-model="item.key_name" placeholder="服务项目"></el-input>
                                </div>
                                <div class="service-item" style="flex:0 0 120px">
                                    <el-input v-model="item.price" ></el-input><span>元</span>
                                </div>
                                <div class="service-item">
                                    <el-input v-model="item.mc_rebate" placeholder="请填写提成"></el-input><span>%</span>
                                </div>
                                <div class="service-item" v-show="ruleForm.serviceType != 3">
                                    <el-input v-model="item.package_price"></el-input><span>元</span>
                                </div>
                                <div class="service-item">
                                    <el-input v-model="item.mc_packrebate" placeholder="请填写提成"></el-input><span>%</span>
                                </div>
                                <div class="service-item service-i" style="flex:0 0 40px;">
                                    <i class="el-icon-remove" @click="handleDelServiceItem(index,'removeServiceItem')"></i>
                                </div>
                            </div>
                            <div class="service-content" v-for="(item,index) in serviceListArea" :key="index"  v-if="ruleForm.serviceType == 3" >
                                <div class="service-item" style="flex:0 0 145px">
                                    <el-input v-model="item.key_name" placeholder="服务项目"></el-input>
                                </div>
                                <div class="service-item" style="flex:0 0 100px">
                                    <el-input v-model="item.min_area"></el-input><span>平</span>
                                </div>
                                <div class="service-item" style="flex:0 0 120px">
                                    <el-input v-model="item.price"></el-input><span>元/平</span>
                                </div>
                                <div class="service-item">
                                    <el-input v-model="item.mc_rebate" placeholder="请填写提成"></el-input><span>%</span>
                                </div>
                                <div class="service-item">
                                    <el-input v-model="item.package_price"></el-input><span>元/平</span>
                                </div>
                                <div class="service-item">
                                    <el-input v-model="item.mc_packrebate" placeholder="请填写提成"></el-input><span>%</span>
                                </div>
                                <div class="service-item service-i" style="flex:0 0 40px;">
                                    <i class="el-icon-remove" @click="handleDelServiceItem(index,'removeServiceItem')"></i>
                                </div>
                            </div>
                            <div class="service-i">
                                <i class="el-icon-circle-plus" @click="addServiceItem"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="添加首页分类图标(建议尺寸)" prop="original_type_img">
                        <upload
                            @selectUpload="handleUploadCategoryIcon"
                            @selectRemove="handleRemoveCategory('Icon')"
                            :imgUrl.sync="imageUrlCategoryIcon"
                            ref="upload"
                        >
                            <div slot="upload-card" class="upload-card">
                                <i class="el-icon-plus" v-if="!imageUrlCategoryIcon"></i>
                                <img v-if="imageUrlCategoryIcon" :src="imageUrlCategoryIcon" alt="" width="100%" height="100%">
                            </div>
                        </upload>
                    </el-form-item>
                    <el-form-item label="添加首页展示图(建议尺寸)" prop="original_img">
                        <upload
                            @selectUpload="handleUploadHomeShow"
                            @selectRemove="handleRemoveCategory('Show')"
                            :imgUrl.sync="imageUrlHomeShow"
                            ref="upload"
                        >
                            <div slot="upload-card" class="upload-card">
                                <i class="el-icon-plus" v-if="!imageUrlHomeShow"></i>
                                <img v-if="imageUrlHomeShow" :src="imageUrlHomeShow" alt="" width="100%" height="100%">
                            </div>
                        </upload>
                    </el-form-item>
                    <el-form-item label="添加服务详情轮播(建议尺寸)" prop="banner_img">
                        <upload
                            @selectUpload="handleUpload"
                            @selectRemove="handleRemove"
                            :imgArr="imageArr"
                            listType="pictureList"
                        >
                        </upload>
                    </el-form-item>
                    <el-form-item label="服务说明">
                        <div>
                            <quill-editor v-model="content"
                                            v-if="activeIndex == 2"
                                            ref="myQuillEditor"
                                            class="editer"
                                            :options="editorOption" @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handleSubmitAddServicePackage('ruleForm')" :show.sync="addlifepackage" title="添加生活套餐" width="60%">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="套餐名称" prop="goods_name">
                        <el-input v-model="ruleForm.goods_name" placeholder="套餐名称"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐简介" prop="goods_remark">
                        <el-input v-model="ruleForm.goods_remark" placeholder="套餐简介"></el-input>
                    </el-form-item>
                    <el-form-item label="选择服务地区" prop="checkedArea">
                        <el-checkbox-group
                              v-model="ruleForm.checkedArea"
                        >
                            <el-checkbox v-for="item in area" :label="item.id" :key="item.id">{{item.city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="添加服务项目">
                        <el-button @click="handleAddMethods('packageServiceItem')">添加</el-button>
                    </el-form-item>
                    <el-form-item label="服务内容">
                        <el-card class="box-card">
                            <div class="text item">
                                <div class="box-card-item" v-for="(item,index) in selectgoodsItemList" :key="index">
                                    <div><span>{{item.cate_name}}</span>-<span>{{item.goods_name}}</span></div>
                                    <div>
                                        <div><span>{{item.key_name}}X{{item.count}}</span><span>X{{item.package_price}}元</span></div>
                                    </div>
                                    <div>
                                        <el-button @click="handleEditServiceItem(item.sgp_id,'editManageServiceItem')">管理</el-button>
                                        <el-button @click="handleDelServiceItem(index,'removeServicePackage')">删除</el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="box-footer">
                                套餐总价：<span>{{getServiceTotal}}</span>
                            </div>
                        </el-card>
                    </el-form-item>
                    <el-form-item label="添加首页默认图(建议尺寸)" prop="original_img">
                        <upload
                            @selectUpload="handleUploadHomeShow"
                            @selectRemove="handleRemoveCategory('Show')"
                            :imgUrl.sync="imageUrlHomeShow"
                            ref="upload"
                        >
                            <div slot="upload-card" class="upload-card">
                                <i class="el-icon-plus" v-if="!imageUrlHomeShow"></i>
                                <img v-if="imageUrlHomeShow" :src="imageUrlHomeShow" alt="" width="100%" height="100%">
                            </div>
                        </upload>
                    </el-form-item>
                    <el-form-item label="添加服务展示图" prop="banner_img">
                        <upload
                            @selectUpload="handleUpload"
                            @selectRemove="handleRemove"
                            :imgArr="imageArr"
                            listType="pictureList"
                        >
                        </upload>
                    </el-form-item>
                    <el-form-item label="服务说明">
                        <div>
                            <quill-editor v-model="content"
                                            v-if="activeIndex == 3"
                                            ref="myQuillEditor"
                                            class="editer"
                                            :options="editorOption" @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handleAddServiceItem('ruleForm')" :show.sync="manageservice" :title="!sgp_id?'添加服务项目':'管理服务项目'" width="60%">
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
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import { editorOptions } from "config/vue-quill.editor-config.js";
import { isFloat } from "config/utils.js";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor"; //调用编辑器

export default {
  data() {
    return {
      editorOption: editorOptions,
      activeIndex: "1", //tags索引
      addcategory: false, //添加分类状态
      addservice: false, //添加服务状态
      addlifepackage: false, //添加生活套餐状态
      manageservice: false, //管理服务状态
      dialogVisible: false, //上传图片value
      iconStatus: false, //选择图标状态
      iconActiveIndex: null, //添加服务项目图标索引
      iconSubmitBtn: false,
      dialogImageUrl: "",
      area: [],
      serviceCount: { count: "1" },
      ruleForm: {
        serviceType: "1", //服务类型
        selectServiceItem: null, //套餐里服务项目radio值
        serviceCategory: null, //选择服务分类Value
        serviceItem: null, //选择服务Value
        categoryName: null, //服务分类名称value
        goods_name: null, //服务名称value
        goods_remark: null, //服务简介value
        checkedArea: [], //选择区域状态
        original_img: null, //首页展示图二进制对象
        original_type_img: null, //分类图标二进制对象
        banner_img: [] //服务详情轮播图片二进制对象
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        goods_remark: [
          { required: true, message: "请输入简介", trigger: "blur" }
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
        checkedArea: [
          { required: true, message: "请选择服务区域", trigger: "change" }
        ],
        categoryName: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ],
        original_img: [
          { required: true, message: "请选择图片", trigger: "change" }
        ],
        original_type_img: [
          { required: true, message: "请选择图片", trigger: "change" }
        ],
        banner_img: [
          { required: true, message: "请至少选择一张图片", trigger: "change" }
        ]
      },
      //服务项目无图标数据
      serviceList : [
        {
          key_name: null, //服务名称
          price: null, //服务价格
          package_price: null, //服务套餐价格
          mc_rebate: null, //员工提成
          mc_packrebate: null //套餐员工提成
        }
      ],
      //服务项目有图标数据
      serviceListIcon : [
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
      serviceListArea : [
        {
          key_name: null, //服务名称
          min_area: null, //最小服务面积
          price: null, //服务面积单价
          mc_rebate: null, //员工提成
          package_price: null, //服务套餐价格
          mc_packrebate: null //套餐员工提成
        }
      ],
      fileList: [],
      imageUrlCategoryIcon: null, //分类图标路径
      imageUrlHomeShow: null, //首页展示图路径路径
      getCategoryList: [], //分类列表数据
      getGoodsArray: [], //通过id获取商品数组
      categoryId: null, //服务分类id
      verificationServiceNameArray: [],
      verificationServiceNameBtn: true,
      iconList: [], //图标列表数据
      getGoodsList: [], //服务列表数据
      getServerPackageList: [], //服务套餐列表数据
      extend_cat_id: null, //服务项目类型
      goodsAttributesList: [], //服务项目类型
      selectgoodsItemList: [], //选择商品属性数组
      sgp_id: null, //套餐里服务项目属性id
      sgp_id_radio: [], //套餐里服务项目属性id 用于判断是否被选
      serviceTotal:null,//商品总价
      // goods_id:null,//服务列表 服务id
      imageArr:[],
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: {
    getServiceTotal() {
      const totalArr = [];
      let total = 0;
      let totalString = '';
      let totalArray = [];

      this.selectgoodsItemList.map((item,index)=>{
        totalArr.push({count:item.count,price:item.package_price})
      })
      totalArr.map((item2,index2)=>{
        totalString = `${item2.count} X ${item2.price}`;
        total += item2.count * item2.price;
        totalArray.push(totalString);
      })
      console.log(total,'total');
      this.serviceTotal = total;
      return `${totalArray.join('+')} = ${total}` ;
    }
  },
  methods: {
    init(){
      this.goods_id = null;//服务列表 服务id
      this.ruleForm.serviceCategory = null;
      this.ruleForm.goods_name = null;
      this.ruleForm.goods_remark = null;
      this.ruleForm.checkedArea = [];
      this.ruleForm.serviceType ="1";
      this.ruleForm.original_img = null;
      this.ruleForm.original_type_img = null;
      this.ruleForm.banner_img = [];
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
      this.imageUrlHomeShow =null;//首页展示图路径路径
      this.imageUrlCategoryIcon = null;//分类图标路径
      this.imageArr = []; //服务详情轮播图片数组
      this.content = "";

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
    onEditorReady() {},
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
    //处理添加按钮的方法
    handleAddMethods(type) {
      //添加服务分类
      if (type == "addServiceCategory") {
        this.ruleForm.categoryName = null;
        this.categoryId = null;
        this.addcategory = true;
        return;
      }
      //添加服务
      if (type == "addService") {
        this.init();
        this.$nextTick(()=>{
          this.addservice = true;
        })
        return;
      }
      //添加生活套餐
      if (type == "addpackage") {
        this.addlifepackage = true;
        return;
      }
      //生活套餐 添加服务项目
      if (type == "packageServiceItem") {
        this.ruleForm.serviceCategory = null;
        this.ruleForm.serviceItem = null;
        this.ruleForm.selectServiceItem = null;
        this.sgp_id = null;
        this.goodsAttributesList = [];
        this.getGoodsArray = [];
        this.manageservice = true;
        return;
      }
    },
    //处理删除按钮的方法
    handleDelServiceItem(index, type) {
      //删除服务项目
      if (type == "removeServiceItem") {
        if (this.ruleForm.serviceType == 1) {
          this.serviceListIcon.splice(index, 1);
          return;
        }
        if (this.ruleForm.serviceType == 2) {
          this.serviceList.splice(index, 1);
          return;
        }
        if (this.ruleForm.serviceType == 3) {
          this.serviceListArea.splice(index, 1);
          return;
        }
        return;
      }
      //删除套餐里 服务项目
      if (type == "removeServicePackage") {
        this.sgp_id_radio.map((item,index2)=>{
          if(item == this.selectgoodsItemList[index].sgp_id){
            this.sgp_id_radio.splice(index2,1)
          }
        })
        this.selectgoodsItemList.splice(index, 1);
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
      if(type == 'getGoodsInfo'){
        console.log('getGoodsInfo')
        ApiDataModule('GETGOODSINFO',{
          id:id
        }).then(res=>{
          console.log(res)
          if(res.code == CODE_OK){
            this.goods_id = res.data.goods_id;
            this.ruleForm.serviceCategory = res.data.cat_id;
            this.ruleForm.goods_name = res.data.goods_name;
            this.ruleForm.goods_remark = res.data.goods_remark;
            this.ruleForm.checkedArea = res.data.shipping_area_ids;
            this.ruleForm.serviceType = res.data.extend_cat_id.toString() ;
            if (res.data.extend_cat_id == 1) {
              this.serviceListIcon = res.data.goods_attr;
            } else if (this.ruleForm.serviceType == 3) {
              this.serviceListArea = res.data.goods_attr;
            } else {
              this.serviceList = res.data.goods_attr;
            }
             this.ruleForm.original_img = res.data.original_img;
             this.imageUrlHomeShow = res.data.original_img;
             this.ruleForm.original_type_img = res.data.original_type_img;
             this.imageUrlCategoryIcon = res.data.original_type_img;
             let banner_img_url = [];
             res.data.banner_img.map((item,index)=>{
               banner_img_url.push(item.image_url)
             })
             this.ruleForm.banner_img = banner_img_url;
             this.imageArr = banner_img_url;
             this.content = res.data.goods_content;
            this.addservice = true;
          }else{
            this.$message({
              type:'warning',
              message:'编辑失败'
            })
          }
        })
        return;
      }
      //编辑服务套餐里的管理服务项目
      if (type == "editManageServiceItem") {
        this.manageservice = true;
        this.sgp_id = id;
        this.sgp_id_radio = [];
        this.ruleForm.selectServiceItem = null;
        console.log(id, "asdsad");
        this.selectgoodsItemList.map((item, index) => {
          if (item.sgp_id == id) {
            ApiDataModule("GETATTRBYGOODS", {
              id: this.selectgoodsItemList[index].goods_id
            }).then(res => {
              console.log(res, "根据商品获取商品属性");
              this.extend_cat_id = res.data.info.extend_cat_id;
              this.goodsAttributesList = res.data.list;
              this.$nextTick(() => {

                this.goodsAttributesList.map((item2, index2) => {
                  if (item2.sgp_id == id) {
                    console.log('一致')
                    if (this.extend_cat_id != 3) {
                      this.goodsAttributesList[index2].count = this.selectgoodsItemList[index].count;
                    } else {
                      console.log('一致2')
                      console.log(this.selectgoodsItemList[index],'一致22222')
                      let packagearea = `packagearea${item2.sgp_id}`;
                      document.getElementsByClassName(packagearea)[0].value = this.selectgoodsItemList[index].count;
                      console.log('一致3')
                    }
                  }
                });
                this.selectgoodsItemList.map((item3,index)=>{
                  this.goodsAttributesList.map((item4,index2)=>{
                    if(item3.sgp_id == item4.sgp_id){
                      this.sgp_id_radio.push(item3.sgp_id);
                    }
                  })
                })
              });
            });
            this.ruleForm.serviceCategory = this.selectgoodsItemList[
              index
            ].cate_id;
            this.ruleForm.serviceItem = this.selectgoodsItemList[
              index
            ].goods_id;
            this.ruleForm.selectServiceItem = this.selectgoodsItemList[
              index
            ].sgp_id;
            return;
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
              this.$message({type:'success',message:'添加成功'})
              ApiDataModule("GETCATEGORY").then(res => {
                this.getCategoryList = res.data;
              });
            }else{
              this.$message({type:'warning',message:res.msg})
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
      console.log(this.content, "content");
      console.log(this.serviceListIcon, "serviceListIcon");
      this.$refs[formName].validate(valid => {
        if (valid) {
          const verificationService = this.verificationService();
          if (!verificationService) {
            this.$message({
              type: "warning",
              message: "请完善服务项目数据"
            });
            return;
          }
          const verificationServiceType = this.verificationServiceType();
          console.log(
            this.verificationServiceType(),
            "this.verificationServiceType()"
          );
          if (!verificationServiceType) return;
          if (!this.verificationServiceNameBtn) return;

          let form = new FormData();
          if (this.ruleForm.serviceType == 1) {
            const serviceListIcon = JSON.stringify(this.serviceListIcon);
            form.append("goods_attr", serviceListIcon);
          } else if (this.ruleForm.serviceType == 3) {
            const serviceListArea = JSON.stringify(this.serviceListArea);
            form.append("goods_attr", serviceListArea);
          } else {
            const serviceList = JSON.stringify(this.serviceList);
            form.append("goods_attr", serviceList);
          }
          form.append("goods_content", this.content);
          form.append("goods_name", this.ruleForm.goods_name);
          form.append("goods_remark", this.ruleForm.goods_remark);
          form.append("cat_id", this.ruleForm.serviceCategory);
          form.append("shipping_area_ids", this.ruleForm.checkedArea);
          form.append("extend_cat_id", this.ruleForm.serviceType);
          form.append("original_type_img", this.ruleForm.original_type_img);
          form.append("original_img", this.ruleForm.original_img);
          this.ruleForm.banner_img.map((item, index) => {
            form.append(`banner_img${index}`, this.ruleForm.banner_img[index]);
          });
          if(this.goods_id){
            //编辑
            form.append("id", this.goods_id);
            ApiDataModule('EDITGOODS',form).then(res=>{
              console.log(res,'编辑')
            })
            return;
          }else{
            //添加
            ApiDataModule("ADDGOODS", form).then(res => {
              console.log(res);
              if (res.data.code == CODE_OK) {
                this.addservice = false;
                this.$refs[formName].resetFields();
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
        } else {

          return false;
        }
      });
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
            this.selectgoodsItemList.map((item, index) => {
              if (item.sgp_id == this.sgp_id) {
                this.selectgoodsItemList.splice(index, 1);

                this.goodsAttributesList.map((item2, index2) => {
                  if (item2.sgp_id == this.ruleForm.selectServiceItem) {
                    this.selectgoodsItemList.push(
                      this.goodsAttributesList[index2]
                    );
                    console.log(this.selectgoodsItemList,'selectgoodsItemList');
                  }
                });
              }
            });
          } else {
            //添加
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
      if(this.selectgoodsItemList.length<=0){
        this.$message({
          type:'warning',
          message:'请添加服务内容'
        })
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let goods_list = [];
          const form = new FormData();
          form.append("goods_name", this.ruleForm.goods_name);
          form.append("goods_remark", this.ruleForm.goods_remark);
          form.append("shipping_area_ids", this.ruleForm.checkedArea);
          form.append("original_img", this.ruleForm.original_img);
          this.ruleForm.banner_img.map((item, index) => {
            form.append(`banner_img${index}`, this.ruleForm.banner_img[index]);
          });
          form.append("goods_content", this.content);
          form.append("market_price", this.serviceTotal);
          console.log('请添加服务内容');
          this.selectgoodsItemList.map((item,index)=>{
            goods_list.push({
              goods_attr_id:item.sgp_id,
              goods_num:item.count
            });
          })
          const goods_list_new = JSON.stringify(goods_list)
          form.append("goods_attr", goods_list_new);

          ApiDataModule('ADDGOODSPACKAGE',form).then(res=>{
            if(res.data.code == CODE_OK){
              this.$message({
                type:'success',
                message:'提交成功'
              })
              this.addlifepackage = false;
              this.$refs[formName].resetFields();
            }else{
              this.$message({
                type:'warning',
                message:res.data.msg
              })
            }
            console.log(res);
          })

        } else {
          return false;
        }
      });
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
    //服务里添加服务项目
    addServiceItem() {
      if (this.ruleForm.serviceType == 1) {
        this.serviceListIcon.push({
          key_name: null, //服务名称
          attr_icon: null, //服务图标
          price: null, //服务价格
          package_price: null, //服务套餐价格
          mc_rebate: null, //员工提成
          mc_packrebate: null //套餐员工提成
        });
        console.log(this.serviceListIcon, "this.serviceList");
        return;
      }
      if (this.ruleForm.serviceType == 3) {
        this.serviceListArea.push({
          key_name: null, //服务名称
          min_area: null, //最小服务面积
          price: null, //服务面积单价
          mc_rebate: null, //员工提成
          // package_area: null, //服务套餐面积
          package_price: null, //服务套餐价格
          mc_packrebate: null //套餐员工提成
        });
        return;
      }
      if (this.ruleForm.serviceType == 2) {
        this.serviceList.push({
          key_name: null, //服务名称
          price: null, //服务价格
          package_price: null, //服务套餐价格
          mc_rebate: null, //员工提成
          mc_packrebate: null //套餐员工提成
        });
        return;
      }
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
        this.$nextTick(()=>{
          this.selectgoodsItemList.map((item,index)=>{
            this.goodsAttributesList.map((item2,index2)=>{
              if(item.sgp_id == item2.sgp_id){
                this.sgp_id_radio.push(item.sgp_id);
                const sgp_id_radio = this.sgp_id_radio.sort();
                const sgp_id_radio_new = [sgp_id_radio[0]]
                this.sgp_id_radio.map((item, index) => {
                    if (
                      sgp_id_radio[index] !==
                      sgp_id_radio_new[sgp_id_radio_new.length - 1]
                    ) {
                      sgp_id_radio_new.push(sgp_id_radio[index])
                      this.sgp_id_radio = sgp_id_radio_new;
                      console.log(this.sgp_id_radio,'this.sgp_id_radio')
                    }
                });
              }
            })
          })
        })
      });
    },
    getSgp_id_radio_Status(id){
      let status = false;
      this.sgp_id_radio.map((item,index)=>{
        if(item == id){
          status = true;
        }
      })
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
    //upload
    handleUpload(e) {
      this.imageArr.push(window.URL.createObjectURL(e.target.files[0]));
      this.ruleForm.banner_img.push(e.target.files[0]);
    },
    handleRemove(index) {
      this.imageArr.splice(index, 1);
      this.ruleForm.banner_img.splice(index, 1);
    },
    //upload 上传分类图标
    handleUploadCategoryIcon(e) {
      this.imageUrlCategoryIcon = window.URL.createObjectURL(e.target.files[0]);
      this.ruleForm.original_type_img = e.target.files[0];
    },
    //upload 上传首页展示
    handleUploadHomeShow(e) {
      this.imageUrlHomeShow = window.URL.createObjectURL(e.target.files[0]);
      this.ruleForm.original_img = e.target.files[0];
    },
    //验证服务字段是否为空
    verificationService() {
      let btn = true;
      this.verificationServiceNameArray = [];
      if (this.ruleForm.serviceType == 1) {
        if(this.serviceListIcon.length<=0){
          btn = false;
          return;
        }
        this.serviceListIcon.map((item, index) => {
          if (this.serviceListIcon[index].key_name == null) {
            btn = false;
            return;
          }
          if (this.serviceListIcon[index].attr_icon == null) {
            btn = false;
            return;
          }
          if (this.serviceListIcon[index].price == null) {
            btn = false;
            return;
          }
          if (this.serviceListIcon[index].package_price == null) {
            btn = false;
            return;
          }
          if (this.serviceListIcon[index].mc_rebate == null) {
            btn = false;
            return;
          }
          if (this.serviceListIcon[index].mc_packrebate == null) {
            btn = false;
            return;
          }
          this.verificationServiceName(this.serviceListIcon[index].key_name);
        });
        return btn;
      }
      if (this.ruleForm.serviceType == 2) {
        if(this.serviceList.length<=0){
          btn = false;
          return;
        }
        this.serviceList.map((item, index) => {
          if (this.serviceList[index].key_name == null) {
            btn = false;
            return;
          }
          if (this.serviceList[index].price == null) {
            btn = false;
            return;
          }
          if (this.serviceList[index].package_price == null) {
            btn = false;
            return;
          }
          if (this.serviceList[index].mc_rebate == null) {
            btn = false;
            return;
          }
          if (this.serviceList[index].mc_packrebate == null) {
            btn = false;
            return;
          }
          this.verificationServiceName(this.serviceList[index].key_name);
        });
        return btn;
      }
      if (this.ruleForm.serviceType == 3) {
        if(this.serviceListArea.length<=0){
          btn = false;
          return;
        }
        this.serviceListArea.map((item, index) => {
          if (this.serviceListArea[index].key_name == null) {
            btn = false;
            return;
          }
          if (this.serviceListArea[index].min_area == null) {
            btn = false;
            return;
          }
          if (this.serviceListArea[index].price == null) {
            btn = false;
            return;
          }
          if (this.serviceListArea[index].mc_rebate == null) {
            btn = false;
            return;
          }
          // if (this.serviceListArea[index].package_area == null) {
          //   btn = false;
          //   return;
          // }
          if (this.serviceListArea[index].package_price == null) {
            btn = false;
            return;
          }
          if (this.serviceListArea[index].mc_packrebate == null) {
            btn = false;
            return;
          }
          this.verificationServiceName(this.serviceListArea[index].key_name);
        });
        return btn;
      }
    },
    //验证服务名字是否重复
    verificationServiceName(name) {
      if (!name) return;
      this.verificationServiceNameBtn = true;
      this.verificationServiceNameArray.push(name);
      const verificationServiceNameArray = this.verificationServiceNameArray.sort();
      this.verificationServiceNameArray.map((item, index) => {
        if (
          verificationServiceNameArray[index] ==
          verificationServiceNameArray[index + 1]
        ) {
          this.verificationServiceNameBtn = false;
          this.$message({
            type: "warning",
            message: "服务名称不能重复"
          });
          return;
        }
      });
      return this.verificationServiceNameBtn;
      console.log(name, "name");
      console.log(this.verificationServiceNameArray, "arr");
    },
    //验证服务项目字段类型
    verificationServiceType() {
      let btn = true;
      if (this.ruleForm.serviceType == 1) {
        this.serviceListIcon.map((item, index) => {
          if (!isFloat(this.serviceListIcon[index].price)) {
            this.$message({
              type: "warning",
              message: "单价必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceListIcon[index].mc_rebate)) {
            this.$message({
              type: "warning",
              message: "员工提成必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceListIcon[index].package_price)) {
            this.$message({
              type: "warning",
              message: "生活套餐价格必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceListIcon[index].mc_packrebate)) {
            this.$message({
              type: "warning",
              message: "套餐员工提成必须为正整数或小数"
            });
            btn = false;
            return;
          }
        });
        return btn;
      }
      if (this.ruleForm.serviceType == 2) {
        this.serviceList.map((item, index) => {
          if (!isFloat(this.serviceList[index].price)) {
            this.$message({
              type: "warning",
              message: "单价必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceList[index].mc_rebate)) {
            this.$message({
              type: "warning",
              message: "员工提成必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceList[index].package_price)) {
            this.$message({
              type: "warning",
              message: "生活套餐价格必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceList[index].mc_packrebate)) {
            this.$message({
              type: "warning",
              message: "套餐员工提成必须为正整数或小数"
            });
            btn = false;
            return;
          }
        });
        return btn;
      }
      if (this.ruleForm.serviceType == 3) {
        this.serviceListArea.map((item, index) => {
          if (!isFloat(this.serviceListArea[index].min_area)) {
            this.$message({
              type: "warning",
              message: "最小服务面积必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceListArea[index].price)) {
            this.$message({
              type: "warning",
              message: "单价必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceListArea[index].mc_rebate)) {
            this.$message({
              type: "warning",
              message: "员工提成必须为正整数或小数"
            });
            btn = false;
            return;
          }
          // if (!isFloat(this.serviceListArea[index].package_area)) {
          //   this.$message({
          //     type: "warning",
          //     message: "套餐服务面积必须为正整数或小数"
          //   });
          //   btn = false;
          //   return;
          // }
          if (!isFloat(this.serviceListArea[index].package_price)) {
            this.$message({
              type: "warning",
              message: "套餐价格必须为正整数或小数"
            });
            btn = false;
            return;
          }
          if (!isFloat(this.serviceListArea[index].mc_packrebate)) {
            this.$message({
              type: "warning",
              message: "套餐员工提成必须为正整数或小数"
            });
            btn = false;
            return;
          }
        });
        return btn;
      }
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
    changeStatus(id, status, type) {
      this.$confirm("此操作将改变列表状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const formData = {
            id: id
          };
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //删除单个图片的方法
    handleRemoveCategory(type) {
      if (type == "Icon") {
        this.imageUrlCategoryIcon = null;
        this.ruleForm.original_type_img = null;
        return;
      }
      if (type == "Show") {
        this.imageUrlHomeShow = null;
        this.ruleForm.original_img = null;
        return;
      }
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
    quillEditor,
    CartContral
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/* tree */
.header-flex,
.body-flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.header-flex {
  padding: 10px;
  background-color: #eef1f6;
}
.table-item {
  /* width: 33.3%; */
  flex: 1;
  text-align: center;
  flex: 1;
  text-align: left;
  padding: 0 40px;
}
.table-item .editButton {
  padding: 0 10px;
  vertical-align: text-top;
}
.body-flex i {
  font-size: 20px;
  color: #409eff;
}
.service-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.service-item {
  flex: 1;
  text-align: left;
}
.service-item span {
  font-size: 12px;
}
.service-i > i {
  font-size: 24px;
  cursor: pointer;
}
.box-card-item {
  display: flex;
  justify-content: space-around;
}
.box-card-item > div {
  flex: 1;
  text-align: left;
}
.box-footer {
  margin-top: 20px;
  border-top: 1px solid #ccc;
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

