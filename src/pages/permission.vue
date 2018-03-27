<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-button @click="showmodel=true" type="primary">添加</el-button>
                </div>
                <div class="header-content-right">
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">角色名称</div>
                                <div class="td">角色描述</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in adminRole" :key="index">
                                <div class="td">{{item.role_name}}</div>
                                <div class="td">{{item.role_desc}}</div>
                                <div class="td">
                                    <a href="javascript:void(0)" @click="handleEdit(item.role_id)">编辑</a>
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
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="添加角色" width="60%">
          <div slot="dialog-body">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="角色名称" prop="name">
                      <el-input v-model="ruleForm.name" placeholder="请输入角色名称"></el-input>
                  </el-form-item>
                  <el-form-item label="角色描述" prop="desc">
                      <el-input v-model="ruleForm.desc" placeholder="请输入角色描述"></el-input>
                  </el-form-item>
                  <el-form-item label="权限" prop="selectAuthority">
                      <el-tree
                              ref="tree"
                              :data="systemAuthList"
                              :props="defaultProps"
                              show-checkbox
                              node-key="id"
                              default-expand-all
                              @check-change = "selectAuthority"
                              :expand-on-click-node="false">
                        </el-tree>
                  </el-form-item>
              </el-form>
          </div>
        </model-box>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import {ApiDataModule,CODE_OK,CODE_ERR} from "config/axios.js";

export default {
  data() {
    const data = [
      {
        id: 1,
        label: "系统设置",
        children: [
          {
            id: 8,
            label: "城市管理"
          },
          {
            id: 9,
            label: "添加城市"
          }
        ]
      },
      {
        id: 2,
        label: "人员管理",
        children: [
          {
            id: 5,
            label: "大区经理设置"
          },
          {
            id: 6,
            label: "添加"
          }
        ]
      },
      {
        id: 3,
        label: "订单管理"
      },
      {
        id: 7,
        label: "服务管理"
      }
    ];
    return {
      ruleForm: {
        name: null, //角色名称
        selectAuthority: [],
        desc:null
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入角色描述", trigger: "blur" }],
        selectAuthority: [
          { required: true, message: "请选择权限", trigger: "blur" }
        ]
      },
      showmodel: false,
      id:null,//角色id
      data5: JSON.parse(JSON.stringify(data)),
      adminRole:[],//角色列表数据
      systemAuthList:[],//权限列表
      defaultProps:{
        label:'name'
      }
    };
  },
  created() {
    //角色列表
    ApiDataModule('ADMINROLE').then(res=>{
      console.log(res);
      this.adminRole = res.data;
    })
    //权限列表
    ApiDataModule("SYSTEMAUTHLIST").then(res => {
      console.log(res);
      if (res.code == CODE_OK) {
        this.systemAuthList = res.data;
      }
    });
  },
  methods: {
    //提交
    handlesubmit(formName) {
      console.log(this.$refs.tree.getCheckedKeys());
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = {
            name:this.ruleForm.name,
            desc:this.ruleForm.desc,
          };
          if(this.id){
            formData.id = this.id;
          }
          ApiDataModule('HANDLEADMINROLE',formData).then(res=>{
            this.showmodel = false;
            console.log(res);
          })
        } else {
          return false;
        }
      });
    },
    selectAuthority(e) {
      console.log(e);
    },
    //编辑
    handleEdit(id){
      this.id = id;
      this.showmodel = true;
      ApiDataModule("ADMININFO",{
        id:id
      }).then(res=>{
        console.log(res)
      })
    },
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

