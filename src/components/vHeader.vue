<template>
    <div class="v-header">
        <div class="v-header-wraper">
            <div class="header-left">
                <router-link :to="'/user'">来管家后台管理</router-link>
            </div>
            <nav>
                <div class="nav-padding nav-name">
                    <transition name="move">
                          <el-tooltip effect="dark" content="客服问答未回消息数" placement="bottom-end">
                              <i class="news_tip fa fa-commenting" v-show="newsCount && handleCode('System@feedbackList')" @click="jump()">
                                <span class="news_count inner">{{newsCount}}</span>
                              </i>
                          </el-tooltip>
                    </transition>

                    <span>{{adminInfo.user_name}}</span>
                </div>
                <a class="nav-padding nav-out" @click="handleSiginOut">退出</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { ApiDataModule, CODE_OK, CODE_ERR ,CODE_Login} from "config/axios.js";
import { getStore,removeStore,codeStatus } from "config/utils";
import {mapMutations ,mapGetters} from 'vuex'


export default {
  name: "v-header",
  data() {
    return {
      submit:true,
      timer:null
    };
  },
  computed:{
    ...mapGetters([
      'newsCount',
      'codeList',
      'adminInfo'
    ])
  },
  created(){
    console.log(getStore('ADMININFO'));
    if(getStore('ADMININFO')){
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
    ApiDataModule('FEEDBACKLIST').then(res=>{
      console.log(res,'1111111');
      if(res.code == CODE_Login){
        this.$message({type:'warning',message:"未登录，请先登录"});
        removeStore('ADMININFO');
        this.$router.push({path:'/login'})
        return;
      }
    })
  },
  mounted(){
    if(getStore('ADMININFO')){
      this.get_adminInfo(JSON.parse(getStore('ADMININFO')));
    }
  },
  methods:{
    ...mapMutations({
      get_newsCount: "GET_NEWSCOUNT",
      get_adminInfo:'GET_ADMININFO'
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
  transition: all 0.4s linear;
  /* padding:5px 5px;
  border-radius: 50%;
  background-color: red; */
  margin-right: 10px;
  vertical-align: middle;
  color:#16a085;
  font-size: 16px;
  cursor: pointer;
  z-index:10;
}
.news_tip:hover{
  color:#fff;
}
.news_count{
  position: absolute;
  top:-10px;
  right:-12px;
  width:16px;
  height:16px;
  line-height: 16px;
  text-align: center;
  font-size:10px;
  color:#fff;
  background-color: red;
  border-radius: 50%;
  z-index: 999;
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

