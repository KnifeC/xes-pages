<template>
  <div>
    <el-row v-loading="loading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
        <div v-if="!noResult">
          <div v-for="item in questionDataList" :key="item">
            <question-list-item :itemdata="item"></question-list-item>
          </div>
        </div>
        <p v-if="noResult" style="text-align:center">你好像还没有上传题目</p>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import QuestionListItem from "./QuestionListItem.vue";

export default {
  data() {
    return {
      path: "",
      questionDataList: [],
      noResult: false,
      loading: false
    };
  },
  components: {
    "question-list-item": QuestionListItem
  },
  methods: {
    getData() {
      this.noResult = false;
      this.loading = true;
      this.axios
        .get(
          this.GLOBAL.BASE_REQUEST_URL +
            "/searchQuestion/byUploaderId/" +
            this.GLOBAL.USER_UUID
        )
        .then(result => {
          // console.log(result);
          if (result.data.status.status === "success") {
            this.questionDataList = result.data.questionDataList;
            this.noResult = false;
          } else {
            this.noResult = true;
          }
          this.loading = false;
        })
        .catch(() => {
          this.noResult = true;
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
          this.loading = false;
        });
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

