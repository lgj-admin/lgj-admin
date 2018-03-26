<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-input placeholder="用户昵称、手机号"
                              v-model="searchValue"
                              clearable>
                    </el-input>
                  <el-button @click="handleSearch" class="search-button" type="primary">搜索</el-button>
                </div>
                <div class="header-content-right">
                    <el-button @click="showmodel=true" type="primary">添加</el-button>
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
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">13756334567</div>
                                <div class="td">2018-02-11-12:23</div>
                                <div class="td">是</div>
                                <div class="td">
                                    <a href="javascript:void(0)" @click="handleDelete">删除</a>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">13756334567</div>
                                <div class="td">2018-02-11-12:23</div>
                                <div class="td">是</div>
                                <div class="td">
                                    <a href="javascript:void(0)" @click="handleDelete">删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-page">
                        <el-pagination
                            background
                            @current-change="handlePagination"
                            layout="prev, pager, next"
                            :total="1000"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="添加用户">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pasd">
                        <el-input v-model="ruleForm.pasd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPasd">
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
import ApiDataModule from "config/axios.js";

const Err_OK = 1001;
const Err_err = 1000;

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
      searchValue: "",
      showmodel: false
    };
  },
  created() {
    ApiDataModule('EMPLOYEELIST').then(res=>{
      console.log(res)
    })
  },
  methods: {
    //提交
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
    //搜索
    handleSearch() {
      if (this.searchValue != "") {
        alert("此功能暂未开发");
      }
    },
    //处理分页
    handlePagination(page) {
      console.log(page);
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

