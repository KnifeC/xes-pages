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
        <el-row>
          <el-col :md="{span:18,offset:3}" style="margin-top: 15px;">
            <el-form
              :model="questionBankForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="题库名" prop="questionBankName">
                <el-input v-model="questionBankForm.questionBankName" :readonly="noEdit"></el-input>
              </el-form-item>
              <el-form-item label="可见性" prop="visibility">
                <el-select
                  v-model="questionBankForm.visibility"
                  placeholder="请选择可见性"
                  style="width:100%"
                  :disabled="noEdit"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="创建者" prop="ownerName">
                <el-input v-model="questionBankForm.ownerName" readonly="true"></el-input>
              </el-form-item>
              <el-form-item style="text-align:center">
                <el-button type="primary" @click="noEdit=fasle">编辑</el-button>
                <el-button type="primary" v-if="!noEdit" @click="changeQuestionBank()">提交</el-button>
                <el-button type="danger" v-if="!noEdit" @click="deleteQuestionBank()">删除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div>
          <p v-if="noQuestion">该题库没有题目</p>
          <div v-else v-for="item in questionDataList" :key="item">
            <question-list-item :itemdata="item"></question-list-item>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QuestionListItem from "./../Question/QuestionListItem.vue";
import qs from "qs";
export default {
  data() {
    return {
      noEdit: true,
      fullscreenLoading: false,
      questionBankData: {
        questionBankId: "",
        questionBankName: "",
        visibility: "",
        ownerName: ""
      },
      questionBankForm: {
        questionBankId: "",
        questionBankName: "",
        visibility: "",
        ownerName: ""
      },
      questionDataList: "",
      noQuestion: false,
      options: [
        {
          value: "不公开",
          label: "仅自己可见"
        },
        {
          value: "公开",
          label: "所有人可见"
        }
      ]
    };
  },
  components: {
    "question-list-item": QuestionListItem
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
            this.questionBankForm = this.questionBankData;
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
    },
    changeQuestionBank() {
      this.noEdit = true;
      var data = qs.stringify(this.questionBankForm);
      this.axios
        .post(this.GLOBAL.BASE_REQUEST_URL + "/editBankInfo", data)
        .then(result => {
          console.log(result);
          if (result.data.status === "success") {
            this.$message({
              showClose: true,
              message: result.data.message,
              type: result.data.status
            });
            this.questionBankData = this.questionBankForm;
          } else {
            this.$message({
              showClose: true,
              message: result.data.message,
              type: result.data.status
            });
            this.questionBankForm = this.questionBankData;
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
          this.questionBankForm = this.questionBankData;
        });
    },
    deleteQuestionBank(){
        var data = qs.stringify({questionBankId:this.questionBankData.questionBankId});
        this.axios.post(this.GLOBAL.BASE_REQUEST_URL+'/deleteQuestionBank',data).then((result) => {
          console.log(result);
          this.$router.replace('/questionbank/'+this.GLOBAL.USER_UUID);
        }).catch((err) => {
           console.log(err);
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
