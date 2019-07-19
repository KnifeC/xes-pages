<template>
  <div>
    <!-- <el-row>
    <el-col style="margin-top: 15px;">-->
    <el-card shadow="hover" style="margin-top:25px">
      <el-row>
        <el-col :md="10" >
          <p>{{itemdata.questionBankName}}</p>
        </el-col>
        <el-col :md="8" >
          <p>创建者:{{itemdata.ownerName}}</p>
        </el-col>
        <el-col :md="6">
          <el-button style="float: right; padding: 3px 0" type="text" @click="goDetail()">查看详情</el-button>
        </el-col>
      </el-row>
      <!-- <el-divider></el-divider>
      <el-row>{{itemdata.questionContent}}</el-row>-->
    </el-card>
    <!-- </el-col>
    </el-row>-->
  </div>
</template>


<script>
export default {
  data() {
    return {
      path: ""
    };
  },
  props: {
    itemdata: Object
  },
  methods: {
    goDetail() {
      this.$router.push({
        path: "/questionbank/detail/" + this.itemdata.questionBankId
      });
    }
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style scoped>
</style>

