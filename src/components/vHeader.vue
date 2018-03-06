<template>
    <div class="v-header">
        <div class="v-header-wraper">
            <a href="#">Admin</a>
            <nav>
                <div></div>
                <div class="nav-right">arronwjn</div>
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
  color: #48576a;
  background-color:#fff;
}
.v-header-wraper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
nav {
  display: flex;
  justify-content: space-around;
}
</style>

