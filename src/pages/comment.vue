<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table">
                        <el-table :data="feedback_list" style="width: 100%">
                            <el-table-column type="expand" >
                                <template slot-scope="props">
                                    <div >
                                        评价回复：
                                        <span style="margin-right:10px">
                                            {{props.row.parent_id[0].content}}
                                        </span>
                                        <span style="margin-right:10px">
                                            {{props.row.parent_id[0].add_time}}
                                        </span>
                                        <a  href="javascript:void(0)"
                                            style="vertical-align:top">
                                            删除
                                        </a>
                                    </div>
                                    <div>
                                        暂无回复
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="服务名称"
                                prop="goods_name"
                            >
                            </el-table-column>
                            <el-table-column
                                label="评价内容"
                                prop="content"
                            >
                            </el-table-column>
                            <el-table-column
                                label="评价人"
                                prop="nickname"
                            >
                            </el-table-column>
                            <el-table-column
                                label="评价时间"
                                prop="add_time"
                            >
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <a style="color:#999">已回复</a>
                                    <!-- <a href="javascript:void(0)" @click="reply(scope.row.comment_id)">
                                        回复
                                    </a> -->
                                    <a href="javascript:void(0)" @click="handleDelete">
                                        删除
                                    </a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- <div class="body-page">
                        <el-pagination
                            background
                            @current-change="handlePagination"
                            layout="prev, pager, next"
                            :total="total"
                        >
                        </el-pagination>
                    </div> -->
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="回复评价">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                    <el-form-item label="回复" prop="content">
                        <el-input v-model="ruleForm.content" type="textarea" :rows=4></el-input>
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

export default {
  data() {
    return {
      ruleForm: {
        content: null, //内容
      },
      rules: {
        content: [{ required: true, message: "请输入回复内容", trigger: "blur" }],
      },
      feedback_list: [],
      showmodel: false,
      total:null,
      msg_id:null,
    };
  },
  created(){
    ApiDataModule('COMMENTLIST').then(res=>{
      this.feedback_list = res.data.data;
      console.log(res)
    })
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

