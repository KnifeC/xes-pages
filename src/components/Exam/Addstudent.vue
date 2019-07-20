<template>
  <div>
    <el-row>
      <el-col :md="{span:12,offset:6}" style="margin-top: 25px;">
          <el-form-item label="考试名称" prop="examinationName">
             <el-input v-model="input" placeholder="请输入内容"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>