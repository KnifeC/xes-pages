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
              :rules="userRules"
              ref="userForm"
              label-width="100px"
              class="demo-ruleForm"
              @keyup.enter.native="validateEditUser()"
            >
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="userForm.userName" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model="userEmail" :readonly="true"></el-input>
              </el-form-item>
              <!-- <el-form-item label="账号类别">
                <el-input v-model="userType" :readonly="true"></el-input>
              </el-form-item> -->
              <el-form-item style="text-align:center">
                <!-- <el-button type="primary" @click="noEdit=fasle">编辑</el-button> -->
                <!-- <el-button type="primary" v-if="!noEdit" @click="validateEditUser()">提交</el-button> -->
                <el-button type="danger"  @click="showDialog=true">修改密码</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showDialog">
      <el-row>
        <el-col :md="{span:12,offset:6}">
          <h2>修改密码</h2>
          <!-- :rules="loginRules" -->
          <el-form
            @keyup.enter.native="validateEditPass()"
            ref="editPassForm"
            :rules="editPassRules"
            :model="editPassForm"
          >
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                v-model="editPassForm.password"
                show-password
                style="width:100%;"
              ></el-input>
            </el-form-item>
            <el-form-item prop="re_password">
              <el-input
                placeholder="请重复密码"
                v-model="editPassForm.re_password"
                show-password
                style="width:100%;"
              ></el-input>
            </el-form-item>

            <el-divider>
              <i class="el-icon-loading"></i>
            </el-divider>
            <el-form-item>
              <el-button type="primary" @click="validateEditPass()" style="width:100%;">确认修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// import Axios from "axios";
import qs from "qs";
export default {
  data() {
    var validateRepass = (rule, value, callback) => {
      if (value !== this.editPassForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userEmail: "",
      noEdit: true,
      fullscreenLoading: false,
      fullscreenLoading: false,
      showDialog: false,
      userType: "",
      userForm: {
        userName: "",
        userId: ""
      },
      editPassForm: {
        userId: "",
        password: "",
        re_password: ""
      },
      userRules: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      editPassRules: {
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
  created() {
    this.userForm.userId = this.GLOBAL.USER_UUID;
    this.editPassForm.userId = this.GLOBAL.USER_UUID;
    this.userForm.userName = this.GLOBAL.USER_NAME;
    this.userEmail = this.GLOBAL.USER_EMAIL;
    this.userType = this.GLOBAL.USER_TYPE;
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    validateEditUser() {
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          this.editUserInfo();
        } else {
          return false;
        }
      });
    },
    validateEditPass() {
      this.$refs["editPassForm"].validate(valid => {
        if (valid) {
          this.editPassword();
        } else {
          return false;
        }
      });
    },
    editUserInfo() {
      this.userForm.userId = this.GLOBAL.USER_UUID;
      var data = qs.stringify(this.userForm);
      this.noEdit = true;
      this.axios
        .post(this.GLOBAL.BASE_REQUEST_URL + "/editUsername", data)
        .then(result => {
          if (result.status.status === "success") {
            this.GLOBAL.USER_NAME = this.userForm.userName;
            this.$message({
              showClose: true,
              message: '修改成功，请刷新页面',
              type: result.data.status
            });
          }
          this.$message({
            showClose: true,
            message: result.data.status.message,
            type: result.data.status.status
          });
        })
        .catch(err => {});
    },
    editPassword() {
      this.editPassForm.userId = this.GLOBAL.USER_UUID;
      var data = qs.stringify(this.editPassForm);
      this.noEdit = true;
      this.axios
        .post(this.GLOBAL.BASE_REQUEST_URL + "/editPassword", data)
        .then(result => {
          this.$message({
            showClose: true,
            message: result.data.message,
            type: result.data.status
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>
