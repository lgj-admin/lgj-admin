<template>
    <div class="v-header">
        <div class="v-header-wraper">
            <div class="header-left">
              <a href="#">来管家后台管理</a>
            </div>
            <nav>
                <div class="nav-padding nav-name"><span v-html="admininfo.user_name"></span></div>
                <a class="nav-padding nav-out" @click="handleSiginOut">退出</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import { getStore,removeStore } from "config/utils";


export default {
  name: "v-header",
  data() {
    return {
      admininfo:{
        user_name:''
      }
    };
  },
  methods:{
    handleSiginOut(){
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ApiDataModule('ADMINOUT').then(res=>{
            if(res.code == CODE_OK){
              this.$message({
                type:'success',
                message:'退出成功',
                onClose:()=>{
                  this.$router.push({
                    path:'/login'
                  })
                }
              })
              removeStore('ADMININFO');
            }else{
              this.$message({
                type:'warning',
                message:res.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  created(){
    if(getStore('ADMININFO')){
      this.admininfo = JSON.parse(getStore('ADMININFO'));
    }
  }
};
</script>

<style scoped>
.v-header {
  width: 100%;
  height: 40px;
  line-height: 38px;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  color: #fff;
  background-color:#2c3e50;
  font-size:14px;
}
.v-header-wraper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left{
  width:200px;
  text-align: center;
}
nav {
  display: flex;
  justify-content: space-around;
}
nav .nav-padding{
  padding: 0 5px;
}
nav .nav-out{
  padding-right:20px;
  cursor:pointer;
}
</style>

