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
                        <el-button v-if="handleCode('Staff@employeeAddEdit')" @click="add()" type="primary">添加</el-button>
                    </div>
                </div>
                <!-- <div class="bottom" v-show="activeIndex == 1">
                    <el-button @click="setlevel=true" type="primary">设置等级</el-button>
                    <div></div>
                </div> -->
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table" v-loading="loading">
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
                                <div class="td td-word">{{item.skill}}</div>
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
                                </div>
                                <div class="td">
                                    {{item.area_name}}——{{item.city}}
                                </div>
                                <div class="td">
                                    <a  href="javascript:void(0)" v-if="handleCode('Staff@employeeAddEdit')" @click="handleEdit(item.id)">分配编辑</a>
                                    <a href="javascript:void(0)" v-if="handleCode('Staff@employeeDelete')" @click="handleDelete(item.id)">删除</a>
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
                            @current-change="handlePagination"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handleAddemployee('ruleForm')" :show.sync="showmodel" :title="id==null ? '添加员工':'分配编辑员工'" :width="'40%'">
            <div slot="dialog-body">
                <el-form
                    ref="ruleForm"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="35%"
                    :status-icon="true"
                    v-if="showmodel"
                >
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
                    <el-form-item label="服务技能" prop="skill">
                        <el-checkbox-group
                              v-model="ruleForm.skill"
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
import { isMobil,codeStatus } from "config/utils";
import {ApiDataModule,CODE_OK,CODE_ERR} from "config/axios.js";
import {mapGetters} from 'vuex'


export default {
  data() {
    const validateName = (rule, value, callback) => {
      console.log(value)
      if(value === null || value === ''){
        callback(new Error("请输入姓名"));
      }else{
        if(value.length > 10){
          callback(new Error("不能超过10个字符"));
        }
        callback();
      }
    };
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
        areaManagerValue: null, //区域经理value
        skill: [], //技能
      },
      rules: {
        name: [{ required: true,validator: validateName, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        regionalManagerValue: [
          { required: true, message: "请选择大区经理", trigger: "change" }
        ],
        areaManagerValue: [
          { required: true, message: "请选择区域经理", trigger: "change" }
        ],
        skill: [
          { required: true, message: "请选择技能", trigger: "change" }
        ]
      },
      searchValueName: "", //搜索框员工姓名value
      searchValueTel: "", //搜索框员工电话value
      searchValueManager: "", //搜索框区域经理value
      searchValueSkill: "", //搜索框员工技能value
      showmodel: false, //添加员工模态框状态
      setlevel: false, //设置等级模态框状态
      employeeList: [], //员工列表
      total: null,
      page: 1,
      id: null,
      regionalManager: [], //大区经理列表
      areaManager: [], //区域经理列表
      goodsList:[],//服务技能列表
      loading:true,
    };
  },
  created() {
    this.init();
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
  computed:{
    ...mapGetters(['codeList'])
  },
  methods: {
    init(){
      this.loading = true;
      const formData = {
        page: this.page
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
      //员工列表
      ApiDataModule("EMPLOYEELIST",formData).then(res => {
        console.log(res, "list");
        if(res.code == CODE_OK){
          this.loading = false;
          this.employeeList = res.data.data;
          this.total = res.data.total;
          this.page = res.data.current_page;
        }else{
          this.loading = false;
          this.$message({type:'warning',message:`${res.code}数据接收异常`})
        }
      });
    },
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    //分页
    handlePagination(e) {
      this.page = e;
      this.init();
    },
    //添加员工
    handleAddemployee(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const skill = this.ruleForm.skill.join(',');
          const formData = {
            name: this.ruleForm.name,
            tel: this.ruleForm.phone,
            city_boss: this.ruleForm.regionalManagerValue,
            area_boss: this.ruleForm.areaManagerValue,
            skill: skill
          };
          if (!this.id) {
            formData.type = 1;
            ApiDataModule("EMPLOYEEADDEDIT", formData).then(res => {
              if (res.code == CODE_OK) {
                this.$refs[formName].resetFields();
                this.showmodel = false;
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.init();
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
          } else {
            //编辑
            console.log('asdasd')
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
                this.init();
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
      this.page = 1;
      this.init();
    },
    add() {
      this.id = null;
      this.ruleForm.name = null;
      this.ruleForm.phone = null;
      this.ruleForm.regionalManagerValue = null;
      this.ruleForm.areaManagerValue = null;
      this.ruleForm.skill = [];
      this.showmodel = true;
    },
    //编辑
    handleEdit(id) {
      this.id = id;
      console.log(id,'id')
      ApiDataModule("EMPLOYEEEDIT", { id: id }).then(res => {
        console.log(res);
        this.ruleForm.name = res.data.name;
        this.ruleForm.phone = res.data.tel;
        this.ruleForm.regionalManagerValue = res.data.city_boss;
        this.ruleForm.areaManagerValue = res.data.area_boss;
        const skill = res.data.skill.split(',');
        const new_skill = JSON.parse(`[${String(skill)}]`);//数组字符串转数组数字
        this.ruleForm.skill = new_skill;
      });
      this.showmodel = true;
    },
    //删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
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

