<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
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
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">用户名</div>
                                <div class="td">姓名</div>
                                <div class="td">手机号</div>
                                <div class="td">
                                    <el-select v-model="ruleForm.areaValue" placeholder="选择大区">
                                        <el-option
                                              v-for="item in selectregional"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="td">所属大区经理</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">马艳红</div>
                                <div class="td">13756334567</div>
                                <div class="td">华北大区——太原</div>
                                <div class="td">马艳红 13756334567</div>
                                <div class="td">
                                    <a href="#">编辑</a>
                                    <a href="javascript:void(0)" @click="handleDelete">删除</a>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">马艳红</div>
                                <div class="td">13756334567</div>
                                <div class="td">华北大区——太原</div>
                                <div class="td">马艳红 13756334567</div>
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
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="添加区域经理">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
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
                    <el-form-item label="大区经理" prop="selectArea">
                        <el-select v-model="ruleForm.selectArea" placeholder="选择大区经理">
                              <el-option
                                    v-for="item in selectregional"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
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
      searchValue: "",
      showmodel: false,
      selectregional: []
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
    handleSearch() {
      if(this.searchValue!=''){
        alert('此功能暂未开发')
      }
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

