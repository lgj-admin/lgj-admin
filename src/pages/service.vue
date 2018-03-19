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
                        <el-button>添加服务</el-button>
                        <el-button @click="showmodel=true" >添加生活套餐</el-button>
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
    </div>
</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import TreeGrid from "components/treeTable/index.js";
import TreeNode from "element-ui/packages/tree/src/tree-node.vue";

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
      ruleForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      treeData: [
        {
          id: 1,
          name: "日常清洗",
          sort: "1",
          children: [
            {
              id: 2,
              sort: "",
              name: "日常清洁"
            }
          ]
        },
        {
          id: 3,
          sort: "",
          name: "衣物清洁"
        },
        {
          id: 4,
          name: "养护清洗",
          sort: "3",
          children: [
            {
              id: 5,
              sort: "",
              name: "地板打蜡"
            },
            {
              id: 6,
              sort: "",
              name: "瓷砖打蜡"
            }
          ]
        }
      ],
      data5: JSON.parse(JSON.stringify(data)),
      fileList:[]
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
    TreeGrid,
    TreeNode
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
  /* width: 33.3%; */
  flex:1;
  text-align: center;
}
.body-flex i {
  font-size: 20px;
}
</style>

