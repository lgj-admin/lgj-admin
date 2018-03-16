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
                        <el-breadcrumb-item  v-for="(item,index) in currentMenu" :key="index" :to="{ path: item.href }">{{item.name}}</el-breadcrumb-item>
                      </el-breadcrumb>
                    </div>
                    <!-- <keep-alive> -->
                        <router-view></router-view>
                    <!-- </keep-alive> -->
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
import VFooter from "components/vFooter";
import { mapGetters } from "vuex";

export default {
  name: "index",
  data() {
    return {
      show: true,
    };
  },
  components: {
    VHeader,
    VAside,
    SideMenu,
    VFooter
  },
  computed:{
    ...mapGetters([
      'currentMenu'
    ])
  },
  method:{

  }
};
</script>

<style scoped>
.index {
  min-width: 1366px;
  height:100%;
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
  overflow: hidden;
}
.content-view {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
