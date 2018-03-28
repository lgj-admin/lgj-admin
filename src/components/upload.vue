<template>
    <div class="upload">
        <div class="upload-wrapper">
            <div class="upload-button" v-if="listType == 'text'">
                <slot name="upload-card">
                </slot>
                <div class="upload-delete" v-if="imgUrl">
                    <i class="el-icon-delete" @click="handleDelete"></i>
                </div>
                <input v-if="!imgUrl" type="file" name="" id="" @change="handleChange" ref="inputFile">
            </div>
            <div v-if="listType == 'pictureList'" >
                <div class="upload-body">
                    <!-- <slot name="upload-pictureList"></slot> -->
                    <div
                        slot="upload-pictureList"
                        v-if="imgArr.length"
                        v-for="(item,index) in imgArr"
                        :key="index"
                    >
                        <div class="upload-button">
                            <div class="upload-card">
                                <img :src="item" alt="" width="100" height="60">
                            </div>
                            <div class="upload-delete">
                                <i class="el-icon-delete" @click="remove(index)"></i>
                            </div>
                        </div>
                    </div>
                    <div class="upload-button">
                        <div class="upload-card">
                            <i class="el-icon-plus"></i>
                        </div>
                        <input type="file" name="" id="" @change="handleChange" ref="inputFile">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    imgArr: {
      type: Array,
      default: []
    },
    listType:{
      type:String,
      default:'text'
    }
  },
  data() {
    return {
    };
  },
  methods: {
    remove(index){
      // this.imgArr.splice(index,1);
      const urlArr = this.imgArr.splice(index,1);
      console.log(index);
      console.log(urlArr);
      this.$emit('update:imgArr',urlArr)
    },
    handleChange(e) {
      this.$emit("selectUpload", e);
    },
    handleDelete() {
      this.$emit('update:imgUrl','')
    },
    getInputValue(){
      return this.$refs.inputFile;
    }
  }
};
</script>

<style scoped>
.upload-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.upload-button {
  position: relative;
  /* width:148px;
  height:148px; */
  padding:60px 100px;
  border: none;
  outline: none;
  /* background-color: #2196f3; */
  border-radius: 5px;
  color: #fff;
  border: 1px dashed #ccc;
  font-size: 14px;
}
.upload-button i {
  font-size: 22px;
  color: #ccc;
}
.upload-button input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.upload-delete {
  display: none;
}
.upload-button:hover .upload-delete {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.upload-delete i {
  font-size: 26px;
  color: #fff;
  cursor: pointer;
}
.upload-card{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.upload-body{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
