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
                        <el-table v-loading="loading" :data="feedback_list" style="width: 100%">
                            <el-table-column type="expand" >
                                <template slot-scope="props">
                                    <div  v-if="props.row.reply !=null" class="reply">
                                        客服回复：
                                        <span style="margin-right:10px">
                                            {{props.row.reply.msg_content}}
                                        </span><br>
                                        回复时间：
                                        <span style="margin-right:10px">
                                            {{props.row.reply.msg_time}}
                                        </span>
                                        <!-- <a  href="javascript:void(0)"
                                            style="vertical-align:top">
                                            删除
                                        </a> -->
                                    </div>
                                    <div  v-else>
                                        暂无回复
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="用户疑问"
                                prop="msg_content"
                            >
                            </el-table-column>
                            <el-table-column
                                label="提问人"
                                prop="user_name"
                            >
                            </el-table-column>
                            <el-table-column
                                label="提问时间"
                                prop="msg_time"
                            >
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <a v-if="scope.row.reply !=null" style="color:#999">已回复</a>
                                    <a v-else href="javascript:void(0)" @click="reply(scope.row.msg_id)">
                                        回复
                                    </a>
                                    <!-- <a href="javascript:void(0)" @click="handleDelete">
                                        删除
                                    </a> -->
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="body-page">
                        <el-pagination
                            background
                            :current-page="page"
                            @current-change="handlePagination"
                            layout="prev, pager, next"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="回复">
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
import { isMobil,codeStatus,removeStore} from "config/utils";
import { ApiDataModule, CODE_OK, CODE_ERR ,CODE_Login} from "config/axios.js";
import {mapMutations ,mapGetters} from 'vuex'


export default {
  data() {
    return {
      ruleForm: {
        content: null, //内容
      },
      rules: {
        content: [{ required: true, message: "请输入回复内容", trigger: "blur" }],
      },
      showmodel: false,
      feedback_list: [],
      msg_id:null,
      total:null,
      page:1,
      loading:true,
    };
  },
  created(){
    this.init(this.page);
  },
  computed:{
    ...mapGetters(['codeList','newsCount'])
  },
  methods: {
    init(currentPage){
      this.loading = true;
      ApiDataModule('FEEDBACKLIST',{page:currentPage}).then(res=>{
        if(res.code == CODE_OK){
          this.loading = false;
          this.feedback_list = res.feedback_list.data;
          this.total = res.feedback_list.total;
          return;
        }
        if(res.code == CODE_Login){
          this.loading = false;
          this.$message({type:'warning',message:"未登录，请先登录"});
          removeStore('ADMININFO');
          this.$router.push({path:'/login'})
          return;
        }
        this.loading = false;
        this.$message({type:'warning',message:'数据接收异常'})
      })
    },
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    ...mapMutations({
      modify_newsCount:"MODIFY_NEWSCOUNT",
      get_newsCount:"GET_NEWSCOUNT",
    }),
    //处理分页
    handlePagination(page) {
      this.page = page;
      this.init(page);
    },
    //提交
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formDta = {
            msg_id:this.msg_id,
            msg_content:this.ruleForm.content
          };
          ApiDataModule('REPLYFEEDBACK',formDta).then(res=>{
            console.log(res);
            if(res.code == CODE_OK){
              this.init(this.page);
              this.$message({
                type:'success',
                message:'回复成功'
              });
              this.ruleForm.content = null;
              this.showmodel = false;
              this.msg_id = null;
              this.modify_newsCount(this.newsCount);
              return;
            }
            this.$message({
              type:'warning',
              message:res.msg
            })
          })
        } else {
          return false;
        }
      });
    },
    //回复
    reply(id) {
      if(!this.handleCode('System@replyFeedback')){
        this.$message({
          type:'warning',
          message:'无权限操作'
        })
        return;
      }
      this.showmodel = true;
      this.msg_id = id;
      ApiDataModule('FEEDBACKCOUNT').then(res=>{
        console.log(res);
        this.get_newsCount(res.count);
      })
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
.reply{
  line-height: 20px;
}

</style>

