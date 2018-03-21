<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
            </div>
            <div slot="body">
                <div class="body-content">
                    <div>
                        <h3>公司客服电话</h3>
                        <el-input placeholder="请填写公司客服电话"></el-input>
                    </div>
                    <div>
                        <h3>公司信息设置</h3>
                        <el-input type="textarea" :rows=8></el-input>
                    </div>
                    <div class="body-button">
                        <el-button type="primary">提交</el-button>
                    </div>
                </div>
            </div>
        </panpel>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";


export default {
  data() {
    return {
      ruleForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      searchValue: "",
      showmodel: false
    };
  },
  methods: {
    handlesubmit(formName) {
      console.log("bbb");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
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
.body-content h3{
  padding:40px 0;
  font-size:18px;
  color:#409eff;
}
.body-button{
  padding:40px 0;
}
</style>

