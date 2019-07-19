<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
        <el-page-header
          @click="goBack()"
          @back="goBack()"
          content="题库详情"
          style="margin-top: 25px;margin-bottom: 25px"
        ></el-page-header>
        <el-divider></el-divider>
        <h2>题库名——{{questionBankData.questionBankName}}</h2>
        <p>创建者——{{questionBankData.ownerName}}</p>
        <p>可见性——{{questionBankData.visibility}}</p>
        <div>
          <p v-if="noQuestion">该题库没有题目</p>
          <div v-else v-for="item in questionDataList" :key="item">
              <question-list-item itemdata="item"></question-list-item>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QuestionListItem from './../Question/QuestionListItem.vue';
import qs from 'qs';
export default {
  data() {
    return {
      fullscreenLoading: false,
      questionBankData: {
        questionBankId: "",
        questionBankName: "",
        visibility: "",
        ownerName: ""
      },
      questionDataList: "",
      noQuestion:false
    };
  },
  components:{
    'question-list-item':QuestionListItem
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getQuestionBankData() {
      this.fullscreenLoading = true;
      this.noQuestion = false;
      this.questionBankData.questionBankId = this.$route.params.questionBankId;
      this.axios
        .get(
          this.GLOBAL.BASE_REQUEST_URL +
            "/showQuestion/fromBank/" +
            this.$route.params.questionBankId
        )
        .then(result => {
          this.fullscreenLoading = false;
          console.log(result);
          if (result.data.questionBankDataList.length > 0) {
            this.questionBankData.questionBankId =
              result.data.questionBankDataList[0].questionBankId;
            this.questionBankData.questionBankName =
              result.data.questionBankDataList[0].questionBankName;
            this.questionBankData.visibility =
              result.data.questionBankDataList[0].visibility;
            this.questionBankData.ownerName =
              result.data.questionBankDataList[0].ownerName;
            if (result.data.status.status === "success") {
              this.questionDataList = result.data.questionDataList;
              this.noQuestion = false;
            } else {
              this.noQuestion = true;
              this.$message({
                showClose: true,
                message: result.data.status.message,
                type: result.data.status.status
              });
            }
          } else {
            this.$alert(result.data.status.message, result.data.status.status, {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push("/index");
              }
            });
          }
        })
        .catch(err => {
          this.fullscreenLoading = false;
          console.log(err);
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        });
    }
  },
  created() {
    this.getQuestionBankData();
  }
};
</script>

<style scoped>
</style>
