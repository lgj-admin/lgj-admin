<template>
    <div class="home">
        <panpel>
            <div slot="header" class="header-content">
                <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="(e)=>{this.activeIndex = e;}">
                    <el-menu-item index="1">员工等级</el-menu-item>
                    <el-menu-item index="2">员工管理</el-menu-item>
                </el-menu> -->
                <div class="bottom">
                    <div class="header-content-left">
                        <el-input placeholder="员工姓名"
                                  v-model="searchValueName"
                                  clearable>
                        </el-input>
                        <el-input placeholder="员工电话"
                                  v-model="searchValueTel"
                                  clearable>
                        </el-input>
                        <el-select v-model="searchValueSkill" clearable  placeholder="员工技能">
                            <el-option
                                  v-for="item in goodsList"
                                  :key="item.goods_id"
                                  :label="item.goods_name"
                                  :value="item.goods_id">
                            </el-option>
                        </el-select>
                        <el-select v-model="searchValueManager" clearable  placeholder="区域经理">
                            <el-option
                                  v-for="item in areaManager"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button @click="handleSearch" class="search-button" type="primary">搜索</el-button>
                    </div>
                    <div class="header-content-right">
                        <el-button @click="add()" type="primary">添加</el-button>
                    </div>
                </div>
                <!-- <div class="bottom" v-show="activeIndex == 1">
                    <el-button @click="setlevel=true" type="primary">设置等级</el-button>
                    <div></div>
                </div> -->
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">姓名</div>
                                <div class="td">手机号</div>
                                <div class="td">
                                    服务技能
                                </div>
                                <div class="td">大区经理</div>
                                <div class="td">区域经理</div>
                                <div class="td">
                                    全部地区
                                </div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in employeeList" :key="index">
                                <div class="td">{{item.name}}</div>
                                <div class="td">{{item.tel}}</div>
                                <div class="td">{{item.skill}}</div>
                                <div class="td">
                                  <span>
                                      {{item.user_name}}
                                  </span>
                                  <span>
                                      {{item.phone}}
                                  </span>
                                </div>
                                <div class="td">
                                    {{item.area_boss}}
                                    <!-- <span>
                                        马青
                                    </span>
                                    <span>
                                        13756334567
                                    </span> -->
                                </div>
                                <div class="td">
                                    {{item.area_name}}——{{item.city}}
                                </div>
                                <div class="td">
                                    <a  href="javascript:void(0)" @click="handleEdit(item.id)">分配编辑</a>
                                    <a href="javascript:void(0)" @click="handleDelete(item.id)">删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-page">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total"
                            @current-change="handlePagination"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handleAddemployee('ruleForm')" :show.sync="showmodel" :title="id==null ? '添加员工':'分配编辑员工'">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30%">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="大区经理" prop="regionalManagerValue">
                        <el-select v-model="ruleForm.regionalManagerValue" placeholder="大区经理">
                            <el-option
                                  v-for="item in regionalManager"
                                  :key="item.admin_id"
                                  :label="item.user_name"
                                  :value="item.admin_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域经理" prop="areaManagerValue">
                        <el-select v-model="ruleForm.areaManagerValue" placeholder="区域经理">
                            <el-option
                                  v-for="item in areaManager"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务技能" prop="name">
                        <el-checkbox-group
                              v-model="checkedServiceKills"
                        >
                              <el-checkbox v-for="(item,index) in goodsList" :label="item.goods_id" :key="index">{{item.goods_name}}</el-checkbox>
                        </el-checkbox-group>
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
import {ApiDataModule,CODE_OK,CODE_ERR} from "config/axios.js";

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
      activeIndex: "1", //tags索引
      ruleForm: {
        name: null, //姓名
        phone: null, //手机号
        regionalManagerValue: null, //大区经理value
        areaManagerValue: null //区域经理value
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        regionalManagerValue: [
          { required: true, message: "请选择大区经理", trigger: "change" }
        ],
        areaManagerValue: [
          { required: true, message: "请选择区域经理", trigger: "change" }
        ]
      },
      searchValueName: "", //搜索框员工姓名value
      searchValueTel: "", //搜索框员工电话value
      searchValueManager: "", //搜索框区域经理value
      searchValueSkill: "", //搜索框员工技能value
      showmodel: false, //添加员工模态框状态
      setlevel: false, //设置等级模态框状态
      cities: ["上海", "北京", "广州", "深圳"],
      checkedServiceKills: [],
      employeeList: [], //员工列表
      total: null,
      page: 1,
      id: null,
      regionalManager: [], //大区经理列表
      areaManager: [], //区域经理列表
      goodsList:[],//服务技能列表
    };
  },
  created() {
    //员工列表
    ApiDataModule("EMPLOYEELIST").then(res => {
      console.log(res, "list");
      this.employeeList = res.data.data;
      this.total = res.data.total;
      this.page = res.data.current_page;
    });
    //大区经理
    ApiDataModule("LEADERLIST", {
      type: 1
    }).then(res => {
      console.log(res, "regionalManager");
      this.regionalManager = res.data;
    });
    //区域经理
    ApiDataModule("LEADERLIST", {
      type: 2
    }).then(res => {
      console.log(res);
      this.areaManager = res.data;
    });
    //服务技能
    ApiDataModule('GETGOODSLIST').then(res=>{
      this.goodsList = res.data;
    })
  },
  methods: {
    //分页
    handlePagination(e) {
      const formData = {
        page: e
      };
      if (this.searchValueName) {
        formData.name = this.searchValueName;
      }
      if (this.searchValueTel) {
        formData.tel = this.searchValueTel;
      }
      if (this.searchValueSkill) {
        formData.skill = this.searchValueSkill;
      }
      if (this.searchValueManager) {
        formData.area_boss = this.searchValueManager;
      }
      ApiDataModule("EMPLOYEELIST", formData).then(res => {
        this.employeeList = res.data.data;
        this.total = res.data.total;
        this.page = res.data.current_page;
      });
    },
    //添加员工
    handleAddemployee(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const checkedServiceKills = this.checkedServiceKills.join(',');
          const formData = {
            name: this.ruleForm.name,
            tel: this.ruleForm.phone,
            city_boss: this.ruleForm.regionalManagerValue,
            area_boss: this.ruleForm.areaManagerValue,
            skill: checkedServiceKills
          };
          if (!this.id) {
            formData.type = 1;
            ApiDataModule("EMPLOYEEADDEDIT", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$refs[formName].resetFields();
                this.showmodel = false;
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                ApiDataModule("EMPLOYEELIST").then(res => {
                  this.employeeList = res.data.data;
                  this.total = res.data.total;
                  this.page = res.data.current_page;
                });
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
          } else {
            //编辑
            formData.type = 2;
            formData.id = this.id;
            ApiDataModule("EMPLOYEEADDEDIT", formData).then(res => {
              console.log(res);
              if (res.code == CODE_OK) {
                this.$refs[formName].resetFields();
                this.showmodel = false;
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
                ApiDataModule("EMPLOYEELIST").then(res => {
                  this.employeeList = res.data.data;
                  this.total = res.data.total;
                  this.page = res.data.current_page;
                });
              } else {
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
    //搜索
    handleSearch() {
      const formData = {
        page: 1
      };
      this.page = 1;
      if (this.searchValueName) {
        formData.name = this.searchValueName;
      }
      if (this.searchValueTel) {
        formData.tel = this.searchValueTel;
      }
      if (this.searchValueSkill) {
        formData.skill = this.searchValueSkill;
      }
      if (this.searchValueManager) {
        formData.area_boss = this.searchValueManager;
      }
      ApiDataModule("EMPLOYEELIST", formData).then(res => {
        console.log(res);
        this.employeeList = res.data.data;
        this.total = res.data.total;
        this.page = res.data.current_page;
      });
    },
    add() {
      this.id = null;
      this.ruleForm.name = null;
      this.ruleForm.phone = null;
      this.ruleForm.regionalManagerValue = null;
      this.ruleForm.areaManagerValue = null;
      // this.ruleForm.skill = null;
      this.showmodel = true;
    },
    //编辑
    handleEdit(id) {
      this.id = id;
      ApiDataModule("EMPLOYEEEDIT", { id: id }).then(res => {
        console.log(res);
        this.ruleForm.name = res.data.name;
        this.ruleForm.phone = res.data.tel;
        this.ruleForm.regionalManagerValue = res.data.city_boss;
        this.ruleForm.areaManagerValue = res.data.area_boss;
        // this.ruleForm.skill = res.data.skill;
      });
      this.showmodel = true;
    },
    //删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ApiDataModule("EMPLOYEEDELETE", { id: id }).then(res => {
            console.log(res);
            if (res.code == CODE_OK) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              ApiDataModule("EMPLOYEELIST").then(res => {
                this.employeeList = res.data.data;
                this.total = res.data.total;
                this.page = res.data.current_page;
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
    }
  },
  components: {
    Panpel,
    ModelBox
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
</style>

