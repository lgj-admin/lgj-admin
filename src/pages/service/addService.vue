<template>
    <div class="addService">
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            :status-icon="true"
        >
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
            <el-form-item label="添加首页分类图标(建议尺寸:200X200)" prop="original_type_img">
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
            <el-form-item label="添加首页展示图(建议尺寸:440X360)" prop="original_img">
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
            <el-form-item label="添加服务详情轮播(建议尺寸:750x480)" prop="banner_img">
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
                <el-button @click="handleSubmitAddService('ruleForm')">提交</el-button>
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
import { isFloat } from "config/utils.js";

export default {
  props: {
    serviceList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    serviceListIcon: {
      type: Array,
      default: () => {
        return [];
      }
    },
    serviceListArea: {
      type: Array,
      default: () => {
        return [];
      }
    },
    getCategoryList: {
      type: Array, //分类列表数据
      default: () => {
        return [];
      }
    },
    goodsInfo: {
      type: Object,
      default: () => {
        return {};
      }
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
      verificationServiceNameBtn: true,
      verificationServiceNameArray: [],
      ruleForm: {
        content: "",
        serviceType: "1", //服务类型
        serviceCategory: null, //选择服务分类Value
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
  components: {
    Upload,
    quillEditor
  },
  created() {
    if (this.goodsInfo.goods_id) {
      console.log(this.goodsInfo, "asdsad");
      this.ruleForm.serviceCategory = this.goodsInfo.cat_id;
      this.ruleForm.goods_name = this.goodsInfo.goods_name;
      this.ruleForm.goods_remark = this.goodsInfo.goods_remark;
      this.ruleForm.checkedArea = this.goodsInfo.shipping_area_ids;
      this.ruleForm.serviceType = this.goodsInfo.extend_cat_id.toString();

      this.ruleForm.original_img = this.goodsInfo.original_img;
      this.imageUrlHomeShow = this.goodsInfo.original_img;
      this.ruleForm.original_type_img = this.goodsInfo.original_type_img;
      this.imageUrlCategoryIcon = this.goodsInfo.original_type_img;

      this.goodsInfo.banner_img.map((item,index)=>{
        this.ruleForm.banner_img.push(item);
        this.imageArr.push(item);
      })
      this.ruleForm.content = this.goodsInfo.goods_content;
    }
  },
  methods: {
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
        this.sgp_id_radio.map((item, index2) => {
          if (item == this.selectgoodsItemList[index].sgp_id) {
            this.sgp_id_radio.splice(index2, 1);
          }
        });
        this.selectgoodsItemList.splice(index, 1);
        return;
      }
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
          this.$emit("selectAddService", this.ruleForm);
        } else {
          return false;
        }
      });
    },
    addIconStatus(index) {
      this.$emit("selectAddStatus", index);
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
      console.log(e,'e')
      // console.log(this.imageArr,'this.imageArr11111111')
      this.imageArr.push(window.URL.createObjectURL(e.target.files[0]));
      console.log(this.imageArr,'this.imageArr')
      this.ruleForm.banner_img.push(e.target.files[0]);
      console.log(this.ruleForm.banner_img,'this.ruleForm.banner_img');
      console.log(this.goodsInfo,'this.goodsInfo');
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
    },
    //验证服务字段是否为空
    verificationService() {
      let btn = true;
      this.verificationServiceNameArray = [];
      if (this.ruleForm.serviceType == 1) {
        if (this.serviceListIcon.length <= 0) {
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
        if (this.serviceList.length <= 0) {
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
        if (this.serviceListArea.length <= 0) {
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
