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
        <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="考试编号">
          <el-input placeholder="" v-model="ExaminationId" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="考试科目">
          <el-input placeholder="" v-model="ExaminationName" :disabled="flase"> </el-input>
        </el-form-item>
        <el-form-item label="创建者编号">
          <el-input placeholder="" v-model="creatorId" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="考试创建者">
          <el-input placeholder="" v-model="ExaminationCreator" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="考试开始时间">
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                v-model="examform.beginTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions1">
                </el-date-picker>
            </div>
        </el-form-item>
         <el-form-item label="考试结束时间">
          <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                v-model="examform.endTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions1">
                </el-date-picker>
            </div>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="editexam">提交</el-button>
        </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios'
import qs from "qs";
export default {
  data() {
    return {
      fullscreenLoading: false,
      ExaminationId: "",
      ExaminationName: "",
      creatorId: "",
      ExaminationCreator: "",
      pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },

        examform:{
            examinationId:'',
            examinationName:'',
            beginTime:'',
            endTime:''
        },
        
    };
  },
  created: function() {
     
      Axios.get(this.GLOBAL.BASE_REQUEST_URL+ "/examinationByCreator/" +  this.GLOBAL.USER_UUID).then((response)=> {
          console.log(response)
          if(response.data.status.status==="success"){
            this.ExaminationId=response.data.examinationData[0].examinationId;
            this.examform.examinationId=response.data.examinationData[0].examinationId;
            this.examform.examinationName=response.data.examinationData[0].examinationName;
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
    },
    editexam(){
         var data = qs.stringify(this.examform);

          Axios.post(this.GLOBAL.BASE_REQUEST_URL+ "/editExaminationInfo",data).then((response)=> {
          console.log(response)
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        }).catch((error)=>{
            console.log(error)
            this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        })

    },
    openDetails(){
          
    }
  }
}
</script>

<style scoped>
</style>
