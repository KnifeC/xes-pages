<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
        <el-page-header
          @click="goBack()"
          @back="goBack()"
          content="新增题目"
          style="margin-top: 25px;margin-bottom: 25px"
        ></el-page-header>
        <el-divider></el-divider>
        <el-row>
          <el-col :md="{span:18,offset:3}" style="margin-top: 15px;">
            <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="题目内容" prop="questionContent">
                <el-input v-model="questionForm.questionContent" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="题目类型">
                <el-select
                  v-model="questionForm.questionType"
                  placeholder="请选择题目类型"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="题目Tag">
                <el-input v-model="questionTag"></el-input>
              </el-form-item>-->
              <el-form-item label="题目答案">
                <el-input v-model="questionForm.questionAnswer" type="textarea"></el-input>
              </el-form-item>
              <el-form-item style="text-align:center">
                <el-button type="primary" @click="addQuestion">上传题目</el-button>
              </el-form-item>
            </el-form>
            <el-form-item v-if="success" label="点击跳转到你的题目地址">
              <el-button @click="goQuestion()"></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      success: false,
      isLoading: false,
      isLogin: false,
      noList: false,
      fullscreenLoading: false,
      questionId: "",
      questionForm: {
        questionContent: "",
        questionAnswer: "",
        questionType: ""
        // questionTag: "",
      },
      questionBankList: [],
      options: [
        {
          value: "选择题",
          label: "选择题"
        },
        {
          value: "填空题",
          label: "填空题"
        },
        {
          value: "判断题",
          label: "判断题"
        },
        {
          value: "简答题",
          label: "简答题"
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addQuestion() {
      this.isDialog = true;
      this.isLoading = true;
      this.noList = false;
      this.questionBankList = [];
      var data = qs.stringify(this.questionForm);
      this.axios
        .post(this.GLOBAL.BASE_REQUEST_URL + "/uploadQuestion", data)
        .then(result => {
          // console.log(result);
          if (result.data.status.status === "success") {
            this.isLoading = false;
            this.success = true;
            this.questionId = result.data.questionDataList[0].questionId;
            this.$message({
              showClose: true,
              message: result.data.status.message,
              type: result.data.status.status
            });
          } else {
            this.isLoading = false;
            this.$message({
              showClose: true,
              message: result.data.status.message,
              type: result.data.status.status
            });
          }
        })
        .catch(() => {
          // console.log(err);
          this.isLoading = false;
            this.$message({
              showClose: true,
              message: '网络错误',
              type: 'error'
            });
        });
    },
    goQuestion(){
      this.$router.push('/question/'+this.questionId);
    }
  }
};
</script>

<style scoped>
</style>
