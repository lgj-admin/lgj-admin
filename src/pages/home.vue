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
                    <el-button>添加</el-button>
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
                                <div class="td">2018-02-11-12:33</div>
                                <div class="td">太原</div>
                                <div class="td">删除</div>
                            </div>
                            <div class="tr body-table-tr">
                                <div class="td">灰太狼</div>
                                <div class="td">13756334567</div>
                                <div class="td">2018-02-11-12:33</div>
                                <div class="td">太原</div>
                                <div class="td">删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </panpel>
        <model-box>
            <div slot="model-body" @submit="handlesubmit()">safasfasf</div>
        </model-box>
    </div>

</template>

<script>
import Panpel from "base/panpel";
import ModelBox from "components/modelBox";

export default {
  data() {
    return {
      searchValue: ""
    };
  },
  methods: {
    handlesubmit() {
      console.log("bbb");
    }
  },
  components: {
    Panpel,
    ModelBox
  }
};
</script>

<style scoped>
.home a {
  color: #000;
}
.home a:hover {
  color: red;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-content-left {
  flex: 1;
}
.search-button {
  margin-left: 5px;
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

