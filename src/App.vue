<template>
  <div class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
html{
  font-size:14px;
}
html,body{
  height:100%;
}
.app{
  height:100%;
}
</style>
