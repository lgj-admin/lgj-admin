<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">服务名称</div>
                                <div class="td">评价内容</div>
                                <div class="td">评价人</div>
                                <div class="td">评价时间</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr">
                                <div class="td">日常清洗</div>
                                <div class="td">服务不错</div>
                                <div class="td">侯雪</div>
                                <div class="td">2017-04-25</div>
                                <div class="td">
                                  <a href="javascript:void(0)" @click="showmodel = true">回复</a>
                                  <a href="javascript:void(0)" @click="handleDelete">删除</a>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">日常清洗</div>
                                <div class="td">服务不错</div>
                                <div class="td">侯雪</div>
                                <div class="td">2017-04-25</div>
                                <div class="td">
                                  <a href="javascript:void(0)" @click="showmodel = true">回复</a>
                                  <a href="javascript:void(0)" @click="handleDelete">删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="回复评价">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                    <el-form-item label="回复" prop="name">
                        <el-input v-model="ruleForm.name" type="textarea" :rows=4></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
export default {
  data() {
    return {
      ruleForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      showmodel: false
    };
  },
  methods: {
    handlesubmit(formName) {
      console.log("bbb");
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

