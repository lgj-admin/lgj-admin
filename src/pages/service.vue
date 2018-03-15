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
                    <tree-grid :columns="columns" :tree-structure="true" :data-source="data"></tree-grid>
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
    </div>
</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";
import TreeGrid from "components/treeTable/index.js";

let id = 1000;
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      activeIndex: "1", //tags索引
      addcategory: false, //添加分类状态
      ruleForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      data: [
        {
          id: 1,
          parentId: 0,
          name: "测试1",
          age: 18,
          sex: "男",
          children: [
            {
              id: 2,
              parentId: 1,
              name: "测试2",
              age: 22,
              sex: "男"
            }
          ]
        },
        {
          id: 3,
          parentId: 0,
          name: "测试3",
          age: 23,
          sex: "女",
          children: [
            {
              id: 4,
              parentId: 3,
              name: "测试4",
              age: 22,
              sex: "男"
            },
            {
              id: 5,
              parentId: 3,
              name: "测试5",
              age: 25,
              sex: "男"
            },
            {
              id: 6,
              parentId: 3,
              name: "测试6",
              age: 26,
              sex: "女",
              children: [
                {
                  id: 7,
                  parentId: 6,
                  name: "测试7",
                  age: 27,
                  sex: "男"
                }
              ]
            }
          ]
        }
      ],
      columns: [
        {
          text: "姓名",
          dataIndex: "name"
        },
        {
          text: "年龄",
          dataIndex: "age"
        },
        {
          text: "性别",
          dataIndex: "sex"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      data5: JSON.parse(JSON.stringify(data))
    };
  },
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
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <div class="tbody">
            <span class="tr">
              <span class="td">{node.label}</span>
              <span class="td">{node.label}</span>
              <span class="td">
                <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.append(data)}
                >
                  Append
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.remove(node, data)}
                >
                  Delete
                </el-button>
              </span>
            </span>
          </div>
        </div>
      );
    }
  },
  components: {
    Panpel,
    ModelBox,
    TreeGrid
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
</style>

