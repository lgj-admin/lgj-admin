<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-menu :default-active="active_index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="0">普通商品评价</el-menu-item>
                        <el-menu-item index="1">套餐评价</el-menu-item>
                    </el-menu>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table">
                        <el-table :data="feedback_list" style="width: 100%">
                            <el-table-column type="expand" >
                                <template slot-scope="props">
                                    <div v-if="props.row.parent_id.length>0"  class="reply">
                                        评价回复：
                                        <span style="margin-right:10px">
                                            {{props.row.parent_id[0].content}}
                                        </span><br>
                                        回复时间：
                                        <span style="margin-right:10px">
                                            {{props.row.parent_id[0].add_time}}
                                        </span>
                                        <!-- <a  href="javascript:void(0)"
                                            style="vertical-align:top">
                                            删除
                                        </a> -->
                                    </div>
                                    <div v-else>
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
                                    <a style="color:#999" v-if="scope.row.parent_id.length>0">已回复</a>
                                    <a href="javascript:void(0)" @click="reply(scope.row.comment_id)" v-else>
                                        回复
                                    </a>
                                    <a v-if="handleCode('Comments@delComment')" href="javascript:void(0)" @click="handleDelete(scope.row.comment_id)">
                                        删除
                                    </a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="body-page">
                        <el-pagination
                            background
                            @current-change="handlePagination"
                            layout="prev, pager, next"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
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
import {mapGetters} from 'vuex'
import {codeStatus} from "config/utils";



export default {
  data() {
    return {
      active_index:'0',
      ruleForm: {
        content: null, //内容
      },
      rules: {
        content: [{ required: true, message: "请输入回复内容", trigger: "blur" }],
      },
      feedback_list: [],
      showmodel: false,
      total:null,
      page:1,
      msg_id:null,
    };
  },
  created(){
    this.init(this.page,this.active_index);
  },
  computed:{
    ...mapGetters(['codeList'])
  },
  methods: {
    init(currentPage,activeIndex){
      ApiDataModule('COMMENTLIST',{
        page:currentPage,
        is_package:activeIndex
      }).then(res=>{
        console.log(res)
        this.feedback_list = res.data.data;
        this.total = res.data.total;
      })
    },
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    handlePagination(e){
      this.init(e,this.active_index);
    },
    handleSelect(e){
      this.active_index = e;
      this.init(this.page,e);
    },
    handlesubmit(formName) {
      console.log("bbb");
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formDta = {
            comment_id:this.msg_id,
            content:this.ruleForm.content,
            is_package:this.active_index
          };
          ApiDataModule('REPLYCOMMENT',formDta).then(res=>{
            console.log(res);
            if(res.code == CODE_OK){
              this.init(this.page,this.active_index);
              this.$message({
                type:'success',
                message:'回复成功',
              })
              this.showmodel = false;
              this.msg_id = null;
            }else{
              this.$message({
                type:'warning',
                message:res.msg
              })
            }
          })
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
    reply(id){
      if(!this.handleCode('Comments@replyComment')){
        this.$message({
          type:'warning',
          message:'无权限操作'
        })
        return;
      }
      this.showmodel = true;
      this.msg_id = id;
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ApiDataModule('DELCOMMENT',{comment_id:id}).then(res=>{
            console.log(res);
            if(res.code == CODE_OK){
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init(this.page,this.active_index);
            }
          })
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

