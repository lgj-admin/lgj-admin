<template>
    <div class="addPackageService">
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            :status-icon="true"
        >
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
                <el-button @click="handleAddMethods">添加</el-button>
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
                                <el-button @click="handleEditServiceItem(item.sgp_id)">管理</el-button>
                                <el-button @click="handleDelServiceItem(index)">删除</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        套餐总价：<span>{{getServiceTotal}}</span>
                    </div>
                </el-card>
            </el-form-item>
            <el-form-item label="添加首页默认图(建议尺寸:440X360)" prop="original_img">
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
            <el-form-item label="添加服务展示图(建议尺寸:750x480)" prop="banner_img">
                <upload
                    @selectUpload="handleUpload"
                    @selectRemove="handleRemove"
                    :imgArr="imageArr"
                    listType="pictureList"
                >
                </upload>
            </el-form-item>
            <el-form-item label="服务说明">
                <el-tooltip class="item" effect="dark" content="服务套餐详情说明，上传图片大小不能超过2M" placement="top-start">
                    <i class="fa fa-question-circle-o" style="font-size:20px;cursor:pointer;"></i>
                </el-tooltip>
                <div>
                    <quill-editor
                        v-model="ruleForm.content"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption"
                    >
                    </quill-editor>
                </div>
            </el-form-item>
            <div class="selectproject">
                <el-button @click="handleSubmitAddServicePackage('ruleForm')">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import Upload from "components/upload";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import { editorOptions } from "config/vue-quill.editor-config.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor"; //调用编辑器

export default {
  components: {
    Upload,
    quillEditor
  },
  props:{
    selectgoodsItemList:{
      type:Array,//选择商品属性数组
      default:()=>{return []}
    },
    goodsInfo:{
      type:Object,
      default:()=>{return {}}
    },
    area:{
      type:Array,
      default:()=>{return []}
    }
  },
  data() {
    return {
      editorOption: editorOptions,
      dialogImageUrl: "",
      imageArr: [],
      imageUrlCategoryIcon: null, //分类图标路径
      imageUrlHomeShow: null, //首页展示图路径路径
      ruleForm: {
        content: "",
        serviceTotal:null,
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
      }
    };
  },
  created() {
    if(this.goodsInfo.goods_id){
      this.ruleForm.goods_name = this.goodsInfo.goods_name;
      this.ruleForm.goods_remark = this.goodsInfo.goods_remark;
      this.ruleForm.checkedArea = this.goodsInfo.shipping_area_ids;
      this.ruleForm.original_img = this.goodsInfo.original_img;
      this.imageUrlHomeShow = this.goodsInfo.original_img;
      this.goodsInfo.banner_img.map((item,index)=>{
        this.ruleForm.banner_img.push(item);
        this.imageArr.push(item);
      })
      this.ruleForm.content = this.goodsInfo.goods_content;
    }
  },
  computed: {
    getServiceTotal() {
      const totalArr = [];
      let total = 0;
      let totalString = "";
      let totalArray = [];

      this.selectgoodsItemList.map((item, index) => {
        totalArr.push({ count: item.count, price: item.package_price });
      });
      totalArr.map((item2, index2) => {
        totalString = `${item2.count} X ${item2.price}`;
        total += item2.count * item2.price;
        totalArray.push(totalString);
      });
      this.ruleForm.serviceTotal = total;
      return `${totalArray.join("+")} = ${total}`;
    }
  },
  methods: {
    handleSubmitAddServicePackage(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("selectAddServicePackage", this.ruleForm);
        } else {
          return false;
        }
      });
    },
    handleAddMethods(){
      this.$emit('selectAddServiceItem')
    },
    handleEditServiceItem(id){
      this.$emit('selectEditServiceItem',id)
    },
    handleDelServiceItem(index){
      this.$emit('selectDeleteServiceItem',index)
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
    }
  }
};
</script>

<style scoped>
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

