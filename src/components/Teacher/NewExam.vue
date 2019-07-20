<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-row>
      <el-col :md="{span:12,offset:6}" style="margin-top: 25px;">
        <el-form
          :model="newExamForm"
          :rules="newExamRules"
          ref="newExamForm"
          label-width="100px"
          class="demo-ruleForm"
          @keyup.enter.native="createExamination()"
        >
          <el-form-item label="考试名称" prop="examinationName">
            <el-input v-model="newExamForm.examinationName"></el-input>
          </el-form-item>
          <!-- <el-col :span="12"> -->
          <el-form-item label="起始时间" prop="beginTime">
            <el-date-picker
              v-model="newExamForm.beginTime"
              type="datetime"
              placeholder="选择日期时间"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
          <!-- </el-col> -->
          <!-- <el-col :span="12"> -->
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="newExamForm.endTime"
              type="datetime"
              placeholder="选择日期时间"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="持续小时" prop="durationTime">
            <el-input-number v-model="newExamForm.durationTime"  controls-position="right" :precision="2" :step="0.1" :min="0.5" :max="24" label="持续时长"></el-input-number>
          </el-form-item>
          <!-- </el-col> -->
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="createExamination()">新建考试</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      selfUrl: "",
      fullscreenLoading: false,
      newExamForm: {
        examinationName: "",
        beginTime: "",
        endTime: "",
        durationTime: ""
      },
      newExamRules: {
        examinationName: [
          { required: true, message: "请输入考试名称", trigger: "blur" }
        ],
        beginDate: [
          { required: true, message: "请选择起始时间", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    createExamination() {
      if (
        this.$refs["newExamForm"].validate(valid => {
          if (valid) {
            this.doCreate();
          } else {
            return false;
          }
        })
      );
    },
    doCreate() {
      var data = qs.stringify(this.newExamForm);
      this.axios
        .post(this.GLOBAL.BASE_REQUEST_URL + "/createExamination", data)
        .then(result => {
          console.log(result);
          if (result.status.status === "success") {
            this.$message({
              showClose: true,
              message: result.data.message,
              type: result.data.status
            });
          } else {
            this.$message({
              showClose: true,
              message: result.data.status.message,
              type: result.data.status.status
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: "网络错误",
            type: "error"
          });
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
