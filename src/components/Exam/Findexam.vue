<template>
   <div >
    <el-row>
      <el-col :md="{span:10,offset:7}" style="margin-top: 15px;">
        <el-input
          class="grid-content"
          @keyup.enter.native="search()"
          placeholder="请输入关键字进行搜索"
          v-model="keyWords.examinationId"
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
    <el-row v-loading="loading" >
      <el-col :md="{span:14,offset:5}" >
            <el-table v-if="this.examDataList!==''" 
              :data="examDataList"
              stripe
              style="width: 100% margin: 0 auto;">
          <el-table-column
              prop="examinationId"
              label="考试编号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="examinationName"
              label="考试名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="creatorId"
              label="创建者编号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="creatorName"
              label="考试创建者"
              width="180">
          </el-table-column>
          
        </el-table>
        <!-- <el-table v-if="this.examDataList!==''" :data="examDataList"></el-table> -->
        <p v-if="noResult"> 抱歉没有查到你想要的结果 </p>
      </el-col>
    </el-row>
  </div>
 
</template>
<script>
  import Axios from 'axios'
  export default {
    data() {
      return {
          keyWords: {
          examinationId: ''
        },
        examDataList:[],
        noResult : false
      }
    },
    methods: {
      
      search() {
        this.examDataList="";
        this.noResult = false;
        // var api='webapi/searchOneExamination'
        Axios.get(this.GLOBAL.BASE_REQUEST_URL+"/searchOneExamination/"+this.keyWords.examinationId).then((response)=> {
          console.log(response);
          if(response.data.status.status==="success"){
            this.examDataList=response.data.examinationData;
            this.noResult = false;
          }else{
             this.noResult = true;
          }

          //this.examDataList=response.data.examinationData;
        }).catch((error)=>{
            console.log(error)
            this.noResult = true;
            this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        })

        }
    }
  }
</script>