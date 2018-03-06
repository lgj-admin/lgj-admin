<template>
    <panpel class="home">
        <div slot="header"><a href="#">首页啊啊啊</a></div>
        <div slot="body">改完了</div>
    </panpel>
</template>

<script>
import Panpel from "base/panpel";
export default {
  components: {
    Panpel
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
</style>

