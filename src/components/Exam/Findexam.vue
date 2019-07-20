<template>
  <div>
    <el-row>
      <el-col :md="{span:10,offset:7}" style="margin-top: 15px;">
        <el-input
          class="grid-content"
          @keyup.enter.native="search()"
          placeholder="请输入关键字进行搜索"
          v-model="keyWords.examinationName"
          v-on:input="change"
        >
          <el-button
            @click="search()"
            @keyup.enter.native="search()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="text"  @click="deletefind">清除搜索</el-button>
      </el-col>
    </el-row>
       
    <el-row>
      <el-col :md="{span:14,offset:5}">
        <el-table
          v-if="this.examDataList!==''"
          :data="examDataList"
          stripe
          style="width: 80%; margin: 0 auto;"
          @row-click="openDetails"
        >
          <el-table-column prop="examinationName" label="考试名称" align="center"></el-table-column>
          <el-table-column align="center" prop="creatorName" label="考试创建者"></el-table-column>
          <el-table-column align="center" prop="examinationStatus" label="考试状态"></el-table-column>
        </el-table>
        <p v-if="noResult" align="center">抱歉没有查到你想要的结果</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Axios from "axios";
import { log } from "util";
import { constants } from "crypto";
export default {
  data() {
    return {
      keyWords: {
        creatorId:"",
        examinationId: "",
        examinationName: "",
        examinationStatus:'',
        creatorName:""
      },
      examDataList: [],
      noResult: false,
      res: []
    };
  },
  created: function() {
    if(this.GLOBAL.UESR_TYPE==="user"){
      Axios.get(
      this.GLOBAL.BASE_REQUEST_URL +
        "/searchExamination/byUserId/" +
        this.GLOBAL.USER_UUID
    )
      .then(response => {
        // console.log(response.data);
        if (response.data.status.status === "success") {
          this.examDataList = response.data.examinationData;
          this.res = response.data.examinationData
          // console.log(this.res)
          this.noResult = false;
        } else {
          this.noResult = true;
        }
      })
      .catch(error => {
        console.log(error);
        this.noResult = true;
        this.$message({
          showClose: true,
          message: "网络错误",
          type: "error"
        });
      });
    }else if(this.GLOBAL.UESR_TYPE==="teacher"){
       Axios.get(
      this.GLOBAL.BASE_REQUEST_URL +
        "/examinationByCreator/" +  this.GLOBAL.USER_UUID
    )
      .then(response => {
        // console.log(response.data);
        if (response.data.status.status === "success") {
          this.examDataList = response.data.examinationData;
          this.noResult = false;
        } else {
          this.noResult = true;
        }
      })
      .catch(error => {
        console.log(error);
        this.noResult = true;
        this.$message({
          showClose: true,
          message: "网络错误",
          type: "error"
        });
      });
    }
    
  },
  methods: {
    change() {
      var key = this.keyWords.examinationName
      //  console.log(key)
      this.res = this.examDataList.filter(i => {
        return i.examinationName.indexOf(key) >= 0
      })
    },
    deletefind(){
      
      if(this.GLOBAL.UESR_TYPE==="user"){
      Axios.get(
      this.GLOBAL.BASE_REQUEST_URL +
        "/searchExamination/byUserId/" +
        this.GLOBAL.USER_UUID
    )
      .then(response => {
        // console.log(response.data);
        if (response.data.status.status === "success") {
          this.examDataList = response.data.examinationData;
          this.res = response.data.examinationData
          console.log(this.res)
          this.noResult = false;
        } else {
          this.noResult = true;
        }
      })
      .catch(error => {
        console.log(error);
        this.noResult = true;
        this.$message({
          showClose: true,
          message: "网络错误",
          type: "error"
        });
      });
    }else if(this.GLOBAL.UESR_TYPE==="teacher"){
       Axios.get(
      this.GLOBAL.BASE_REQUEST_URL +
        "/examinationByCreator/" +  this.GLOBAL.USER_UUID
    )
      .then(response => {
        // console.log(response.data);
        if (response.data.status.status === "success") {
          this.examDataList = response.data.examinationData;
          this.noResult = false;
        } else {
          this.noResult = true;
        }
      })
      .catch(error => {
        console.log(error);
        this.noResult = true;
        this.$message({
          showClose: true,
          message: "网络错误",
          type: "error"
        });
      });
    }
    this.keyWords.examinationName=""
    },
    search() {
      if (this.keyWords.examinationName === "") {
        this.$message({
          showClose: true,
          message: "请填写关键字",
          type: "warning"
        });
        return;
      }
      this.examDataList = "";
      this.noResult = false;
      Axios.get(
        this.GLOBAL.BASE_REQUEST_URL +
          "/searchExamination/byName/" +
          this.keyWords.examinationName
      )
        .then(response => {
          // console.log(response);
          if (response.data.status.status === "success") {
            this.examDataList = response.data.examinationData;
            this.noResult = false;
          } else {
            this.noResult = true;
          }
        })
        .catch(() => {
          // console.log(error);
          this.noResult = true;
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        });
    },
   
    openDetails(r, c, e) {
      var id = r.examinationId;
      //var createid = r.examinationId;
      // console.log(id);
      if(this.GLOBAL.UESR_TYPE==="user"){
        this.$router.push({ path: "examdetail/" + id });
      }else if(this.GLOBAL.UESR_TYPE==="teacher"){
        this.$router.push({ path: "teacherexamdetail/"  });
      }
      
    }
  }
};
</script>