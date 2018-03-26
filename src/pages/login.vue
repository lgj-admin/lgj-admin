<template>
    <div class="login">
        <div class="login-wrapper">
            <div class="login-header">
                <span>来管家后台管理中心</span>
                <label>LAIGUANJIA Administration Center</label>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="66px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入用户名">
                        <i slot="prefix" class="el-input__icon fa fa-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pasd">
                    <el-input v-model="ruleForm.pasd" placeholder="请输入密码">
                        <i slot="prefix" class="el-input__icon fa fa-thermometer-full"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handlelogin('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <img src="../assets/login.jpg" alt="">
        <div class="mask"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pasd:""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pasd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
    };
  },
  methods:{
    handlelogin(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({
            path:'/home'
          })
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index:199;
}
.login img{
  position: fixed;
  top:0;
  left: 0;
  width:100%;
  height:100%;
  filter:blur(5px);
  z-index:89;
}
.mask{
  position: fixed;
  top:0;
  left: 0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.4);
  z-index:99;
}
.login-wrapper {
  width: 380px;
  padding:30px;
  text-align: center;
  z-index:999;
  background-color: #fdfdfd;
}
.login-header{
  padding-bottom:30px;
}
.login-header>span{
  display: block;
  margin-bottom: 10px;
  color:#5a5454;
  font-size:16px;
}
.login-header>label{
  display: block;
  color:#666;
  font-size:12px;
}
</style>

