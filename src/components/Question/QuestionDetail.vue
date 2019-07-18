<template>
  <div>
    <h2>题目详情</h2>
    <h3>{{questionContent}}</h3>

    <h2>Tags</h2>
    <h3>{{questionTags}}</h3>

    <h2>题目答案</h2>
    <h3>{{questionAnswer}}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionId: "",
      questionTags: "",
      questionContent: "",
      questionAnswer: "",
      questionType: "",

    };
  },
  method: {},
  beforeCreate() {
    this.questionId = this.$route.params.questionid;
    this.axios.get(this.GLOBAL.BASE_REQUEST_URL+"/question/"+this.questionId).then((result) => {
      // console.log(result);
      if(result.data.status.status==='success'){
        this.questionId = result.data.questionDataList[0].questionId;
        this.questionContent = result.data.questionDataList[0].questionContent;
        this.questionAnswer = result.data.questionDataList[0].questionAnswer;
        this.questionType = result.data.questionDataList[0].questionType;
      }
    }).catch((err) => {
      console.log(err);
    });
  }
};
</script>

<style scoped>
</style>
