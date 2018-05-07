<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-button v-if="handleCode('System@cityAdd')" @click="add()" type="primary">添加大区</el-button>
                </div>
                <div class="header-content-right">
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table" v-loading="loading">
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
                                    <a href="javascript:void(0)" v-if="handleCode('System@cityDoEidt')" @click="handleEdit(item.id)">编辑</a>
                                    <a href="javascript:void(0)" v-if="handleCode('System@cityDelete')" @click="handleDelete(item.id)">删除</a>
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
                            @current-change="handlePage"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" :title="id?'编辑大区':'添加大区'">
          <div slot="dialog-body">
              <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="35%"
                  :status-icon="true"
                  v-if="showmodel"
              >
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
import {ApiDataModule,CODE_OK,CODE_ERR} from "config/axios.js";
import {mapGetters} from 'vuex'
import {codeStatus} from "config/utils";



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
      total: null, //分页列表条数
      page:1,
      loading:true,
    };
  },
  created() {
    this.init();
  },
  computed:{
    ...mapGetters(['codeList','newsCount'])
  },
  methods: {
    init(){
      this.loading = true;
      ApiDataModule("CITYLIST", {page:this.page}).then(res => {
        if (res.code == CODE_OK) {
          this.loading = false;
          this.cityList = res.data.data;
          this.total = res.data.total;
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
    handlePage(e) {
      this.page = e;
      this.init();
    },
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id == null) {
            ApiDataModule("CITYADD", {
              area_name: this.ruleForm.name,
              city: this.ruleForm.city
            }).then(res => {
              if (res.code == CODE_OK) {
                this.showmodel = false;
                this.init();
                return;
              } else if (res.code == CODE_ERR) {
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
              if (res.code == CODE_OK) {
                this.showmodel = false;
                this.init();
                return;
              } else if (res.code == CODE_ERR) {
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
        if (res.code == CODE_OK) {
          this.ruleForm.name = res.data.area_name;
          this.ruleForm.city = res.data.city;
          this.showmodel = true;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该大区, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ApiDataModule("CITYDELETE", {
            id: id
          }).then(res => {
            if (res.code == CODE_OK) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
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

