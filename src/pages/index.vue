<template>
    <div class="index">
        <v-header class="v-header"></v-header>
        <div class="content">
            <div class="content-wrapper">
                <!-- <v-aside></v-aside> -->
                <side-menu :show="show"></side-menu>
                <div class="content-view">
                    <div style="font-size:12px;margin-bottom:20px">
                      <el-breadcrumb separator="/">
                        <el-breadcrumb-item  v-for="(item,index) in menuTree" :key="index" :to="{ path: item.href }">{{item.name}}</el-breadcrumb-item>
                      </el-breadcrumb>
                    </div>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                    <v-footer></v-footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VHeader from "components/vHeader";
import VAside from "components/aside";
import SideMenu from "components/sideMenu";
import VFooter from "components/footer";

export default {
  name: "index",
  data() {
    return {
      show: true,
      menuTree: [
        {
          id: 1,
          href: "/home",
          name: "菜单管理",
          icon: "fa fa-id-badge",
          children: [
            {
              id: 2,
              parentId: 1,
              href: "/test",
              name: "菜单列表",
              icon: "fa fa-certificate"
            },
            {
              id: 3,
              parentId: 1,
              href: "/home",
              name: "首页列表",
              icon: "fa fa-sitemap"
            }
          ]
        },
        {
          id: 4,
          href: "/menu",
          name: "创建菜单",
          icon: "fa fa-qrcode"
        }
      ]
    };
  },
  components: {
    VHeader,
    VAside,
    SideMenu,
    VFooter
  }
};
</script>

<style scoped>
.index {
  height: 100%;
  background-color: #f5f5f5;
}
.v-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.content {
  height: 100%;
}
.content-wrapper {
  height: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}
.content-view {
  flex: 1;
  padding: 20px;
}
</style>
