<template>
  <div id="navbar">
    <el-menu :mode="modes" router :default-active="activeIndex">
      <el-menu-item index="index">
        <el-image style="height: 50px; width: 50px" :src="logourl" fit="contain"></el-image>
      </el-menu-item>
      <el-menu-item index="index">主页</el-menu-item>
      <el-menu-item index="question">查看题目</el-menu-item>
      <el-menu-item index="exam" v-if="user.userType!==''">考试中心</el-menu-item>
      <el-menu-item index="group" v-if="user.userType!==''">你的小组</el-menu-item>
      <el-menu-item index="manage" v-if="user.userType==='teacher'">教师中心</el-menu-item>
      <el-menu-item index="admin" v-if="user.userType==='admin'">管理员面板</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item></el-menu-item>
      <el-menu-item
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
          <!-- :rules="loginRules" -->
          <el-form @keyup.enter.native="login()" ref="loginForm">
            <el-form-item prop="email">
              <el-input placeholder="请输入EMAIL" v-model="loginForm.email" style="width:100%;"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                v-model="loginForm.password"
                show-password
                style="width:100%;"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login()" style="width:100%;">登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="changeDialog()" type="success" style="width:100%;">没有账号？注册</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog :visible.sync="registerDialogVisible">
      <el-row>
        <el-col :md="{span:12,offset:6}">
          <h2>注册</h2>
          <el-form @keyup.enter.native="register()" :rules="registerRules" ref="registerForm">
            <el-form-item prop="email">
              <el-input placeholder="请输入EMAIL" v-model="registerForm.email" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item prop="username">
              <el-input placeholder="请输入用户名" v-model="registerForm.username" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                v-model="registerForm.password"
                show-password
                style="width:100%;"
              ></el-input>
            </el-form-item>
            <el-form-item prop="re_password">
              <el-input
                placeholder="请重复密码"
                v-model="registerForm.re_password"
                show-password
                style="width:100%;"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register()" style="width:100%;">注册</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="changeDialog()" type="success" style="width:100%;">已有账号？登录</el-button>
            </el-form-item>
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
      activeIndex: "",
      modes: "horizontal",
      logourl: "../../static/logo.svg",
      loginDialogVisible: false,
      registerDialogVisible: false,
      user: { username: "", userUuid: "", userEmail: "", userType: "" },
      loginForm: { email: "", password: "" },
      registerForm: { email: "", username: "", password: "", re_password: "" },
      loginRules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在6到18个字符",
            trigger: "change"
          }
        ]
      },
      registerRules: {}
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
            // console.log("USER_NAME:", response.data.user.username);
            this.GLOBAL.USER_NAME = response.data.user.username;
            this.GLOBAL.USER_UUID = response.data.user.userUuid;
            this.GLOBAL.USER_EMAIL = response.data.user.email;
            this.GLOBAL.UESR_TYPE = response.data.user.type;
            this.user.username = this.GLOBAL.USER_NAME;
            this.user.userUuid = this.GLOBAL.USER_UUID;
            this.user.userEmail = this.GLOBAL.USER_EMAIL;
            this.user.userType = this.GLOBAL.UESR_TYPE;
            this.loginDialogVisible = false;
          }
        })
        .catch(() => {
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
          // console.log(response);
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
        });
      // .catch(error => {
      //   // console.log(error);
      //   this.$message({
      //     showClose: true,
      //     message: "网络错误",
      //     type: "error"
      //   });
      // });
    }
  },
  components: {},
  created() {},
  mounted() {
    this.axios
      .get(this.GLOBAL.BASE_REQUEST_URL + "/gettoken")
      .then(response => {
        // console.log(response);
        if (response.data.status.status === "success") {
          // console.log("USER_NAME:", response.data.user.username);
          this.GLOBAL.USER_NAME = response.data.user.username;
          this.GLOBAL.USER_UUID = response.data.user.userUuid;
          this.GLOBAL.USER_EMAIL = response.data.user.email;
          this.user.username = this.GLOBAL.USER_NAME;
          this.user.userUuid = this.GLOBAL.USER_UUID;
          this.user.userEmail = this.GLOBAL.USER_EMAIL;
        }
      });
  }
};
</script>


<style scoped>
</style>
