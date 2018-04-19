<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
            </div>
            <div slot="body">
                <div class="body-content">
                    <div>
                        <h3>公司客服电话</h3>
                        <el-input v-model="phone" placeholder="请填写公司客服电话"></el-input>
                    </div>
                    <div>
                        <h3>公司信息设置</h3>
                        <el-input v-model="info" type="textarea" :rows=8></el-input>
                    </div>
                    <div class="body-button" >
                        <el-button v-if="handleCode('System@handleConfig')"  @click="handleSubmit" type="primary">提交</el-button>
                    </div>
                </div>
            </div>
        </panpel>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import {ApiDataModule,CODE_OK,CODE_ERR,CODE_Data} from "config/axios.js";
import { codeStatus } from "config/utils";
import {mapGetters} from 'vuex'




export default {
  data() {
    return {
      phone:null,//公司客服电话
      info:null,//公司信息
      role_id:null,//权限id
    };
  },
  created() {
    ApiDataModule('COMPANYINFO').then(res=>{
      console.log(res);
      if(res.code == CODE_OK){
        this.phone = res.phone;
        this.info = res.store_desc;
      }
    })
  },
  computed:{
    ...mapGetters(['codeList'])
  },
  methods: {
    handleCode(data){
      return codeStatus(this.codeList,data);
    },
    handleSubmit() {
      if(!this.phone){
        this.$message({type:'warning',message:'请填写客服电话'});
        return;
      }
      if(!this.info){
        this.$message({type:'warning',message:'请填写公司信息'});
        return;
      }
      const formData = {};
      if(this.role_id != null){
        formData.role_id = this.role_id;
      }
      if(this.phone != null){
        formData.phone = this.phone;
      }
      if(this.info != null){
        formData.store_desc = this.info;
      }
      ApiDataModule('HANDLECONFIG',formData).then(res=>{
        console.log(res);
        if(res.code == CODE_OK){
          this.$message({
            type:'success',
            message:'提交成功'
          })
        }else if(res.code == CODE_Data){
          this.$message({
            type:'warning',
            message:'修改后再提交'
          })
        }else{
          this.$message({
            type:'warning',
            message:res.msg
          })
        }
      })
    }
  },
  components: {
    Panpel,
  }
};
</script>

<style scoped>
.body-content h3{
  padding:40px 0;
  font-size:18px;
  color:#409eff;
}
.body-button{
  padding:40px 0;
}
</style>

