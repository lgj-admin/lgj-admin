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
                        <el-input placeholder="请输入内容"
                                  v-model="searchValue"
                                  clearable>
                        </el-input>
                        <el-button @click="handleSearch" class="search-button" type="primary">搜索</el-button>
                    </div>
                    <div class="header-content-right">
                        <el-button @click="showmodel=true" type="primary">添加</el-button>
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
                                <div class="td">用户名</div>
                                <div class="td">姓名</div>
                                <div class="td">
                                    <el-select v-model="value"  placeholder="服务技能">
                                        <el-option
                                              v-for="item in serviceSkills"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="td">大区经理</div>
                                <div class="td">区域经理</div>
                                <div class="td">
                                    <el-select v-model="value" placeholder="全部地区">
                                        <el-option
                                              v-for="item in serviceSkills"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">马艳红</div>
                                <div class="td">日常清洗 家电清洗</div>
                                <div class="td">
                                  <span>
                                      马青
                                  </span>
                                  <span>
                                      13756334567
                                  </span>
                                </div>
                                <div class="td">
                                    <span>
                                        马青
                                    </span>
                                    <span>
                                        13756334567
                                    </span>
                                </div>
                                <div class="td">
                                    华北大区----太原
                                </div>
                                <div class="td">
                                    <a  href="#" @click="showmodelEdit = true">分配编辑</a>
                                    <a href="javascript:void(0)" @click="handleDelete">删除</a>
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
        <model-box @selectSubmit="handleSetlevel('ruleForm')" :show.sync="setlevel" title="设置等级">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="等级名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="员工所在地区" prop="name">
                        <el-select v-model="ruleForm.name" placeholder="">
                            <el-option
                                  v-for="item in serviceSkills"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="达到等级要求" prop="name">
                        <el-checkbox-group
                              v-model="checkedCities1"
                        >
                              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handleAddemployee('ruleForm')" :show.sync="showmodel" title="添加员工">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30%">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="大区" prop="name">
                        <el-select v-model="ruleForm.name" placeholder="大区">
                            <el-option
                                  v-for="item in serviceSkills"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="大区经理" prop="name">
                        <el-select v-model="ruleForm.name" placeholder="员工等级">
                            <el-option
                                  v-for="item in serviceSkills"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域经理" prop="name">
                        <el-select v-model="ruleForm.name" placeholder="员工等级">
                            <el-option
                                  v-for="item in serviceSkills"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务技能" prop="name">
                        <el-checkbox-group
                              v-model="checkedCities1"
                        >
                              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handleEditemployee('ruleForm')" :show.sync="showmodelEdit" title="分配编辑员工">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="大区" prop="name">
                        <el-select v-model="ruleForm.name" placeholder="大区">
                            <el-option
                                  v-for="item in serviceSkills"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="大区经理" prop="name">
                        <el-select v-model="ruleForm.name" placeholder="员工等级">
                            <el-option
                                  v-for="item in serviceSkills"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域经理" prop="name">
                        <el-select v-model="ruleForm.name" placeholder="员工等级">
                            <el-option
                                  v-for="item in serviceSkills"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务技能" prop="name">
                        <el-checkbox-group
                              v-model="checkedCities1"
                        >
                              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
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
        phone: null //手机号
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      searchValue: '', //搜索框value
      showmodel: false, //添加员工模态框状态
      showmodelEdit: false, //编辑模态框状态
      setlevel: false, //设置等级模态框状态
      serviceSkills: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "", //表头selectvalue
      cities: ["上海", "北京", "广州", "深圳"],
      checkedCities1: []
    };
  },
  methods: {
    //设置等级提交
    handleSetlevel(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
    //添加员工
    handleAddemployee(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
    //分配编辑员工
    handleEditemployee(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
    //搜索
    handleSearch(){
      if(this.searchValue!=''){
        alert('此功能暂未开发')
      }
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

