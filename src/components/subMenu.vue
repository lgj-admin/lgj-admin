<template>
  <el-submenu :index="item.href" v-if="item.children && item.children.length>0" class="el-menu-sub">
    <template slot="title" v-if="item.children.length>0"><i :class="item.icon"></i><span>{{item.name}}</span></template>
    <div  v-for="(child,index) in item.children" :key='index'>
      <sub-menu v-if="child.children && child.children.length>0 && codeStatus(child.code)" :param="child" ></sub-menu>
      <el-menu-item :index="child.href" v-if="child.children.length<=0 && codeStatus(child.code)"><i :class="child.icon"></i><span>{{child.name}}</span></el-menu-item>
    </div>
  </el-submenu>
  <el-menu-item :index="item.href" v-else-if="item.children.length<=0 && codeStatus(item.code)" class="el-menu-each">
      <i :class="item.icon"></i>
      <span>{{item.name}}</span>
  </el-menu-item>
</template>
<script>
import subMenu from "./subMenu.vue";
import { menuList } from "../mock/dataBase";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";
import { getStore,removeStore } from "config/utils";
import {mapMutations,mapGetters} from 'vuex'


export default {
  name: "subMenu",
  props: {
    param: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      item: this.param,
      admininfo:{},
    };
  },
  computed:{
    ...mapGetters(['codeList'])
  },
  methods:{
    ...mapMutations({
      get_codeList:'GET_CODELIST'
    }),
    codeStatus(data){
      let status = false;
      if(this.codeList.indexOf(data,0)>=0){
        status = true;
      }
      return status;
    }
  },
  created(){
    if(getStore('ADMININFO')){
      this.admininfo = JSON.parse(getStore('ADMININFO'));
    }
    ApiDataModule('GETAUTH',{role_id:this.admininfo.role_id}).then(res=>{
      this.get_codeList(res);
    })
  },
  components: {
    subMenu
  }
};
</script>
<style scoped>
.el-menu .fa {
  margin-right: 10px;
}
</style>
