<template>
  <div style="width=100%" :v-loading="loading" >
    <el-button>管理试题</el-button>

    <el-dialog :visible.sync="isDialog" >
      <el-row>
        <el-col :md="{span:12,offset:6}"></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import QuestionListItem from './../Question/QuestionListItem';
import qs from 'qs';
export default {
  data() {
    return {
      isDialog: false,
      loading: false,
      paperId:"",
      paperQuestionData:"",
    };
  },
  props: {
    examId: String
  },
  components:{
      'question-list-item':QuestionListItem
  },
  methods:{
      createPaper(){
        var data = qs.stringify({examinationId:this.examId,paperName:this.examId});
        this.axios.post(this.GLOBAL.BASE_REQUEST_URL+"/createPaper",data).then((result) => {
             if(result.data.status.status==='success'){
                 this.paperId = result;
             }
         }).catch((err) => {
             this.$message({
          showClose: true,
          message: "加载试卷信息错误",
          type: "error"
        });
         });


      },
      getPaperById(){

      },
      addPaperQuestion(){
          
      }
  },
  mounted(){
      //请求试卷
        console.log('请求试卷');

      this.loading = true;
      var data = qs.stringify({examinationId:this.examId});
      this.axios.get(this.GLOBAL.BASE_REQUEST_URL+"/searchPaper/byExaminationId",data).then((result) => {
        console.log(result);
        // if(result.data.status.status==='success'){
        //     //如果有试卷
        //     //本地赋值试卷id
            
        //     this.paperId = "";
        //     this.loading = false;
        // }else{
        //     //没有则新建试卷并赋值
        //    this.createPaper();
        //    this.loading = false;
        // }
      }).catch((err) => {
          console.log(err);
      });

  }
};
</script>

<style scoped>
</style>
