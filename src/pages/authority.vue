<template>
    <div class="service">
        <panpel>
            <div slot="header" class="header-content">
                <div class="bottom">
                    <el-button @click="addauthority=true">添加权限</el-button>
                    <div></div>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div>
                        <div class="header-flex">
                            <div class="table-item">权限名称</div>
                            <div class="table-item">权限码</div>
                        </div>
                        <el-tree
                              :data="data5"
                              node-key="id"
                              default-expand-all
                              :expand-on-click-node="false">
                            <div class="custom-tree-node body-flex" slot-scope="{ node, data }">
                                <div class="table-item">{{ data.label }}</div>
                                <div class="table-item">{{data.id}}</div>
                            </div>
                        </el-tree>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="addauthority" title="添加权限">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="权限名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入权限名称"></el-input>
                    </el-form-item>
                    <el-form-item label="权限码" prop="code">
                        <el-input v-model="ruleForm.code" placeholder="请输入权限码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
    </div>
</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";

let id = 1000;
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
        label: "订单管理",
      },
      {
        id: 7,
        label: "服务管理",
      }
    ];
    return {
      addauthority:false,//添加权限模态框状态
      ruleForm: {
        name: null,//权限名称
        code:null,//权限码
      },
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入权限码", trigger: "blur" }],
      },
      data5: JSON.parse(JSON.stringify(data)),
    };
  },
  created() {},
  methods: {
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
  },
  components: {
    Panpel,
    ModelBox,
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
  flex:1;
  text-align: left;
  padding: 0 40px;
}
.body-flex i {
  font-size: 20px;
}
.service-content{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.service-item{
  flex:1;
  text-align: left;
}
.service-item span{
  font-size: 12px;
}
.service-i>i{
  font-size: 24px;
  cursor: pointer;
}
.box-card-item{
  display: flex;
  justify-content: space-around;
}
.box-card-item>div{
  flex:1;
  text-align: left;
}
.box-footer{
  margin-top:20px;
  border-top: 1px solid #ccc;
}
.selectproject{
  display:flex;
  justify-content: space-around;
  align-items: center;
}
.selectproject>div{
  flex:1;
  text-align: left;
}
</style>

