<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
        <el-page-header
          @click="goBack()"
          @back="goBack()"
          content="题目详情"
          style="margin-top: 25px;margin-bottom: 25px"
        ></el-page-header>
        <el-divider></el-divider>
        <h2>题目内容</h2>
        <h3>{{questionContent}}</h3>

        <h2>Tags</h2>
        <h3>{{questionTags}}</h3>

        <h2>题目答案</h2>
        <h3>{{questionAnswer}}</h3>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      questionId: "",
      questionTags: "",
      questionContent: "",
      questionAnswer: "",
      questionType: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.fullscreenLoading = true;
    this.questionId = this.$route.params.questionid;
    this.axios
      .get(this.GLOBAL.BASE_REQUEST_URL + "/question/" + this.questionId)
      .then(result => {
        // console.log(result);
        if (result.data.status.status === "success") {
          this.questionId = result.data.questionDataList[0].questionId;
          this.questionContent =
            result.data.questionDataList[0].questionContent;
          this.questionAnswer = result.data.questionDataList[0].questionAnswer;
          this.questionType = result.data.questionDataList[0].questionType;
        } else {
          this.$router.push("/err");
        }
        this.fullscreenLoading = false;
      })
      .catch(err => {
        this.fullscreenLoading = false;
        this.$router.push("/err");
      });
  }
};
</script>

<style scoped>
</style>
