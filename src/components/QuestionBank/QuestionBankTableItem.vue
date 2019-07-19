<template>
  <div>
    <!-- <el-row>
    <el-col style="margin-top: 15px;">-->
    <el-card shadow="hover" style="margin-top:25px">
      <el-row>
        <el-col :md="10" >
          <span>{{itemdata.questionBankName}}</span>
        </el-col>
        <el-col :md="6">
          <el-button type="primary" style="float: right; padding: 3px 0" @click="goAdd()">添加</el-button>
        </el-col>
      </el-row>
      <!-- <el-divider></el-divider>
      <el-row>{{itemdata.questionContent}}</el-row>-->
    </el-card>
    <!-- </el-col>
    </el-row>-->
  </div>
</template>


<script>
import qs from 'qs';
export default {
  data() {
    return {
      path: ""
    };
  },
  props: {
    itemdata: Object,
    questionId: String
  },
  methods: {
    goAdd() {
      var data = {
        questionId: questionId,
        questionBankId : itemdata.questionBankId
      }
    }
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style scoped>
</style>

