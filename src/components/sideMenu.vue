<template>
  <aside class="main-sidebar animated">
    <el-scrollbar tag="div" wrapClass="vue-scrollbar">
      <div class="sidebar">
        <el-menu
                 :default-active="onRoutes"
                 :default-openeds="onRouteKeys"
                 class="el-menu-style"
                 @open="handleOpen"
                 @close="handleClose"
                 theme="light" router  @select="handleSelect">
          <div v-for="(item,index) in menuList" :key='index'>
            <sub-menu :param="item"></sub-menu>
          </div>
        </el-menu>
      </div>
    </el-scrollbar>
  </aside>
</template>
<script>
import subMenu from "./subMenu.vue";
import { getCurrentMenu } from "config/utils";
import { mapMutations,mapState } from "vuex";
import { menuList } from "../mock/dataBase";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";


export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      uniqueOpened: true
    };
  },
  created() {
    this.menuList = menuList;
    // let route = this.$route;
  },
  methods: {
    handleSelect(key, keyPath) {
      const currentMenu = getCurrentMenu(key, this.menuList);
      this.getCurrentMenu(currentMenu);
      ApiDataModule('FEEDBACKCOUNT').then(res=>{
        this.get_newsCount(res.count);
        console.log('123',res.count)
      })
    },
    ...mapMutations({
      getCurrentMenu: "GET_CURRENTMENU",
      get_newsCount: "GET_NEWSCOUNT"
    }),
    handleOpen() {

    },
    handleClose() {

    }
  },
  computed: {
    ...mapState(['newsCount']),
    onRoutes() {
      return this.$route.path;
    },
    onRouteKeys() {
      const getParentArray = (path, ms, kas = []) => {
        if (ms && ms.length > 0) {
          for (let k = 0, length = ms.length; k < length; k++) {
            if (path == ms[k].href) {
              kas.push(ms[k].href);
              break;
            }
            let i = kas.length;
            if (ms[k].children && ms[k].children.length > 0) {
              getParentArray(path, ms[k].children, kas);
            }
            if (i < kas.length) {
              kas.push(ms[k].href);
            }
          }
        }
        return kas.reverse();
      };
      return getParentArray(this.$route.path, this.menuList);
    }
  },
  components: {
    subMenu
  }
};
</script>
<style>
.showSlide {
  animation-duration: 0.2s;
  animation-name: slideInLeft;
}

.hideSlide {
  animation-duration: 0.2s;
  animation-name: slideOutLeft;
}

.main-sidebar {
  width: 201px;
  background-color: #2c3e50;
  box-shadow: 0px 0 20px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  z-index: 810;
  -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
}
.expandSide {
  width: 230px;
}

.el-menu-style .el-submenu .el-menu-item {
  height: 45px;
  line-height: 45px;
}

.el-menu-style .el-menu-item,
.el-menu-style .el-submenu__title {
  height: 45px;
  line-height: 45px;
}

.main-sidebar .el-menu--collapse {
  width: 44px;
}

.main-sidebar .el-menu--collapse > .el-menu-item,
.main-sidebar .el-menu--collapse > .el-submenu > .el-submenu__title {
  padding-left: 13px !important;
}

.vue-scrollbar {
  height: calc(100vh - 40px);
}

.main-sidebar .el-scrollbar__bar.is-vertical {
  display: none;
}

.sidebar {
  min-height: 450px;
}

</style>
