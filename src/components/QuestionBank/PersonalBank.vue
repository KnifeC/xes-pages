<template>
  <div style="width=100%;height=100%" v-loading="loading">
    <div v-if="!noResult||!noData">
      <div v-for="item in questionBankDataList" :key="item">
        <question-bank-list-item :itemdata="item"></question-bank-list-item>
      </div>
    </div>
    <p v-if="noData" style="text-align:center">你还没有题库</p>
    <p v-if="noResult" style="text-align:center">抱歉没有查到你想要的结果</p>
  </div>
</template>

<script>
import QuestionBankListItem from './QuestionBankListItem';
export default {
  data() {
    return {
      loading: false,
      noData: false,
      noResult: false,
      questionBankDataList: []
    };
  },
  components:{
      'question-bank-list-item':QuestionBankListItem,
  },
  created() {
    this.loading = true;
    this.noData = false;
    this.noResult = false;
    this.axios
      .get(this.GLOBAL.BASE_REQUEST_URL + "/searchQuestionBank/byUserId")
      .then(result => {
        if (result.data.status.status === "success") {
          if (result.data.questionBankData.length > 0) {
            this.questionBankDataList = result.data.questionBankData;
            this.loading = false;
          } else {
            this.noData = true;
            this.loading = false;
          }
        } else {
          this.$message({
            showClose: true,
            message: result.data.message,
            type: result.data.status
          });
        }
      })
      .catch(err => {});
  }
};
</script>

<style scoped>
</style>
