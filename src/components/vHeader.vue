<template>
    <div class="v-header">
        <div class="v-header-wraper">
            <div class="header-left">
              <a href="#">来管家后台管理</a>
            </div>
            <nav>
                <div class="nav-padding nav-name"><span>arronwjn</span></div>
                <a class="nav-padding nav-out">退出</a>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: "v-header",
  data() {
    return {};
  }
};
</script>

<style scoped>
.v-header {
  width: 100%;
  height: 40px;
  line-height: 38px;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  color: #fff;
  background-color:#2c3e50;
  font-size:14px;
}
.v-header-wraper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left{
  width:200px;
  text-align: center;
}
nav {
  display: flex;
  justify-content: space-around;
}
nav .nav-padding{
  padding: 0 5px;
}
nav .nav-out{
  padding-right:20px;
  cursor:pointer;
}
</style>

