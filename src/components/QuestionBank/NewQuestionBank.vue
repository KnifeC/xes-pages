<template>
  <div>
    <el-row :v-loading="loading">
      <el-col :md="{span:10,offset:7}" style="margin-top: 15px;">
        <el-form
          @keyup.enter.native="submit()"
          :model="newQuestionBankForm"
          :rules="newQuestionBankRule"
          ref="newQuestionBankForm"
          class="demo-ruleForm"
        >
          <el-form-item label="题库名" prop="questionBankName">
            <el-input placeholder="请输入题库名" v-model="newQuestionBankForm.questionBankName"></el-input>
          </el-form-item>
          <el-form-item label="可见性" prop="isVisibility">
            <el-select
              v-model="newQuestionBankForm.isVisibility"
              placeholder="请选择可见性"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button style="width:50%" type="primary" @click="submit()">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  data() {
    return {
      loading:false,
      newQuestionBankForm: {
        questionBankName: "",
        isVisibility: "不公开"
      },
      newQuestionBankRule: {
        questionBankName: [
          { required: true, message: "请输入题库名", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "不公开",
          label: "仅自己可见"
        },
        {
          value: "公开",
          label: "所有人可见"
        }
      ]
    };
  },
  methods: {
    submit() {
      this.$refs[newQuestionBankForm].validate(valid => {
        if (valid) {
          data = qs.stringfy(this.newQuestionBankForm);
          this.axios.post(this.GLOBAL.BASE_REQUEST_URL+'createQuestionBank',data).then((result) => {
              console.log(result);
          }).catch((err) => {
              console.log(err);
          });
        } else {
          return false;
        }
      });
    },
    doSubmit(){

    }
  }
};
</script>

<style scoped>
</style>
