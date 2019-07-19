<template>
  <div id="navbar" v-loading.fullscreen.lock="fullscreenLoading">
    <el-menu :mode="modes" router :default-active="activeIndex">
      <el-menu-item index="index">
        <el-image style="height: 50px; width: 50px" :src="logourl" fit="contain"></el-image>
      </el-menu-item>
      <el-menu-item index="/index">主页</el-menu-item>
      <el-menu-item index="/question">题目</el-menu-item>
      <el-menu-item :index="questionbanklink()" v-if="user.userType!==''">个人题库</el-menu-item>
      <el-menu-item index="/exam" v-if="user.userType!==''">考试中心</el-menu-item>
      <el-menu-item index="/group" v-if="user.userType!==''">你的小组</el-menu-item>
      <el-menu-item index="/teacher" v-if="user.userType==='teacher'">教师中心</el-menu-item>
      <el-menu-item index="/admin" v-if="user.userType==='admin'">管理员面板</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>-->
      <el-menu-item
        style="float:right"
        @click="loginDialogVisible = true"
        v-if="user.username===''"
      >登录</el-menu-item>
      <el-submenu style="float:right" v-else>
        <template slot="title">{{user.username}}</template>
        <el-menu-item @click="Personal">个人中心</el-menu-item>
        <el-menu-item @click="logout">登出</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-dialog :visible.sync="loginDialogVisible">
      <el-row>
        <el-col :md="{span:12,offset:6}">
          <h2>登录</h2>
          <!-- :rules="loginRules" -->
          <el-form
            @keyup.enter.native="validateLogin()"
            ref="loginForm"
            :rules="loginRules"
            :model="loginForm"
          >
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
              <el-button type="primary" @click="validateLogin()" style="width:100%;">登录</el-button>
            </el-form-item>
            <el-divider>
              <i class="el-icon-loading"></i>
            </el-divider>
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
          <el-form
            @keyup.enter.native="validateRegister()"
            :rules="registerRules"
            ref="registerForm"
            :model="registerForm"
          >
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
              <el-button type="primary" @click="validateRegister()" style="width:100%;">注册</el-button>
            </el-form-item>
            <el-divider>
              <i class="el-icon-loading"></i>
            </el-divider>
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
import Axios from 'axios'
import qs from "qs";
export default {
  name: "navbar",
  props: {},
  data() {
    var validateEmail = (rule, value, callback) => {
      callback();
    };
    var validateRepass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      fullscreenLoading: false,
      activeIndex: "",
      modes: "horizontal",
      logourl: "https://i.loli.net/2019/07/18/5d30579ad7c9c27862.png",
      loginDialogVisible: false,
      registerDialogVisible: false,
      user: { username: "", userUuid: "", userEmail: "", userType: "" },
      loginForm: { email: "", password: "" },
      registerForm: { email: "", username: "", password: "", re_password: "" },
      loginRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱形式", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "change" }
        ]
      },
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱形式", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱形式", trigger: "change" },
          { validator: validateEmail, trigger: "blur" }
        ],
        username: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "change" }
        ],
        re_password: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validateRepass, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    questionbanklink() {
      return "/questionbank/" + this.user.userUuid;
    },
    changeDialog() {
      this.loginDialogVisible = !this.loginDialogVisible;
      this.registerDialogVisible = !this.registerDialogVisible;
    },
    validateLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    validateRegister() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          this.register();
        } else {
          return false;
        }
      });
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
        })
        .catch(() => {
          // console.log(error);
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        });
    },
    Personal(){
      var id = this.GLOBAL.USER_UUID
      console.log(id)
      this.$router.push({path: 'userinfo/' })
    },
    logout(){
      //this.axios.get(this.GLOBAL.BASE_REQUEST_URL+"/logout")
      this.axios.get(this.GLOBAL.BASE_REQUEST_URL+"/logout").then(response=>{
        console.log(response);
      })
      this.GLOBAL.USER_NAME = "";
      this.GLOBAL.USER_UUID = "";
      this.GLOBAL.USER_EMAIL = "";
      this.GLOBAL.UESR_TYPE = "";
      console.log('sf')
      this.$router.push({path: '/index'})
     
    
    }
  },
  
 
  components: {},
  created() {
    this.fullscreenLoading = true;
    if (this.GLOBAL.USER_NAME !== "") {
      this.user.username = this.GLOBAL.USER_NAME;
      this.user.userUuid = this.GLOBAL.USER_UUID;
      this.user.userEmail = this.GLOBAL.USER_EMAIL;
      this.user.userType = this.GLOBAL.UESR_TYPE;
      this.loginDialogVisible = false;
    } else {
      this.fullscreenLoading = true;
      this.axios
        .get(this.GLOBAL.BASE_REQUEST_URL + "/gettoken")
        .then(response => {
          if (response.data.status.status === "success") {
            this.GLOBAL.USER_NAME = response.data.user.username;
            this.GLOBAL.USER_UUID = response.data.user.userUuid;
            this.GLOBAL.USER_EMAIL = response.data.user.email;
            this.GLOBAL.UESR_TYPE = response.data.user.type;
            this.user.username = this.GLOBAL.USER_NAME;
            this.user.userUuid = this.GLOBAL.USER_UUID;
            this.user.userEmail = this.GLOBAL.USER_EMAIL;
            this.user.userType = this.GLOBAL.UESR_TYPE;
            this.loginDialogVisible = false;
            this.fullscreenLoading = false;
          }
        });
      this.loginDialogVisible = false;
      this.fullscreenLoading = false;
    }
  }
};
</script>


<style scoped>
</style>
