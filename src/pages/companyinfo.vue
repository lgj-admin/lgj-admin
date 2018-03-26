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
                    <div class="body-button">
                        <el-button @click="handleSubmit" type="primary">提交</el-button>
                    </div>
                </div>
            </div>
        </panpel>
    </div>

</template>

<script>
import Panpel from "base/panpel";


export default {
  data() {
    return {
      phone:null,//公司客服电话
      info:null,//公司信息
    };
  },
  methods: {
    handleSubmit() {
      console.log("bbb");
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

