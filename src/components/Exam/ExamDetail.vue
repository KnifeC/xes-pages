<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
        <el-page-header
          @click="goBack()"
          @back="goBack()"
          content="考试详情"
          style="margin-top: 25px;margin-bottom: 25px"
        ></el-page-header>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="考试编号">
          <el-input placeholder="" v-model="ExaminationId" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="考试科目">
          <el-input placeholder="" v-model="ExaminationName" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="创建者编号">
          <el-input placeholder="" v-model="creatorId" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="考试创建者">
          <el-input placeholder="" v-model="ExaminationCreator" :disabled="true"> </el-input>
        </el-form-item>
        </el-form>
        <!-- <h4>考试编号:{{ExaminationId}}</h4> -->
        <!-- <h4>考试科目:{{ExaminationName}}</h4>
        <h4>创建者编号:{{creatorId}}</h4>
        <h4>考试创建者:{{ExaminationCreator}}</h4> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      fullscreenLoading: false,
      ExaminationId: "",
      ExaminationName: "",
      creatorId: "",
      ExaminationCreator: ""
    };
  },
  created: function() {
      
      Axios.get(this.GLOBAL.BASE_REQUEST_URL+"/searchExamination/byId/"+this.$route.params.id).then((response)=> {
          console.log(response)
          if(response.data.status.status==="success"){
            this.ExaminationId=response.data.examinationData[0].examinationId;
            this.ExaminationName=response.data.examinationData[0].examinationName;
            this.creatorId=response.data.examinationData[0].creatorId;
            this.ExaminationCreator=response.data.examinationData[0].creatorName;
            this.noResult = false;
            console.log(this)
          }else{
            this.noResult = true;
          }
        }).catch((error)=>{
            console.log(error)
            this.noResult = true;
            this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        })
  },
  methods: {
    goBack() {
      this.$router.go(-1);
        }
    },
    openDetails(){
          
      }
}
</script>

<style scoped>
</style>
