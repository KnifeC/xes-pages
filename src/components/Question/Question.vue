<template>
  <div>
    <el-row>
      <el-col :md="{span:10,offset:7}" style="margin-top: 15px;">
        <el-input
          class="grid-content"
          @keyup.enter.native="search()"
          placeholder="请输入关键字或tag搜索"
          v-model="keyWords"
        >
          <el-button
            @click="search()"
            @keyup.enter.native="search()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row v-loading="loading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
        <div v-if="!noResult">
          <div v-for="item in questionDataList" :key="item">
            <question-list-item :itemdata="item"></question-list-item>
          </div>
        </div>

        <p v-if="noResult">抱歉没有查到你想要的结果</p>
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
      keyWords: "",
      questionDataList: [],
      noResult: false,
      loading: false
    };
  },
  components: {
    "question-list-item": QuestionListItem
  },
  methods: {
    search() {
      // console.log('已经点击搜索');
      this.questionDataList = "";
      this.noResult = false;
      this.loading = true;
      this.axios
        .get(this.GLOBAL.BASE_REQUEST_URL + "/search/" + this.keyWords)
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
  beforeCreate() {
    this.path = this.$route.path;
  },
  mounted() {}
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

