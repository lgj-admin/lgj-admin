<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-button v-if="handleCode('Admin@branchManager')" @click="add()" type="primary">添加</el-button>
                </div>
                <div class="header-content-right">
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table" v-loading="loading">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">手机号</div>
                                <div class="td">姓名</div>
                                <div class="td">所属大区</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in branchManagerList" :key="index">
                                <div class="td">{{item.phone}}</div>
                                <div class="td">{{item.user_name}}</div>
                                <div class="td">{{item.area_name}}——{{item.city}}</div>
                                <div class="td">
                                    <a href="javascript:void(0)" v-if="handleCode('Admin@branchManagerDoEdit')" @click="handleEdit(item.admin_id)">编辑</a>
                                    <a href="javascript:void(0)" v-if="handleCode('Admin@branchManagerDelete')" @click="handleDelete(item.admin_id)">删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-page">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :current-page="page"
                            @current-change="handlePage"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" :title="!id?'添加大区经理':'编辑大区经理'">
            <div slot="dialog-body">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="30%"
                    :status-icon="true"
                    v-if="showmodel"
                >
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属大区" prop="selectArea">
                        <el-select v-model="ruleForm.selectArea" placeholder="选择大区">
                              <el-option
                                    v-for="item in selectregional"
                                    :key="item.id"
                                    :label="item.area_name"
                                    :value="item.id">
                              </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="!id" label="密码" prop="pasd">
                        <el-input type="password" v-model="ruleForm.pasd"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!id" label="确认密码" prop="checkPasd">
                        <el-input type="password" v-model="ruleForm.checkPasd"></el-input>
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
        name: null, //姓名
        phone: null, //手机号
        selectArea: null, //选择所属大区
        pasd: null, //密码
        checkPasd: null //确认密码
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        selectArea: [
          { required: true, message: "请选择所属大区", trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        pasd: [{ required: true, validator: validatePasd, trigger: "blur" }],
        checkPasd: [
          { required: true, validator: validateCheckPasd, trigger: "blur" }
        ]
      },
      showmodel: false,
      selectregional: [],
      branchManagerList: [], //大区经理列表
      total: null,
      page:1,
      id: null, //大区经理id
      loading:true,
    };
  },
  created() {
    this.init();
    ApiDataModule("CITYLIST", {}).then(res => {
      if (res.code == CODE_OK) {
        this.selectregional = res.data.data;
      }
    });
  },
  computed:{
    ...mapGetters(['codeList'])
  },
  methods: {
    init(){
      this.loading = true;
      //大区经理列表
      ApiDataModule("BRANCHMANAGERLIST", {page:this.page}).then(res => {
        console.log(res);
        if(res.code == CODE_OK){
          this.loading = false;
          this.branchManagerList = res.data.data;
          this.total = res.data.total;
        }else{
          this.loading = false;
          this.$message({type:'warning',message:`${res.code}数据接收异常`})
        }
      });
    },
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    handlePage(e) {
      this.page = e;
      this.init();
    },
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = {
            user_name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            city: this.ruleForm.selectArea
          };
          if (!this.id) {
            formData.password = this.ruleForm.pasd;
            formData.password2 = this.ruleForm.checkPasd;
            ApiDataModule("BRANCHMANAGER", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.showmodel = false;
                this.init();
                this.$refs[formName].resetFields();
                return;
              } else if (res.code == CODE_ERR) {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
                return;
              }
            });
          } else {
            formData.id = this.id;
            ApiDataModule("BRANCHMANAGERDOEDIT", formData).then(res => {
              if (res.code == CODE_OK) {
                console.log(res);
                this.init();
              } else if (res.code == CODE_ERR) {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    handleEdit(id) {
      this.id = id;
      ApiDataModule("BRANCHMANAGEREDIT", {
        id: id
      }).then(res => {
        console.log(res);
        if (res.code == CODE_OK) {
          this.ruleForm.name = res.data.user_name;
          this.ruleForm.phone = res.data.phone;
          this.ruleForm.selectArea = res.data.city_id;
        }
      });
      this.showmodel = true;
    },
    add() {
      this.id = null;
      this.ruleForm.name = null;
      this.ruleForm.pasd = null;
      this.ruleForm.checkPasd = null;
      this.ruleForm.phone = null;
      this.ruleForm.selectArea = null;
      this.showmodel = true;
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该大区经理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ApiDataModule("BRANCHMANAGERDELETE", { id: id }).then(res => {
            console.log(res);
            if (res.code == CODE_OK) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.init();
            } else if (res.code == CODE_ERR) {
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

