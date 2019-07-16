<template>
  <div id="navbar">
    <el-menu
      :mode="modes"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="index">
        <el-image style="height: 50px; width: 50px" :src="logourl" fit="contain"></el-image>
      </el-menu-item>
      <el-menu-item index="index">主页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item
        index="loginButton"
        style="float:right"
        @click="loginDialogVisible = true"
        v-if="user.username===''"
      >登录</el-menu-item>
      <el-menu-item style="float:right" v-else>{{user.username}}</el-menu-item>
    </el-menu>

    <el-dialog :visible.sync="loginDialogVisible">
      <el-row>
        <el-col :md="{span:12,offset:6}">
          <h2>登录</h2>
          <el-form @keyup.enter.native="login()" :rules="loginRules">
            <el-input
              type="text"
              name="email"
              placeholder="请输入EMAIL"
              v-model="loginForm.email"
              style="width:100%;"
            ></el-input>
            <br />
            <el-input
              type="text"
              name="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
              show-password
              style="width:100%;margin-top:10px;margin-bottom:10px"
            ></el-input>
            <br />
            <el-button type="primary" @click="login()" style="width:100%;margin-top:10px">登录</el-button>
            <br />
            <el-button
              @click="changeDialog()"
              type="success"
              style="width:100%;margin-top:10px"
            >没有账号？注册</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog :visible.sync="registerDialogVisible">
      <el-row>
        <el-col :md="{span:12,offset:6}">
          <h2>注册</h2>
          <el-form @keyup.enter.native="register()">
            <el-input
              type="text"
              name="email"
              placeholder="请输入EMAIL"
              v-model="registerForm.email"
              style="width:100%;"
            ></el-input>
            <br />
            <el-input
              type="text"
              name="username"
              placeholder="请输入用户名"
              v-model="registerForm.username"
              style="width:100%;margin-top:10px;"
            ></el-input>
            <br />
            <el-input
              type="text"
              name="password"
              placeholder="请输入密码"
              v-model="registerForm.password"
              show-password
              style="width:100%;margin-top:10px;"
            ></el-input>
            <br />
            <el-input
              type="text"
              name="re_password"
              placeholder="请重复密码"
              v-model="registerForm.re_password"
              show-password
              style="width:100%;margin-top:10px;margin-bottom:10px"
            ></el-input>
            <br />
            <el-button type="primary" @click="register()" style="width:100%;margin-top:10px">注册</el-button>
            <br />
            <el-button
              @click="changeDialog()"
              type="success"
              style="width:100% ;margin-top:10px"
            >已有账号？登录</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "navbar",
  props: {},
  data() {
    return {
      modes: "horizontal",
      logourl: "https://cn.vuejs.org/images/logo.png",
      loginDialogVisible: false,
      registerDialogVisible: false,
      user: {
        username: "",
        userUuid: "",
        userEmail: ""
      },
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: { email: "", username: "", password: "", re_password: "" },
      loginRules: {}
    };
  },
  methods: {
    changeDialog() {
      this.loginDialogVisible = !this.loginDialogVisible;
      this.registerDialogVisible = !this.registerDialogVisible;
    },
    login() {
      var data = qs.stringify(this.loginForm);
      this.axios
        .post(this.GLOBAL.BASE_REQUEST_URL + "/login", data)
        .then(response => {
          // console.log(response);
          this.$message({
            showClose: true,
            message: response.data.status.message,
            type: response.data.status.status
          });
          if (response.data.status.status === "success") {
            console.log("USER_NAME:", response.data.user.username);
            this.GLOBAL.USER_NAME = response.data.user.username;
            this.GLOBAL.USER_UUID = response.data.user.userUuid;
            this.GLOBAL.USER_EMAIL = response.data.user.email;
            this.user.username = this.GLOBAL.USER_NAME;
            this.user.userUuid = this.GLOBAL.USER_UUID;
            this.user.userEmail = this.GLOBAL.USER_EMAIL;
            this.loginDialogVisible = false;
          }
        })
        .catch(error => {
          // console.log(error);
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        });     
      this.loginForm.email = "";
      this.loginForm.password = "";
    },
    register() {
      var data = qs.stringify(this.registerForm);
      this.axios
        .post(this.GLOBAL.BASE_REQUEST_URL + "/register", data)
        .then(response => {
          console.log(response);
          this.$message({
            showClose: true,
            message: response.data.message,
            type: response.data.status
          });
          if (response.data.status === "success") {
            this.changeDialog();
            // this.loginDialogVisible = !this.loginDialogVisible;
            // this.registerDialogVisible = !this.registerDialogVisible;
            this.registerForm.email = "";
            this.registerForm.username = "";
            this.registerForm.password = "";
            this.registerForm.re_password = "";
          }
        })
        .catch(error => {
          // console.log(error);
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        });
    }
  },
  components: {},
  created() {}
};
</script>


<style scoped>
</style>
