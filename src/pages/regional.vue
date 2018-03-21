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
                                <div class="td">用户名</div>
                                <div class="td">姓名</div>
                                <div class="td">手机号</div>
                                <div class="td">
                                    <el-select v-model="ruleForm.areaValue" placeholder="所属大区">
                                        <el-option
                                              v-for="item in selectregional"
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
                                <div class="td">arronwjn</div>
                                <div class="td">马艳红</div>
                                <div class="td">187456578</div>
                                <div class="td">华北大区——北京</div>
                                <div class="td">
                                    <a href="#">编辑</a>
                                    <a href="javascript:void(0)" @click="handleDelete">删除</a>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">arronwjn</div>
                                <div class="td">马艳红</div>
                                <div class="td">187456578</div>
                                <div class="td">华北大区——北京</div>
                                <div class="td">
                                    <a href="#">编辑</a>
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
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="添加大区经理">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="所属大区" prop="selectArea">
                        <el-select v-model="ruleForm.selectArea" placeholder="选择大区">
                              <el-option
                                    v-for="item in selectregional"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                              </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
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
        name: null,//姓名
        phone:null,//手机号
        selectArea:null,//选择所属大区
        areaValue:null,//表头选择大区
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        selectArea: [{ required: true, message: "请选择所属大区", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      showmodel: false,
      data5: JSON.parse(JSON.stringify(data)),
      selectregional: [
        {
          value: "1",
          label: "华北区一区"
        }
      ]
    };
  },
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

