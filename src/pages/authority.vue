<template>
    <div class="service">
        <panpel>
            <div slot="header" class="header-content">
                <div class="bottom">
                    <el-button @click="add()" type="primary">添加权限</el-button>
                    <div></div>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">权限名称</div>
                                <div class="td">权限码</div>
                                <div class="td">权限分组</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in systemAuthList" :key="index">
                                <div class="td">{{ item.name }}</div>
                                <div class="td">{{item.right}}</div>
                                <div class="td">{{item.group}}</div>
                                <div class="td">
                                    <a href="javascript:void(0)" class="table-item" @click="handleEdit(item.id)" v-if="handleCode('System@handleSystemAuth')">编辑</a>
                                    <span v-else>无</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box
            @selectSubmit="handlesubmit('ruleForm')"
            :show.sync="addauthority"
            :title="!id?'添加权限':'编辑权限'"
        >
            <div slot="dialog-body">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="35%"
                    :status-icon="true"
                    v-if="addauthority"
                >
                    <el-form-item label="权限名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入权限名称"></el-input>
                    </el-form-item>
                    <el-form-item label="权限分组" prop="groupCode">
                        <el-select v-model="ruleForm.groupCode" placeholder="权限分组">
                            <el-option
                                  v-for="item in groupArray"
                                  :key="item.group"
                                  :label="item.name"
                                  :value="item.group">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限码控制器" prop="code">
                        <el-select v-model="ruleForm.code" placeholder="权限码控制器" @change="handleSelectGroup">
                            <el-option
                                  v-for="item in getController"
                                  :key="item"
                                  :label="item"
                                  :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限码方法" prop="code2">
                        <el-select v-model="ruleForm.code2" placeholder="权限码方法">
                            <el-option
                                  v-for="item in getAction"
                                  :key="item"
                                  :label="item"
                                  :value="item">
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
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import { getStore ,codeStatus} from "config/utils";
import {mapGetters} from 'vuex'


export default {
  data() {
    return {
      addauthority: false, //添加权限模态框状态
      ruleForm: {
        name: null, //权限名称
        code: null, //权限码一级
        code2: null, //权限码二级
        groupCode: null //权限分组
      },
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        code: [{ required: true, message: "请选择权限码一级", trigger: "blur" }],
        code2: [{ required: true, message: "请选择权限码二级", trigger: "blur" }],
        groupCode: [
          { required: true, message: "请选择权限分组", trigger: "change" }
        ]
      },
      groupArray: [], //权限分组数据
      systemAuthList: [], //权限列表数据
      id: null ,//权限id
      getController:[],//权限码第一级数据
      getAction:[],//权限码第二级数据
    };
  },
  created() {
    //权限列表
    ApiDataModule("SYSTEMAUTHLIST").then(res => {
      console.log(res);
      if (res.code == CODE_OK) {
        this.systemAuthList = res.data;
      }
    });
    //权限分组数据
    ApiDataModule("AUTHGROUP").then(res => {
      console.log(res);
      if (res.code == CODE_OK) {
        this.groupArray = res.data;
      }
    });
    //权限码第一级
    ApiDataModule("GETCONTROLLER").then(res=>{
      if (res.code == CODE_OK) {
        this.getController = res.data;
      }
    })
  },
  computed:{
    ...mapGetters(['codeList'])
  },
  methods: {
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    handleSelectGroup(e){
      console.log(e);
      this.ruleForm.code2 = null;
      ApiDataModule('GETACTION',{
        controller:e
      }).then(res=>{
        console.log(res);
        this.getAction = res;
      })
    },
    //提交
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const admininfo = JSON.parse(getStore('ADMININFO'));
          const formData = {
            name: this.ruleForm.name,
            con: this.ruleForm.code,
            act: this.ruleForm.code2,
            group: this.ruleForm.groupCode,
            adminid:admininfo.admin_id
          };
          if (this.id) {
            formData.id = this.id;
          }
          ApiDataModule("HANDLESYSTEMAUTH", formData).then(res => {
            if (res.code == CODE_OK) {
              this.addauthority = false;
              ApiDataModule("SYSTEMAUTHLIST").then(res => {
                if (res.code == CODE_OK) {
                  this.systemAuthList = res.data;
                }
              });
            }else{
              this.$message({
                type:'warning',
                message:res.msg
              })
            }
          });
        } else {
          return false;
        }
      });
    },
    //编辑
    handleEdit(id) {
      this.id = id;
      this.addauthority = true;
      const formData = {
        id: id,
        role_id: ""
      };
      ApiDataModule("AUTHINFO", formData).then(res => {
        if (res.code == CODE_OK) {
          this.ruleForm.name = res.data.name;
          this.ruleForm.code = res.data.con;
          this.ruleForm.code2 = res.data.act;
          this.ruleForm.groupCode = res.data.group;
        }
      });
    },
    add() {
      this.id = null;
      this.ruleForm.name = null;
      this.ruleForm.code = null;
      this.ruleForm.code2 = null;
      this.ruleForm.groupCode = null;
      this.addauthority = true;
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
.td i {
  vertical-align: middle;
  font-size: 20px;
  cursor: pointer;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/* tree */
.header-flex,
.body-flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.header-flex {
  padding: 10px;
  background-color: #eef1f6;
}
.table-item {
  flex: 1;
  text-align: left;
  /* padding: 0 40px; */
}
.body-flex i {
  font-size: 20px;
}
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
.box-card-item {
  display: flex;
  justify-content: space-around;
}
.box-card-item > div {
  flex: 1;
  text-align: left;
}
.box-footer {
  margin-top: 20px;
  border-top: 1px solid #ccc;
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

