<template>
  <div class="panpel">
      <div class="panpel-wrapper">
          <div class="panpel-header" v-if="title || $slots.header">
              <slot name="header"></slot>
          </div>
          <div class="panpel-body">
              <slot name="body"></slot>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style scoped>
.panpel {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  font-size: 14px;
}
.panpel-wrapper {
  background-color: #fff;
  padding: 10px;
  padding-bottom: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: 1px solid #d3dce6;
}
</style>

