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
        <el-row>
          <el-col :md="{span:18,offset:3}" style="margin-top: 15px;">
            <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="题目内容" prop="questionContent">
                <el-input v-model="questionContent" type="textarea" readonly=true></el-input>
              </el-form-item>
              <el-form-item label="题目类型" >
                <el-input v-model="questionType" readonly=true></el-input>
              </el-form-item>
              <!-- <el-form-item label="题目Tag" >
                <el-tag v-for="tag in questionTags" :key="tag">{{tag}}</el-tag>
              </el-form-item> -->
              <el-form-item label="题目贡献者" >
                <el-input v-model="uploaderName" type="test" readonly=true></el-input>
              </el-form-item>
              <el-form-item label="题目答案" >
                <el-input v-model="questionAnswer" type="textarea" readonly=true></el-input>
              </el-form-item>
              <el-form-item style="text-align:center">
                <el-button type="primary" @click="addToPersonalBank">添加到个人题库</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="isDialog" :v-loading="isLoading">
      <el-row>
        <el-col :md="{span:12,offset:6}">
          <div v-if="noList">你还没有个人题库，先去创建一个吧</div>
          <div v-else v-for="item in questionBankList" :key="item">
            <question-bank-table-item :itemdata="item" :questionId="questionId"></question-bank-table-item>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import QuestionBankTableItem from "./../QuestionBank/QuestionBankTableItem.vue";
export default {
  data() {
    return {
      isLoading: false,
      isDialog: false,
      isLogin: false,
      noList: false,
      fullscreenLoading: false,
      questionId: "",
      questionTags: "",
      questionContent: "",
      questionAnswer: "",
      questionType: "",
      uploaderName:"",
      questionBankList: []
    };
  },
  components: {
    "question-bank-table-item": QuestionBankTableItem
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addToPersonalBank() {
      this.isDialog = true;
      this.isLoading = true;
      this.noList = false;
      this.questionBankList = [];
      this.axios
        .get(this.GLOBAL.BASE_REQUEST_URL + "/searchQuestionBank/byUserId")
        .then(result => {
          console.log(result);
          if (result.data.status.status === "success") {
            if (result.data.questionBankData.length > 0) {
              this.questionBankList = result.data.questionBankData;
              this.isLoading = false;
            } else {
              this.noList = true;
              this.isLoading = false;
            }
          } else {
            this.$message({
              showClose: true,
              message: result.data.status.message,
              type: result.data.status.status
            });
            this.noList = true;
            this.isLoading = false;
          }
        })
        .catch(err => {});
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
          this.questionTags = result.data.questionDataList[0].questionTags;
          this.uploaderName = result.data.questionDataList[0].uploaderName;
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
