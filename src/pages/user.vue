<template>
    <div class="user">
        <panpel>
            <div slot="header" class="header-content">
                <div class="header-content-left">
                    <el-input placeholder="请输入内容"
                              v-model="searchValue"
                              clearable>
                    </el-input>
                  <el-button class="search-button">搜索</el-button>
                </div>
                <div class="header-content-right">
                    <el-button @click="showmodel=true">添加</el-button>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <div class="body-table table">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">昵称</div>
                                <div class="td">手机号</div>
                                <div class="td">注册时间</div>
                                <div class="td">注册地</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">13756334567</div>
                                <div class="td">2018-02-11-12:23</div>
                                <div class="td">太原</div>
                                <div class="td">
                                  <span>注销</span>
                                  <span>删除</span>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">13756334567</div>
                                <div class="td">2018-02-11-12:23</div>
                                <div class="td">太原</div>
                                <div class="td">
                                  <span>注销</span>
                                  <span>删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="添加用户">
          <div slot="dialog-body">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="昵称" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
              </el-form>
          </div>
        </model-box>
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
.body-content {
  padding: 10px 0 20px 0;
  font-size: 12px;
}
.body-table-thead {
  margin-bottom: 5px;
}
.body-table-tr {
  background-color: #fff;
  margin-top: 5px;
}
</style>

