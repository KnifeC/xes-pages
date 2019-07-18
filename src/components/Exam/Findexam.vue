<template>
   <div>
    <el-row>
      <el-col :md="{span:10,offset:7}" style="margin-top: 15px;">
        <el-input
          class="grid-content"
          @keyup.enter.native="search()"
          placeholder="请输入关键字或tag搜索"
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
    <el-row v-loading="loading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
            <el-table v-if="this.examDataList!==''" 
              :data="examDataList"
              stripe
              style="width: 100%">
          <el-table-column
              prop="examinationCreator"
              label="考试创建者"
              width="180">
          </el-table-column>
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
        examDataList:[]
      }
    },
    methods: {
      search() {
        // var api='webapi/searchOneExamination'
        Axios.get(this.GLOBAL.BASE_REQUEST_URL+"/searchOneExamination/"+this.keyWords.examinationId).then((response)=> {
          console.log(response);
          this.examDataList=response.data.examinationData;
        }).catch((error)=>{
           console.log(error)
           alert("网络错误");
        })

        }
    }
  }
</script>