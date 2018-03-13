<template>
  <div class="modelBox">
      <div class="wrapper">
          <div class="wrapper-body">
              <slot name="model-body"></slot>
          </div>
          <div class="wrapper-footer">
              <el-button @click="submit">提交</el-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$emit('selectSubmit');
      // console.log("aaa");
    }
  }
};
</script>

<style scoped>
.modelBox {
  position: relative;
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100% - 201px);
  height: calc(100% - 40px);
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.wrapper {
  margin-top: 200px;
}
.wrapper-footer {
  display: flex;
  justify-content: center;
  /* text-align: center; */
}
/* .box-content {
  margin: 0 auto;
  margin-top: 60px;
  padding-bottom: 15px;
  z-index: 9999;
  width: 600px;
  height: auto;
  background-color: #fff;
}
.box-button {
  text-align: left;
  margin: 30px 60px;
}
.content {
  max-width: 250px;
  text-align: left;
  white-space: wrap;
  word-wrap: break-word;
} */
</style>

