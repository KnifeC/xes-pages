<template>
  <div>
    <!-- <el-row>
    <el-col style="margin-top: 15px;">-->
    <el-card shadow="hover" style="margin-top:25px">
      <el-row>
        <el-col :md="18" style="margin-top: 15px;">
          <span>Tags:</span>
        </el-col>
        <el-col :md="6">
          <el-button style="float: right; padding: 3px 0" type="text" @click="goDetail()">查看详情</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>{{itemdata.questionContent}}</el-row>
    </el-card>
    <!-- </el-col>
    </el-row>-->
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
    itemdata: Object
  },
  methods: {
    goDetail() {
      this.$router.push({ path: "/question/" + this.itemdata.questionId });
    }
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style scoped>
</style>

