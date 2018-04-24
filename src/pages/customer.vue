<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-button v-if="handleCode('Admin@customerServiceAdd')" @click="add()" type="primary">添加</el-button>
                </div>
                <div class="header-content-right">
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table" v-loading="loading">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">姓名</div>
                                <div class="td">手机号</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in customerServiceList" :key="index">
                                <div class="td">{{item.user_name}}</div>
                                <div class="td">{{item.phone}}</div>
                                <div class="td">
                                    <a href="javascript:void(0)" v-if="handleCode('Admin@customerServiceDoEdit')" @click="handleEdit(item.admin_id)">编辑</a>
                                    <a href="javascript:void(0)" v-if="handleCode('Admin@customerServiceDelete')" @click="handleDelete(item.admin_id,item.status)">
                                        {{item.status == 0?'删除':'恢复'}}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-page">
                        <el-pagination
                            background
                            :current-page="page"
                            @current-change="handlePagination"
                            layout="prev, pager, next"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" :title="!id?'添加客服':'编辑客服'">
            <div slot="dialog-body">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="30%"
                    :status-icon="true"
                    v-if="showmodel"
                >
                    <!-- <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item> -->
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!id" label="密码" prop="pasd">
                        <el-input v-model="ruleForm.pasd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!id" label="确认密码" prop="checkPasd">
                        <el-input v-model="ruleForm.checkPasd" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import { isMobil ,codeStatus} from "config/utils";
import {ApiDataModule,CODE_OK,CODE_ERR} from "config/axios.js";
import {mapMutations ,mapGetters} from 'vuex'

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
        username: null, //用户名
        name: null, //姓名
        phone: null, //手机号
        pasd: null, //密码
        checkPasd: null //确认密码
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        pasd: [{ required: true, validator: validatePasd, trigger: "blur" }],
        checkPasd: [
          { required: true, validator: validateCheckPasd, trigger: "blur" }
        ]
      },
      searchValue: "", //搜素value
      showmodel: false,
      customerServiceList: [], //客服列表
      total: null,
      id: null,
      page:1,
      loading:true,
    };
  },
  created() {
    this.init();
  },
  computed:{
    ...mapGetters(['codeList'])
  },
  methods: {
    init(){
      this.loading = true;
      //客服列表
      ApiDataModule("CUSTOMERSERVICELIST",{page:this.page}).then(res => {
        console.log(res);
        if(res.code == CODE_OK){
          this.loading = false;
          this.customerServiceList = res.data.data;
          this.total = res.data.total;
          return;
        }
        this.loading = false;
        this.$message({type:'warning',message:`${res.code}数据接收异常`})
      });
    },
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    //提交
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
          const formData = {
            user_name: this.ruleForm.name,
            phone: this.ruleForm.phone
          };
          if (!this.id) {
            formData.password = this.ruleForm.pasd;
            formData.password2 = this.ruleForm.checkPasd;
            ApiDataModule("CUSTOMERSERVICEADD", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.init();
                return;
              }
              this.$message({
                type: "warning",
                message: res.msg
              });
            });
            return;
          }
          //编辑
          console.log('编辑')
          formData.id = this.id;
          ApiDataModule("CUSTOMERSERVICEDOEDIT", formData).then(res => {
            if (res.code == CODE_OK) {
              this.$message({
                type: "success",
                message: "编辑成功"
              });
              this.init();
              return;
            }
            this.$message({
              type: "warning",
              message: res.msg
            });
          });
          return;
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
    handlePagination(e) {
      this.page = e;
      this.init();
    },
    //添加客服
    add() {
      this.id = null;
      this.ruleForm.name = null;
      this.ruleForm.phone = null;
      this.showmodel = true;
    },
    //编辑
    handleEdit(id) {
      this.id = id;
      ApiDataModule("CUSTOMERSERVICEEDIT", {
        id: id
      }).then(res => {
        this.ruleForm.name = res.data.user_name;
        this.ruleForm.phone = res.data.phone;
        this.showmodel = true;
      });
    },
    //删除
    handleDelete(id,status) {
      this.$confirm(`此操作将${status == 0?'删除':'恢复'}该客服, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const formData = {
            id:id
          }
          if(status == 0){
            formData.status = 1;
          }
          if(status == 1){
            formData.status = 0;
          }
          ApiDataModule("CUSTOMERSERVICEDELETE",formData).then(res => {
            console.log(res);
            if (res.code == CODE_OK) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.init();
              return;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
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

