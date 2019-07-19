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
      this.$router.push({ path: "/question", query: { k: this.keyWords } });
    }
  },

  mounted() {
    if (this.$route.query.k) {
      this.keyWords = this.$route.query.k;
      this.noResult = false;
      this.loading = true;
      this.axios
        .get(this.GLOBAL.BASE_REQUEST_URL + "/search/" + this.$route.query.k)
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
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.loading = true;
    next();
    this.axios
      .get(this.GLOBAL.BASE_REQUEST_URL + "/search/" + to.query.k)
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

