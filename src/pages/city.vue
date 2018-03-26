<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-button @click="add()" type="primary">添加大区</el-button>
                </div>
                <div class="header-content-right">
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">大区名称</div>
                                <div class="td">管辖区域</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in cityList" :key="index">
                                <div class="td">{{item.area_name}}</div>
                                <div class="td">{{item.city}}</div>
                                <div class="td">
                                    <a href="javascript:void(0)" @click="handleEdit(item.id)">编辑</a>
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
                            @current-change="handlePage"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="添加大区">
          <div slot="dialog-body">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="大区名称" prop="name">
                      <el-input v-model="ruleForm.name" placeholder="请填写大区名称"></el-input>
                  </el-form-item>
                  <el-form-item label="管辖区域" prop="city">
                      <el-input v-model="ruleForm.city" placeholder="请填写管辖区域"></el-input>
                  </el-form-item>
              </el-form>
          </div>
        </model-box>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import ApiDataModule from "config/axios.js";

const Err_OK = 1001;
const Err_err = 1000;

export default {
  data() {
    return {
      ruleForm: {
        name: null, //大区名称
        city: null //管辖区域
      },
      rules: {
        name: [{ required: true, message: "请输入大区名称", trigger: "blur" }],
        city: [{ required: true, message: "请输入管辖区域", trigger: "blur" }]
      },
      showmodel: false,
      cityList: [], //大区列表
      id: null, //大区id
      total: null //分页列表条数
    };
  },
  created() {
    ApiDataModule("CITYLIST", {}).then(res => {
      if (res.code == Err_OK) {
        this.cityList = res.data.data;
        this.total = res.data.total;
        console.log(res)
      }
    });
  },
  methods: {
    handlePage(e) {
      ApiDataModule("CITYLIST", {
        page: e
      }).then(res => {
        if (res.code == Err_OK) {
          this.cityList = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id == null) {
            ApiDataModule("CITYADD", {
              area_name: this.ruleForm.name,
              city: this.ruleForm.city
            }).then(res => {
              if (res.code == Err_OK) {
                this.showmodel = false;
                ApiDataModule("CITYLIST", {}).then(res => {
                  if (res.code == Err_OK) {
                    this.cityList = res.data.data;
                    this.total = res.data.total;
                  }
                });
                return;
              } else if (res.code == Err_err) {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
                return;
              }
            });
          } else {
            ApiDataModule("CITYDOEIDT", {
              id: this.id,
              area_name: this.ruleForm.name,
              city: this.ruleForm.city
            }).then(res => {
              if (res.code == Err_OK) {
                this.showmodel = false;
                ApiDataModule("CITYLIST", {}).then(res => {
                  if (res.code == Err_OK) {
                    this.cityList = res.data.data;
                    this.total = res.data.total;
                  }
                });
                return;
              } else if (res.code == Err_err) {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
                return;
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    add() {
      this.id = null;
      this.ruleForm.name = null;
      this.ruleForm.city = null;
      this.showmodel = true;
    },
    handleEdit(id) {
      this.id = id;
      ApiDataModule("CITYEIDT", {
        id: id
      }).then(res => {
        if (res.code == Err_OK) {
          this.ruleForm.name = res.data.area_name;
          this.ruleForm.city = res.data.city;
          this.showmodel = true;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ApiDataModule("CITYDELETE", {
            id: id
          }).then(res => {
            console.log(res);
            if (res.code == Err_OK) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              ApiDataModule("CITYLIST", {}).then(res => {
                if (res.code == Err_OK) {
                  this.cityList = res.data.data;
                  this.total = res.data.total;
                }
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

