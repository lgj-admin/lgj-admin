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
                                      <a href="javascript:void(0)" @click="handleCategoryEdit(item.id)">编辑</a>
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
                                  <a href="javascript:void(0)">编辑</a>
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
                            <div class="tr body-table-tr">
                                <div class="td">日常清洗</div>
                                <div class="td">125起</div>
                                <div class="td">太原</div>
                                <div class="td">是</div>
                                <div class="td">
                                  <a href="#">编辑</a>
                                  <a href="javascript:void(0)" @click="handleDelete">删除</a>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">日常清洗</div>
                                <div class="td">125起</div>
                                <div class="td">太原</div>
                                <div class="td">是</div>
                                <div class="td">
                                  <a href="#">编辑</a>
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
                    <el-form-item label="选择服务分类" prop="serviceValue">
                        <el-select v-model="ruleForm.serviceValue" placeholder="服务分类">
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
                                    <el-input v-model="item.unit_price"></el-input><span>元/平</span>
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
                                            ref="myQuillEditor"
                                            class="editer"
                                            :options="editorOption" @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="addlifepackage" title="添加生活套餐" width="60%">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="套餐名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="套餐名称"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐简介" prop="name">
                        <el-input placeholder="套餐简介"></el-input>
                    </el-form-item>
                    <el-form-item label="选择服务地区">
                        <el-checkbox-group
                              v-model="ruleForm.checkedArea"
                        >
                              <el-checkbox v-for="city in area" :label="city.city" :key="city.id">{{city.city}}</el-checkbox>
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
                                        <el-button @click="()=>{manageservice = true;}">管理</el-button>
                                        <el-button @click="handleDelServiceItem(index,'removeServicePackage')">删除</el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="box-footer">
                                套餐总价：<span>{{getServiceTotal}}</span>
                            </div>
                        </el-card>
                    </el-form-item>
                    <el-form-item label="添加首页默认图(建议尺寸)">
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
                    <el-form-item label="添加服务展示图">
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
                                            ref="myQuillEditor"
                                            class="editer"
                                            :options="editorOption" @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handleAddServiceItem('ruleForm')" :show.sync="manageservice" title="添加服务项目" width="60%">
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
                    <el-form-item label="选择服务项目">
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
                                <el-radio v-if="extend_cat_id == 2" v-model="ruleForm.selectServiceItem" :label="item.sgp_id">{{item.key_name}}</el-radio>
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
                                <el-radio v-if="extend_cat_id == 1" v-model="ruleForm.selectServiceItem" :label="item.sgp_id">{{item.key_name}}</el-radio>
                            </div>
                            <div>
                                {{item.package_price}}元
                            </div>
                            <div>
                                {{item.mc_rebate}}%
                            </div>
                            <div>
                                <!-- <el-input-number :class="`servicenum${item.sgp_id}`" :ref="`servicenum${item.sgp_id}`" :min="1" :max="10" size="mini"></el-input-number> -->
                                <cart-contral :ref="`servicenum${item.sgp_id}`" :count="item"></cart-contral>
                            </div>
                        </div>
                        <div class="selectproject" v-if="extend_cat_id == 3" v-for="(item,index) in goodsAttributesList" :key="index">
                            <div>
                                <el-radio v-if="extend_cat_id == 3" v-model="ruleForm.selectServiceItem" :label="item.sgp_id">{{item.key_name}}</el-radio>
                            </div>
                            <div>
                                <input style="border:1px solid #ccc;width:60px;"/>
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
      content: "",
      editorOption: editorOptions,
      activeIndex: "1", //tags索引
      addcategory: false, //添加分类状态
      addservice: false, //添加服务状态
      addlifepackage: false, //添加生活套餐状态
      manageservice: false, //管理服务状态
      servicenum: "", //服务数量
      dialogVisible: false, //上传图片value
      iconStatus: false, //选择图标状态
      iconActiveIndex: null, //添加服务项目图标索引
      iconSubmitBtn: false,
      dialogImageUrl: "",
      area: [],
      serviceCount: { count: "1" },
      ruleForm: {
        name: "",
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
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        goods_name: [
          { required: true, message: "请输入服务名称", trigger: "blur" }
        ],
        goods_remark: [
          { required: true, message: "请输入服务简介", trigger: "blur" }
        ],
        serviceCategory: [
          { required: true, message: "请选择服务分类", trigger: "change" }
        ],
        serviceItem: [
          { required: true, message: "请选择服务", trigger: "change" }
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
      fileList: [],
      imageArr: [], //服务详情轮播图片数组
      imageUrlCategoryIcon: null, //分类图标路径
      imageUrlHomeShow: null, //首页展示图路径路径
      getCategoryList: [], //分类列表数据
      getGoodsArray: [], //通过id获取商品数组
      categoryId: null, //服务分类id
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
          unit_price: null, //服务面积单价
          mc_rebate: null, //员工提成
          // package_area: null, //服务套餐面积
          package_price: null, //服务套餐价格
          mc_packrebate: null //套餐员工提成
        }
      ],
      verificationServiceNameArray: [],
      verificationServiceNameBtn: true,
      iconList: [], //图标列表数据
      getGoodsList: [], //服务列表数据
      extend_cat_id: null, //服务项目类型
      goodsAttributesList: [], //服务项目类型
      selectgoodsItemList: [] //选择商品属性数组
    };
  },
  created() {
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
  mounted() {},
  computed: {
    getServiceTotal() {
      return 123;
    }
  },
  methods: {
    onEditorReady() {},
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
        this.addservice = true;
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
        this.manageservice = true;
        return;
      }
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
    },
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
    //编辑服务分类
    handleCategoryEdit(id) {
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
    },
    //添加服务分类
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
              ApiDataModule("GETCATEGORY").then(res => {
                this.getCategoryList = res.data;
              });
            }
          });
          this.addcategory = false;
        } else {
          return false;
        }
      });
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
          unit_price: null, //服务面积单价
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
    //删除服务项目
    handleDelServiceItem(index, type) {
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
      if(type == 'removeServicePackage'){
        this.selectgoodsItemList.splice(index,1);
        return;
      }
    },
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
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
      });
    },
    //生活套餐里添加项目
    handleAddServiceItem(formName) {
      console.log(this.goodsAttributesList, "goodsAttributesList");
      console.log(
        this.selectgoodsItemList,
        "ruleForm.selectgoodsItemList"
      );
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.manageservice = false;
          this.goodsAttributesList.map((item, index) => {
            if (item.sgp_id == this.ruleForm.selectServiceItem) {
              console.log(
                this.goodsAttributesList[index],
                "this.goodsAttributesList[index]"
              );
              this.selectgoodsItemList.push(this.goodsAttributesList[index]);
            }
            console.log(this.selectgoodsItemList, "asdadsadas");
          });
        } else {
          return false;
        }
      });
    },
    //添加服务方法
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
          form.append("cat_id", this.ruleForm.serviceValue);
          form.append("goods_remark", this.ruleForm.goods_remark);
          form.append("shipping_area_ids", this.ruleForm.checkedArea);
          form.append("extend_cat_id", this.ruleForm.serviceType);
          form.append("original_type_img", this.ruleForm.original_type_img);
          form.append("original_img", this.ruleForm.original_img);
          this.ruleForm.banner_img.map((item, index) => {
            form.append(`banner_img${index}`, this.ruleForm.banner_img[index]);
          });
          // form.append('banner_img',this.banner_img);
          ApiDataModule("ADDGOODS", form).then(res => {
            console.log(res);
            if (res.data.code == CODE_OK) {
              this.showmodel = false;
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
        } else {
          return false;
        }
      });
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
        this.serviceListArea.map((item, index) => {
          if (this.serviceListArea[index].key_name == null) {
            btn = false;
            return;
          }
          if (this.serviceListArea[index].min_area == null) {
            btn = false;
            return;
          }
          if (this.serviceListArea[index].unit_price == null) {
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
          if (!isFloat(this.serviceListArea[index].unit_price)) {
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
            message: "已取消删除"
          });
        });
    },
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

