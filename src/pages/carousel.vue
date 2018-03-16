<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                  <el-button class="search-button" @click="showmodel = true">添加广告</el-button>
                </div>
                <div class="header-content-right">
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">id</div>
                                <div class="td">轮播图</div>
                                <div class="td">上架</div>
                                <div class="td">排序</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr">
                                <div class="td">1</div>
                                <div class="td">
                                    <img src="../assets/logo.png" alt="" width="100" height="55">
                                </div>
                                <div class="td">是</div>
                                <div class="td">1</div>
                                <div class="td">
                                  <a href="#">编辑</a>
                                  <a href="#">删除</a>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">2</div>
                                <div class="td">
                                    <img src="../assets/logo.png" alt="" width="100" height="55">
                                </div>
                                <div class="td">是</div>
                                <div class="td">1</div>
                                <div class="td">
                                  <a href="#">编辑</a>
                                  <a href="#">删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-page">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box :show.sync="showmodel" title="添加轮播图" :showButton="false">
          <div slot="dialog-body">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="上传图片:(建议尺寸)" prop="name">
                      <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                      >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                  </el-form-item>
                  <el-form-item label="跳转类型" prop="linkType">
                      <el-radio v-model="ruleForm.linkType" label="1">跳转至活动</el-radio>
                      <el-radio v-model="ruleForm.linkType" label="2">跳转至文章详情</el-radio>
                  </el-form-item>
                  <el-form-item label="跳转地址" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="ID" prop="name" v-show="ruleForm.linkType == 2">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button @click="handlesubmit('ruleForm')">添加</el-button>
                      <el-button @click="showmodel = false">返回列表</el-button>
                  </el-form-item>
              </el-form>
          </div>
        </model-box>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        linkType:'1'
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      searchValue: "",
      showmodel: false,
      imageUrl: ""
    };
  },
  methods: {
    handlesubmit(formName) {
      console.log("bbb");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG || !isPNG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  components: {
    Panpel,
    ModelBox
  }
};
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.body-page {
  text-align: right;
  padding: 10px 0;
}
/* upload  style*/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

