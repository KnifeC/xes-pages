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
                <el-input v-model="questionContent" type="textarea" :readonly="noEdit"></el-input>
              </el-form-item>
              <el-form-item label="题目类型" prop="visibility">
                <el-input v-model="questionType" :readonly="noEdit"></el-input>
              </el-form-item>
              <el-form-item label="题目Tag" prop="visibility">
                <el-tag v-for="tag in questionTags" :key="tag">{{tag}}</el-tag>
              </el-form-item>
              <el-form-item label="题目答案" prop="ownerName">
                <el-input v-model="questionAnswer" type="textarea" readonly="noEdit"></el-input>
              </el-form-item>
              <el-form-item style="text-align:center">
                <el-button type="primary" v-if="isLogin" @click="addToPersonalBank">添加到个人题库</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      noEdit: true,
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
    },
    addToPersonalBank(){

    }
  },
  created() {
    if(this.GLOBAL.USER_UUID!==''){
      this.isLogin = true;
    }
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
