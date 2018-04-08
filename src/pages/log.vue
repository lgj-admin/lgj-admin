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
                                <div class="td">日志内容</div>
                                <div class="td">操作人</div>
                                <div class="td">操作时间</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr" v-for="(item,index) in logs_list" :key="index">
                                <div class="td">{{item.description}}</div>
                                <div class="td">{{item.admin_user_name}}</div>
                                <div class="td">{{item.time}}</div>
                                <div class="td">
                                    <a href="javascript:void(0)" @click="handleDelete">删除</a>
                                </div>
                            </div>
                        </div>
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

export default {
  data() {
    return {
      page:1,
      total:null,
      logs_list:[]
    };
  },
  created() {
    //日志列表
    ApiDataModule('LOGSLIST').then(res=>{
      this.logs_list = res.logs_list.data;
      this.total = res.logs_list.total;
      console.log(res)
    })
  },
  methods: {
    handleDelete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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

