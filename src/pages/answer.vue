<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                </div>
                <div class="header-content-right">
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table">
                        <el-table :data="tableData5" style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    客服回复：
                                    <span style="margin-right:10px">
                                        日常清洗包括哪些？
                                    </span>
                                    <span style="margin-right:10px">
                                        2017-3--25
                                    </span>
                                    <a  href="javascript:void(0)"
                                        style="vertical-align:top">
                                        删除
                                    </a>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="用户疑问"
                                prop="name"
                            >
                            </el-table-column>
                            <el-table-column
                                label="提问人"
                                prop="user"
                            >
                            </el-table-column>
                            <el-table-column
                                label="提问时间"
                                prop="data"
                            >
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <a href="javascript:void(0)" @click="reply">
                                        回复
                                    </a>
                                    <a href="javascript:void(0)" @click="handleDelete">
                                        删除
                                    </a>
                                </template>
                            </el-table-column>
                        </el-table>
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
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="回复">
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
import { isMobil } from "config/utils";

export default {
  data() {
    return {
      ruleForm: {
        name: null, //昵称
      },
      rules: {
        name: [{ required: true, message: "请输入回复内容", trigger: "blur" }],
      },
      showmodel: false,
      tableData5: [{
          id: '12987122',
          name: '日常清洗包括哪些？',
          user: '侯雪',
          data: '2017-03-25',
        }]
    };
  },
  methods: {
    //提交
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
    //回复
    reply() {
      this.showmodel = true;
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

