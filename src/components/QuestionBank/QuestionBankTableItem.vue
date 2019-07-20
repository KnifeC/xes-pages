<template>
  <div>
    <!-- <el-row>
    <el-col style="margin-top: 15px;">-->
    <el-card shadow="hover" style="margin-top:25px">
      <el-row>
        <el-col :md="16">
          <span>{{itemdata.questionBankName}}</span>
        </el-col>
        <el-col :md="8">
          <el-button type="primary" style="float: right; padding: 3px 0" @click="goAdd()">添加到该题库</el-button>
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
import qs from "qs";
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
        questionId: this.questionId,
        questionBankId: this.itemdata.questionBankId
      };
      var formData = qs.stringify(data);
      this.axios
        .post(this.GLOBAL.BASE_REQUEST_URL + "/addQuestion/toBank", formData)
        .then(result => {
          console.log(result);
          this.$message({
            showClose: true,
            message: result.data.message,
            type: result.data.status
          });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message:'添加失败',
            type: 'error'
          });
        });
    }
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style scoped>
</style>

