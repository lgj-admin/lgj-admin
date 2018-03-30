<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-input placeholder="用户昵称"
                              v-model="searchNameValue"
                              clearable>
                    </el-input>
                    <el-input placeholder="手机号"
                              v-model="searchTelValue"
                              clearable>
                    </el-input>
                  <el-button @click="handleSearch" class="search-button" type="primary">搜索</el-button>
                </div>
                <div class="header-content-right">
                    <el-button @click="add" type="primary">添加</el-button>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">昵称</div>
                                <div class="td">手机号</div>
                                <div class="td">注册时间</div>
                                <div class="td">是否绑定微信</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in userList" :key="index">
                                <div class="td">{{item.nickname}}</div>
                                <div class="td">{{item.mobile}}</div>
                                <div class="td">{{item.reg_time}}</div>
                                <div class="td">{{item.unionid}}</div>
                                <div class="td">
                                    <a href="javascript:void(0)" @click="handleFreeze(item.user_id,item.is_lock)">{{freezeStatus(item.is_lock)}}</a>
                                    <a href="javascript:void(0)" @click="handleEdit(item.user_id)">编辑</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-page">
                        <el-pagination
                            background
                            @current-change="handlePagination"
                            layout="prev, pager, next"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" :title="!user_id?'添加用户':'编辑用户'">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pasd" v-if="!user_id">
                        <el-input v-model="ruleForm.pasd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPasd" v-if="!user_id">
                        <el-input v-model="ruleForm.checkPasd"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import { isMobil } from "config/utils";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";

export default {
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
    const validatePasd = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPasd !== null) {
          this.$refs.ruleForm.validateField("checkPasd");
        }
        callback();
      }
    };
    const validateCheckPasd = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pasd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: null, //昵称
        phone: null, //手机号
        pasd: null, //密码
        checkPasd: null //确认密码
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        pasd: [{ required: true, validator: validatePasd, trigger: "blur" }],
        checkPasd: [
          { required: true, validator: validateCheckPasd, trigger: "blur" }
        ]
      },
      searchNameValue: "",
      searchTelValue: "",
      showmodel: false,
      userList: [],
      total: null,
      page: 1,
      user_id: null //用户id
    };
  },
  created() {
    ApiDataModule("USERSEARCH").then(res => {
      console.log(res);
      this.userList = res.data.data;
      this.total = res.data.total;
      this.page = res.data.current_page;
    });
  },
  methods: {
    //提交
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = {
            nickname: this.ruleForm.name,
            mobile: this.ruleForm.phone
          };
          if (this.user_id) {
            formData.user_id = this.user_id;
          } else {
            formData.password = this.ruleForm.pasd;
            formData.password2 = this.ruleForm.checkPasd;
          }
          ApiDataModule("USERADDEDIT", formData).then(res => {
            if (res.code == CODE_OK) {
              this.showmodel = false;
              this.$message({
                type:'success',
                message:'提交成功'
              })
              ApiDataModule("USERSEARCH").then(res => {
                this.userList = res.data.data;
                this.total = res.data.total;
                this.page = res.data.current_page;
              });
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
            }
            console.log(res);
          });
        } else {
          return false;
        }
      });
    },
    //搜索
    handleSearch() {
      const formData = {
        nickname: this.searchNameValue,
        mobile: this.searchTelValue,
        page: this.page
      };
      ApiDataModule("USERSEARCH", formData).then(res => {
        this.userList = res.data.data;
        this.total = res.data.total;
        this.page = res.data.current_page;
      });
    },
    //处理分页
    handlePagination(page) {
      console.log(page);
      const formData = {
        nickname: this.searchNameValue,
        mobile: this.searchTelValue,
        page: page
      };
      ApiDataModule("USERSEARCH", formData).then(res => {
        this.userList = res.data.data;
        this.total = res.data.total;
        this.page = res.data.current_page;
      });
    },
    add() {
      this.showmodel = true;
      this.user_id = null;
      this.ruleForm.name = null;
      this.ruleForm.phone = null;
      this.ruleForm.pasd = null;
      this.ruleForm.checkPasd = null;
    },
    //冻结操作
    handleFreeze(id, is_lock) {
      const formData = {
        user_id: id
      };
      const formData2 = {
        nickname: this.searchNameValue,
        mobile: this.searchTelValue,
        page: this.page
      };

      if (is_lock == 0) {
        formData.is_lock = 1;
      } else if (is_lock == 1) {
        formData.is_lock = 0;
      }
      ApiDataModule("USERLOCK", formData).then(res => {
        console.log(res);
        if (res.code == CODE_OK) {
          ApiDataModule("USERSEARCH", formData2).then(res => {
            this.userList = res.data.data;
            this.total = res.data.total;
            this.page = res.data.current_page;
          });
          this.$message({
            type: "success",
            message: "冻结成功"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    },
    //冻结状态
    freezeStatus(status) {
      let desc = "";
      if (status == 0) {
        desc = "冻结";
        return desc;
      }
      if (status == 1) {
        desc = "解冻";
        return desc;
      }
    },
    //编辑 获取用户信息
    handleEdit(id) {
      this.user_id = id;
      ApiDataModule("USEREDIT", { user_id: id }).then(res => {
        console.log(res);
        this.ruleForm.name = res.data.nickname;
        this.ruleForm.phone = res.data.mobile;
      });
      this.showmodel = true;
    },
    //删除
    handleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
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
</style>

