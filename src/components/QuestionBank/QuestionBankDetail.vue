<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
        <el-page-header
          @click="goBack()"
          @back="goBack()"
          :content="questionBankData.questionBankName"
          style="margin-top: 25px;margin-bottom: 25px"
        ></el-page-header>
        <el-divider></el-divider>
        <h2>题目内容</h2>
        <p></p>

        <h2>Tags</h2>
        <p></p>

        <h2>题目答案</h2>
        <p></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      questionBankData: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.fullscreenLoading = true;
    this.questionId = this.$route.params.questionBankId;
    this.axios
      .get(
        this.GLOBAL.BASE_REQUEST_URL +
          "/questionBank/" +
          this.$route.params.questionBankId
      )
      .then(result => {
        this.fullscreenLoading = false;
        console.log(result);
      })
      .catch(err => {
        this.fullscreenLoading = false;
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>
