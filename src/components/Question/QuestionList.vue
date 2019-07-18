<template>
  <div>
    <el-row>
      <el-col style="margin-top: 15px;">
        <el-card shadow="hover">{{data}}</el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      path: "",
      keyWords: "",
      questionDataList: ""
    };
  },
  props: {
      data:String,
  },
  methods: {
    
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style scoped>
</style>

