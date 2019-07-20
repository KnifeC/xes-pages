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
        <el-row>
          <el-col :md="{span:18,offset:3}" style="margin-top: 15px;">
            <el-form
              :model="userForm"
              :rules="rules"
              ref="userForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="userForm.userName" :readonly="noEdit"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="visibility">
                <el-input v-model="userForm.userEmail" :readonly="true"></el-input>
              </el-form-item>
              <!-- <el-form-item label="权限" prop="ownerName">
                <el-input v-model="questionBankForm.ownerName" readonly="true"></el-input>
              </el-form-item>-->
              <el-form-item style="text-align:center">
                <el-button type="primary" @click="noEdit=fasle">编辑</el-button>
                <el-button type="primary" v-if="!noEdit" @click="editUserInfo()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      noEdit: true,
      fullscreenLoading: false,
      fullscreenLoading: false,
      userForm: {
        userName: "",
        userEmail: "",
        userId: ""
      }
    };
  },
  created() {
    this.userForm.userName = this.GLOBAL.USER_NAME;
    this.userForm.userEmail = this.GLOBAL.USER_EMAIL;
  },
 

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    editUserInfo(){
      this.noEdit = false;
    }
  }
};
</script>

<style scoped>
</style>
