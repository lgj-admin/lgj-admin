<template>
    <div class="v-header">
        <div class="v-header-wraper">
            <div class="header-left">
                <router-link :to="'/user'">来管家后台管理</router-link>
            </div>
            <nav>
                <div class="nav-padding nav-name">
                    <transition name="move">
                        <i class="news_tip fa fa-commenting" v-if="newsCount && handleCode('System@feedbackList')" @click="jump()">
                            <span class="news_count inner">{{newsCount}}</span>
                        </i>
                    </transition>
                    <span v-html="admininfo.user_name"></span>
                </div>
                <a class="nav-padding nav-out" @click="handleSiginOut">退出</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import { getStore,removeStore } from "config/utils";
import {mapMutations ,mapGetters} from 'vuex'
import {codeStatus} from "config/utils";


export default {
  name: "v-header",
  data() {
    return {
      admininfo:{
        user_name:''
      },
      submit:true,
      timer:null
    };
  },
  computed:{
    ...mapGetters([
      'newsCount',
      'codeList'
    ])
  },
  created(){
    if(getStore('ADMININFO')){
      this.admininfo = JSON.parse(getStore('ADMININFO'));
      ApiDataModule('FEEDBACKCOUNT').then(res=>{
        console.log(res);
        this.get_newsCount(res.count);
      })
      this.timer = setInterval(()=>{
        ApiDataModule('FEEDBACKCOUNT').then(res=>{
          console.log(res);
          this.get_newsCount(res.count);
        })
      },3600000)
    }
  },
  methods:{
    ...mapMutations({
      get_newsCount: "GET_NEWSCOUNT"
    }),
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    jump(){
      this.$router.push({
        path:'answer'
      })
    },
    handleSiginOut(){
      if(!this.submit) return
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ApiDataModule('ADMINOUT').then(res=>{
            if(res.code == CODE_OK){
              this.submit = false;
              this.$message({
                type:'success',
                message:'退出成功',
                onClose:()=>{
                  this.submit = true;
                  this.$router.push({
                    path:'/login'
                  })
                }
              });
              removeStore('ADMININFO');
              clearInterval(this.timer);
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
.news_tip{
  position: relative;
  display: inline-block;
  margin-right: 5px;;
  /* padding:5px 5px;
  border-radius: 50%;
  background-color: red; */
  vertical-align: middle;
  color:red;
  transition: all 0.4s linear;
  cursor: pointer;
}
.news_tip:hover{
  color:#fff;
}
.news_count{
  position: absolute;
  top:-4px;
  right:-5px;
  font-size:10px;
  color:#fff;
}
.inner {
  transition: all 0.4s linear;
  transform: rotate(0);
}
.move-transition {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.move-leave-active,
.move-enter-active {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
}
.move-leave-active .inner {
  transform: rotate(360deg);
}
.move-enter-active .inner {
  transform: rotate(360deg);
}
</style>

