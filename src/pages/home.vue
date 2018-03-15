<template>
    <div class="home">
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
                                <div class="td">姓名</div>
                                <div class="td">
                                    <el-select v-model="value"  placeholder="服务技能">
                                        <el-option
                                              v-for="item in serviceSkills"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="td">大区经理</div>
                                <div class="td">区域经理</div>
                                <div class="td">
                                    <el-select v-model="value" placeholder="全部地区">
                                        <el-option
                                              v-for="item in serviceSkills"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="td">
                                    <el-select v-model="value" placeholder="员工等级">
                                        <el-option
                                              v-for="item in serviceSkills"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">日常清洗 家电清洗</div>
                                <div class="td">
                                  <span>
                                      马青
                                  </span>
                                  <span>
                                      13756334567
                                  </span>
                                </div>
                                <div class="td">
                                    <span>
                                        马青
                                    </span>
                                    <span>
                                        13756334567
                                    </span>
                                </div>
                                <div class="td">
                                    华北大区----太原
                                </div>
                                <div class="td">二级</div>
                                <div class="td">
                                    <span @click="showmodelEdit = true">分配编辑</span>
                                    <span>删除</span>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">日常清洗 家电清洗</div>
                                <div class="td">
                                  <span>
                                      马青
                                  </span>
                                  <span>
                                      13756334567
                                  </span>
                                </div>
                                <div class="td">
                                    <span>
                                        马青
                                    </span>
                                    <span>
                                        13756334567
                                    </span>
                                </div>
                                <div class="td">
                                    华北大区----太原
                                </div>
                                <div class="td">二级</div>
                                <div class="td">
                                  <span @click="showmodelEdit = true">分配编辑</span>
                                  <span>删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-page">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodel" title="添加员工">
          <div slot="dialog-body">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30%">
                  <el-form-item label="姓名" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="等级" prop="name">
                      <el-select v-model="ruleForm.name" placeholder="员工等级">
                          <el-option
                                v-for="item in serviceSkills"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="大区经理" prop="name">
                      <el-select v-model="ruleForm.name" placeholder="员工等级">
                          <el-option
                                v-for="item in serviceSkills"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="地区" prop="name">
                      <el-select v-model="ruleForm.name" placeholder="员工等级">
                          <el-option
                                v-for="item in serviceSkills"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="区域经理" prop="name">
                      <el-select v-model="ruleForm.name" placeholder="员工等级">
                          <el-option
                                v-for="item in serviceSkills"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="服务技能" prop="name">
                      <el-checkbox-group
                            v-model="checkedCities1"
                      >
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                      </el-checkbox-group>
                  </el-form-item>
              </el-form>
          </div>
        </model-box>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="showmodelEdit" title="分配编辑员工">
          <div slot="dialog-body">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="姓名" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="大区经理" prop="name">
                      <el-select v-model="ruleForm.name" placeholder="员工等级">
                          <el-option
                                v-for="item in serviceSkills"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="地区" prop="name">
                      <el-select v-model="ruleForm.name" placeholder="员工等级">
                          <el-option
                                v-for="item in serviceSkills"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="区域经理" prop="name">
                      <el-select v-model="ruleForm.name" placeholder="员工等级">
                          <el-option
                                v-for="item in serviceSkills"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="服务技能" prop="name">
                      <el-checkbox-group
                            v-model="checkedCities1"
                      >
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                      </el-checkbox-group>
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
      editRuleForm:{

      },
      editRules:{

      },
      searchValue: "",
      showmodel: false,
      showmodelEdit: false,
      serviceSkills: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      cities:[
        '上海', '北京', '广州', '深圳'
      ],
      checkedCities1:[]

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
.body-table-tr span{
  cursor: pointer;
}
.footer-page{
  text-align: right;
}
</style>

