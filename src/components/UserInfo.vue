<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading">
      <el-col :md="{span:14,offset:5}" style="margin-top: 15px;">
        <el-page-header
          @click="goBack()"
          @back="goBack()"
          content="我的信息"
          style="margin-top: 25px;margin-bottom: 25px"
        ></el-page-header>
        <el-divider></el-divider>
        <h3>我的昵称</h3>
        <h4>{{this.GLOBAL.USER_NAME}}</h4>
    
        <h3>我的邮箱</h3>
        <h4>{{this.GLOBAL.USER_EMAIL}}</h4>

        <h3>我的权限</h3>
        <h4>{{this.GLOBAL.UESR_TYPE}}</h4>

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
      UserName: "",
      Email: ""
    };
  },
  // created: function() {
  //     Axios.get(this.GLOBAL.USER_UUID).then((response)=> {
  //         console.log(response)
  //           this.UserName=this.GLOBAL.USER_NAME;
  //           this.Email=response.GLOBAL.USER_Email;
  //           this.noResult = false;
  //           console.log(this)
  //       }).catch((error)=>{
  //           console.log(error)
  //           this.noResult = true;
  //           this.$message({
  //           showClose: true,
  //           message: "网络错误",
  //           type: "error"
  //         });
  //       })
  // },
  methods: {
    goBack() {
      this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
</style>
