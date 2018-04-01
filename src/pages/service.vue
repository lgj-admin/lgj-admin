<template>
    <div class="service">
        <panpel>
            <div slot="header" class="header-content">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">服务分类</el-menu-item>
                    <el-menu-item index="2">服务管理</el-menu-item>
                </el-menu>
                <div class="bottom" v-show="activeIndex == 1">
                    <el-button @click="addcategory=true">添加分类</el-button>
                    <div></div>
                </div>
                <div class="bottom" v-show="activeIndex == 2">
                    <div class="header-content-left">
                        <el-button @click="addservice = true">添加服务</el-button>
                        <el-button @click="addlifepackage = true">添加生活套餐</el-button>
                    </div>
                    <div class="header-content-right">
                    </div>
                </div>
            </div>
            <div slot="body">
                <div class="body-content">
                    <!-- <tree-grid :columns="columns" :tree-structure="true" :data-source="data"  v-show="activeIndex == 1"></tree-grid> -->
                    <div  v-show="activeIndex == 1">
                        <div class="header-flex">
                            <div class="table-item">服务分类</div>
                            <div class="table-item">排序</div>
                            <div class="table-item">添加下级分类</div>
                        </div>
                        <el-tree

                              :data="data5"
                              node-key="id"
                              default-expand-all
                              :expand-on-click-node="false">
                              <div class="custom-tree-node body-flex" slot-scope="{ node, data }">
                                <div class="table-item">{{ node.label }}</div>
                                <div class="table-item">1</div>
                                <div class="table-item">
                                    <el-button
                                      type="text"
                                      size="mini"
                                      @click="() => append(data)">
                                        <i class="el-icon-circle-plus-outline"></i>
                                    </el-button>
                                    <a href="#">编辑</a>
                                    <el-button
                                      type="text"
                                      size="mini"
                                      @click="() => remove(node, data)">
                                        <i class="el-icon-remove-outline"></i>
                                    </el-button>
                                </div>
                            </div>
                        </el-tree>
                    </div>
                    <div class="body-table table" v-show="activeIndex == 2">
                        <div class="thead body-table-thead">
                            <div class="tr">
                                <div class="td">服务名称</div>
                                <div class="td">全部服务</div>
                                <div class="td">价格</div>
                                <div class="td">全部地区</div>
                                <div class="td">上架</div>
                                <div class="td">首页分类展示</div>
                                <div class="td">精选</div>
                                <div class="td">排序</div>
                                <div class="td">操作</div>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr body-table-tr">
                                <div class="td">日常清洗</div>
                                <div class="td">专业服务</div>
                                <div class="td">125起</div>
                                <div class="td">太原</div>
                                <div class="td">是</div>
                                <div class="td">是</div>
                                <div class="td">是</div>
                                <div class="td">1</div>
                                <div class="td">
                                  <a href="#">编辑</a>
                                  <a href="#">删除</a>
                                </div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">日常清洗</div>
                                <div class="td">专业服务</div>
                                <div class="td">125起</div>
                                <div class="td">太原</div>
                                <div class="td">是</div>
                                <div class="td">是</div>
                                <div class="td">是</div>
                                <div class="td">1</div>
                                <div class="td">
                                  <a href="#">编辑</a>
                                  <a href="#">删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body-page">
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
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="addcategory" title="添加分类">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入服务分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="addsubcategory" title="添加下级分类">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="下级分类名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入服务分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="上传分类图标" prop="name">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="addservice" title="添加服务" width="80%">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="选择服务分类" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入服务分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="服务副标题" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="服务副标题"></el-input>
                    </el-form-item>
                    <el-form-item label="选择服务地区" prop="name">
                        <el-checkbox-group
                              v-model="checkedArea"
                        >
                            <el-checkbox v-for="city in area" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="添加服务项目" prop="serviceType">
                        <el-radio v-model="ruleForm.serviceType" label="1">按照服务项目</el-radio>
                        <el-radio v-model="ruleForm.serviceType" label="2">按照服务项目和服务面积</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <div class="addservice">
                            <div class="service-content">
                                <div class="service-item">名称</div>
                                <div class="service-item" v-show="ruleForm.serviceType == 2">最小服务面积</div>
                                <div class="service-item">单价</div>
                                <div class="service-item">员工提成</div>
                                <div class="service-item" v-show="ruleForm.serviceType == 2">套餐服务面积</div>
                                <div class="service-item" v-show="ruleForm.serviceType == 2">
                                    套餐价格<span>元/平</span>
                                </div>
                                <div class="service-item" v-show="ruleForm.serviceType == 1">生活套餐价格</div>
                                <div class="service-item">套餐员工提成</div>
                            </div>
                            <div class="service-content">
                                <div class="service-item">
                                    <el-input  v-model="ruleForm.name" placeholder="服务项目"></el-input>
                                    <el-button style="display:inline-block">添加图标</el-button>
                                </div>
                                <div class="service-item" v-show="ruleForm.serviceType == 2">
                                    <el-input></el-input><span>平</span>
                                </div>
                                <div class="service-item">
                                    <el-input v-model="ruleForm.name" ></el-input><span>元</span>
                                </div>
                                <div class="service-item">
                                    <el-input  v-model="ruleForm.name" placeholder="请填写提成"></el-input><span>元或</span><el-input placeholder="请填写提成"></el-input><span>%</span>
                                </div>
                                <div class="service-item" v-show="ruleForm.serviceType == 2">
                                    <el-input></el-input><span>平</span>
                                </div>
                                <div class="service-item" v-show="ruleForm.serviceType == 2">
                                    <el-input></el-input><span>元/平</span>
                                </div>
                                <div class="service-item" v-show="ruleForm.serviceType == 1">
                                    <el-input></el-input><span>元</span>
                                </div>
                                <div class="service-item">
                                    <el-input placeholder="请填写提成"></el-input><span>元或</span><el-input placeholder="请填写提成"></el-input><span>%</span>
                                </div>
                            </div>
                            <div class="service-i">
                                <i class="el-icon-circle-plus"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="添加首页默认图(建议尺寸)">
                        <!-- <el-button>添加</el-button> -->
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="添加服务展示图(建议尺寸)">
                        <!-- <el-button>添加</el-button> -->
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="添加置顶图标(100X100)">
                        <!-- <el-button>添加</el-button> -->
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="服务说明">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="addlifepackage" title="添加生活套餐" width="60%">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="套餐名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="套餐名称"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐副标题" prop="name">
                        <el-input placeholder="套餐副标题"></el-input>
                    </el-form-item>
                    <el-form-item label="选择服务地区">
                        <el-checkbox-group
                              v-model="checkedArea"
                        >
                              <el-checkbox v-for="city in area" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="添加子服务">
                        <el-button>添加</el-button>
                    </el-form-item>
                    <el-form-item label="服务内容">
                        <el-card class="box-card">
                            <div class="text item">
                                <div class="box-card-item">
                                    <div>专业清洗-日常清洁</div>
                                    <div>
                                        <div>床 X1 X120元</div>
                                        <div>俩室一厅一卫 X1 X120元</div>
                                    </div>
                                    <div><el-button @click="manageservice = true">管理</el-button></div>
                                </div>
                                <div class="box-card-item">
                                    <div>专业清洗-日常清洁</div>
                                    <div>
                                        <div>俩室一厅一卫 X1 X120元</div>
                                    </div>
                                    <div><el-button @click="manageservice = true">管理</el-button></div>
                                </div>
                                <div class="box-card-item"></div>
                                <div class="box-card-item"></div>
                            </div>
                            <div class="box-footer">
                                套餐总价：<span>120+135=90</span>
                            </div>
                        </el-card>
                    </el-form-item>
                    <el-form-item label="添加首页默认图(建议尺寸)">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                            :limit="3"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="添加服务展示图(建议尺寸)">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="添加置顶图标(100X100)">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                            :limit="3"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="服务说明">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
        <model-box @selectSubmit="handlesubmit('ruleForm')" :show.sync="manageservice" title="添加服务项目" width="60%">
            <div slot="dialog-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="选择服务分类" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="选择服务分类"></el-input>
                    </el-form-item>
                    <el-form-item label="选择服务项目">
                        <div class="selectproject">
                            <div>名称</div>
                            <div>套餐价</div>
                            <div>员工提成</div>
                            <div>服务数量</div>
                        </div>
                        <div class="selectproject">
                            <div>
                                俩室一厅一卫
                            </div>
                            <div>
                                125元
                            </div>
                            <div>
                                25元
                            </div>
                            <div>
                                <el-input-number v-model="servicenum" :min="1" :max="10" size="mini"></el-input-number>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </model-box>
    </div>
</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";

let id = 1000;
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "衣物清洁",
      },
      {
        id: 2,
        label: "养护清洗",
        children: [
          {
            id: 5,
            label: "地板打蜡"
          },
          {
            id: 6,
            label: "清洁清厕"
          }
        ]
      },
      {
        id: 3,
        label: "专业清洗",
        children: [
          {
            id: 7,
            label: "日常清洁"
          }
        ]
      }
    ];
    return {
      activeIndex: "1", //tags索引
      addcategory: false, //添加分类状态
      addsubcategory: false, //添加下级分类状态
      addservice:false,//添加服务状态
      addlifepackage:false,//添加生活套餐状态
      manageservice:false,//管理服务状态
      checkedArea:[],//选择区域状态
      servicenum:'',//服务数量
      dialogVisible:false,//上传图片value
      dialogImageUrl:'',
      area:['北京','天津','上海'],
      ruleForm: {
        name: "",
        serviceType:"1",//服务类型
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      data5: JSON.parse(JSON.stringify(data)),
      fileList:[],
    };
  },
  created() {},
  methods: {
    handleSelect(e) {
      this.activeIndex = e;
      console.log(e);
    },
    handlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showmodel = false;
        } else {
          return false;
        }
      });
    },
    append(data) {
      this.addsubcategory = true;
      // const newChild = { id: id++, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    //upload
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  components: {
    Panpel,
    ModelBox,
  }
};
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
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
.body-table-tr span {
  cursor: pointer;
}
.body-page {
  text-align: right;
  padding: 10px 0;
}
.td i {
  vertical-align: middle;
  font-size: 20px;
  cursor: pointer;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/* tree */
.header-flex,
.body-flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.header-flex {
  padding: 10px;
  background-color: #eef1f6;
}
.table-item {
<<<<<<< HEAD
  /* width: 33.3%; */
=======
>>>>>>> 1a63846ed4e46d5cbe5d7d3c91692669db817d81
  flex:1;
  text-align: center;
}
.body-flex i {
  font-size: 20px;
}
.service-content{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.service-item{
  flex:1;
  text-align: left;
}
.service-item span{
  font-size: 12px;
}
.service-i>i{
  font-size: 24px;
  cursor: pointer;
}
.box-card-item{
  display: flex;
  justify-content: space-around;
}
.box-card-item>div{
  flex:1;
  text-align: left;
}
.box-footer{
  margin-top:20px;
  border-top: 1px solid #ccc;
}
.selectproject{
  display:flex;
  justify-content: space-around;
  align-items: center;
}
.selectproject>div{
  flex:1;
  text-align: left;
}
</style>

