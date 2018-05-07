<template>
    <div class="log">
        <panpel>
            <div slot="header" class="header-content">
                <div v-if="handleCode('System@logsDel')">

                    <el-date-picker
                        v-model="logDelTimeValue"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']"
                        value-format="timestamp"
                    >
                    </el-date-picker>
                    <el-button type="primary" @click="handleDelete">删除</el-button>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table" v-loading="loading">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">日志内容</div>
                                <div class="td">操作人</div>
                                <div class="td">操作时间</div>
                                <!-- <div class="td">操作</div> -->
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in logs_list" :key="index">
                                <div class="td">{{item.description}}</div>
                                <div class="td">{{item.admin_user_name}}</div>
                                <div class="td">{{item.time}}</div>
                                <!-- <div class="td">

                                </div> -->
                            </div>
                        </div>
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
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import {mapMutations,mapGetters} from 'vuex'
import { codeStatus } from "config/utils";



export default {
  data() {
    return {
      page:1,
      total:null,
      logs_list:[],
      logDelTimeValue:'',
      total:null,
      code_status:false,
      loading:true,
    };
  },
  computed:{
    ...mapGetters(['codeList'])
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.loading = true;
      //日志列表
      ApiDataModule('LOGSLIST',{page:this.page}).then(res=>{
        if(res.code == CODE_OK){
          this.loading = false;
          this.logs_list = res.logs_list.data;
          this.total = res.logs_list.total;
          return;
        }
        this.$message({type:'warning',message:`${res.code}数据接收异常`})
      });
    },
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    //处理分页
    handlePagination(page) {
      this.page = page;
      this.init();
    },
    handleDelete() {
      if(this.logDelTimeValue.length<=0) return;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const time = 1000;
          let start = this.logDelTimeValue[0]/time;
          let end = this.logDelTimeValue[1]/time;
          const formData = {
            start:start,
            end:end,
          };
          ApiDataModule('LOGSDEL',formData).then(res=>{
            if(res.code == CODE_OK){
              this.$message({
                type: 'success',
                message: '删除成功!',
                onClose:()=>{
                  this.init();
                }
              });
              this.logDelTimeValue = '';
              return;
            }
            this.$message({
              type:'warning',
              message:res.msg
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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

