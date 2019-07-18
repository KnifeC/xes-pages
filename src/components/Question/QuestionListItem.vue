<template>
  <div>
    <el-row>
      <el-col style="margin-top: 15px;">
        <el-card shadow="hover" @click="goDetail()">{{itemdata.questionContent}}</el-card>
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
      itemdata:Object,
  },
  methods: {
    goDetail(){
      this.$route.push({path:"/question/"+this.itemdata.questionId});
    },
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style scoped>
</style>

