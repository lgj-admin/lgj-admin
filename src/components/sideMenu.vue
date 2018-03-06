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

export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      uniqueOpened: true,
      menuList: [
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
  mounted() {
    let route = this.$route;
  },
  methods: {
    handleSelect() {},
    handleOpen() {},
    handleClose() {}
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    },
    onRouteKeys() {
      // const getParentArray = (path, ms, kas = []) => {
      //   if (ms && ms.length > 0) {
      //     for (let k = 0, length = ms.length; k < length; k++) {
      //       if (path == ms[k].href) {
      //         kas.push(ms[k].href);
      //         break;
      //       }
      //       let i = kas.length;
      //       if (ms[k].children && ms[k].children.length > 0) {
      //         getParentArray(path, ms[k].children, kas);
      //       }
      //       if (i < kas.length) {
      //         kas.push(ms[k].href);
      //       }
      //     }
      //   }
      //   return kas.reverse();
      // };
      let obj=new Object();
      const getParentArray = (path, ms, kas = []) => {
        if (ms && ms.length > 0) {
          for (let k = 0, length = ms.length; k < length; k++) {
            if (path == ms[k].href) {
              obj.href = ms[k].href;
              obj.name = ms[k].name;
              kas.push(obj);
              break;
            }
            let i = kas.length;
            if (ms[k].children && ms[k].children.length > 0) {
              getParentArray(path, ms[k].children, kas);
            }
            if (i < kas.length) {
              obj.href = ms[k].href;
              obj.name = ms[k].name;
              kas.push(obj);
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
  background-color: #ffffff;
  z-index: 810;
  -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
}

.expandSide {
  width: 230px;
}

.el-menu-style,
.el-menu-style .el-menu {
  background-color: #ffffff;
}
.el-menu-style .el-menu-item:hover,
.el-menu-style .el-submenu__title:hover {
  background-color: #eeeeee !important;
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
  background-color: #ffffff !important;
  height: calc(100vh - 50px);
}

.main-sidebar .el-scrollbar__bar.is-vertical {
  display: none;
}

.sidebar {
  min-height: 450px;
}
</style>
