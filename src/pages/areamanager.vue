<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-input placeholder="请输入区域经理名称"
                              v-model="searchValueName"
                              clearable>
                    </el-input>
                    <el-input placeholder="请输入区域经理电话"
                              v-model="searchValueTel"
                              clearable>
                    </el-input>
                  <el-button @click="handleSearch" class="search-button" type="primary">搜索</el-button>
                </div>
                <div class="header-content-right">
                    <el-button v-if="handleCode('Staff@areaManagerAdd')" @click="add()" type="primary">添加</el-button>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table" v-loading="loading">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">姓名</div>
                                <div class="td">手机号</div>
                                <div class="td">所属大区</div>
                                <div class="td">所属大区经理</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in areaManagerList" :key="index">
                                <div class="td">{{item.name}}</div>
                                <div class="td">{{item.tel}}</div>
                                <div class="td">{{item.area_name}}——{{item.city}}</div>
                                <div class="td">{{item.user_name}} {{item.phone}}</div>
                                <div class="td">
                                    <a href="javascript:void(0)" v-if="handleCode('Staff@areaManagerDoEdit')" @click="handleEdit(item.id)">编辑</a>
                                    <a href="javascript:void(0)" v-if="handleCode('Staff@areaManagerDelete')" @click="handleDelete(item.id,item.status)">
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
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" :title="!id?'添加区域经理':'编辑区域经理'">
            <div slot="dialog-body">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="30%"
                    :status-icon="true"
                    v-if="showmodel"
                >
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="大区经理" prop="selectArea">
                        <el-select v-model="ruleForm.selectArea" placeholder="选择大区经理">
                              <el-option
                                    v-for="item in selectregional"
                                    :key="item.admin_id"
                                    :label="item.user_name"
                                    :value="item.admin_id">
                              </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import { isMobil,codeStatus} from "config/utils";
import {ApiDataModule,CODE_OK,CODE_ERR} from "config/axios.js";
import {mapGetters} from 'vuex'



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
    return {
      ruleForm: {
        name: null,
        phone: null,
        selectArea: null, //选择所属大区
        areaValue: null //表头选择大区
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        selectArea: [
          { required: true, message: "请选择所属大区", trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      searchValueName: "",
      searchValueTel: "",
      showmodel: false,
      selectregional: [],
      areaManagerList: [], //区域经理列表
      total: null,
      page: 1, //当前页数
      id: null ,//区域经理id
      loading:true,
    };
  },
  created() {
    this.init();
    ApiDataModule("LEADERLIST", {
      type: 1
    }).then(res => {
      console.log(res);
      this.selectregional = res.data;
    });
  },
  computed:{
    ...mapGetters(['codeList'])
  },
  methods: {
    init(){
      this.loading = true;
      //区域经理列表
      const formData = {
        page:this.page,
      }
      if (this.searchValueName) {
        formData.name = this.searchValueName;
      }
      if (this.searchValueTel) {
        formData.tel = this.searchValueTel;
      }
      ApiDataModule("AREAMANAGERLIST",formData).then(res => {
        console.log(res, "aaa");
        if(res.code == CODE_OK){
          this.loading = false;
          this.areaManagerList = res.data.data;
          this.total = res.data.total;
          this.page = res.data.current_page;
          return;
        }
        this.loading = false;
        this.$message({type:'warning',message:`${res.code}数据接收异常`})
      });
    },
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    //处理分页
    handlePagination(e){
      this.page = e;
      this.init();
    },
    //提交
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
          const formData = {
            name: this.ruleForm.name,
            tel: this.ruleForm.phone,
            city_boss: this.ruleForm.selectArea
          };
          if (!this.id) {
            //添加操作
            ApiDataModule("AREAMANAGERADD", formData).then(res => {
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
          //编辑操作
          console.log('编辑')
          formData.id = this.id;
          ApiDataModule("AREAMANAGERDOEDIT", formData).then(res => {
            console.log(res);
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
      this.page = 1;
      this.init();
    },
    //添加
    add() {
      this.id = null;
      this.ruleForm.name = null;
      this.ruleForm.phone = null;
      this.ruleForm.selectArea = null;
      this.showmodel = true;
    },
    //编辑
    handleEdit(id) {
      this.id = id;
      ApiDataModule("AREAMANAGEREDIT", {
        id: id
      }).then(res => {
        this.ruleForm.name = res.data.name;
        this.ruleForm.phone = res.data.tel;
        this.ruleForm.selectArea = res.data.city_boss;
      });
      this.showmodel = true;
    },
    //删除
    handleDelete(id,status) {
      this.$confirm(`此操作将${status == 0?'删除':'恢复'}该区域经理, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const formData = {
            id:id
          };
          if(status == 0){
            formData.status = 1;
          }
          if(status == 1){
            formData.status = 0;
          }
          ApiDataModule("AREAMANAGERDELETE", formData).then(res => {
            console.log(res);
            if (res.code == CODE_OK) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.init();
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

