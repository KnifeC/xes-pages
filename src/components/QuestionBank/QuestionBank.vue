<template>
  <div>
    <el-row>
      <el-col :md="{span:18,offset:3}" style="margin-top: 25px;">
        <el-container>
          <el-aside>
            <el-tabs tab-position="left">
              <el-tab-pane label="你的题库" @tab-click="goRouter()"></el-tab-pane>
              <el-tab-pane label="搜索题库" @tab-click="goRouter()"></el-tab-pane>
              <el-tab-pane label="新建题库" @tab-click="goRouter()"></el-tab-pane>
              <el-tab-pane label="管理题库" @tab-click="goRouter()"></el-tab-pane>
            </el-tabs>
          </el-aside>
          <el-container style="text-align:center">
            <el-main style="maigin-top:100px"><router-view></router-view></el-main>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selfUrl:"",
    };
  },
  methods: {
    goRouter(){

    },
  },
  mounted() {
    this.selfUrl = '/questionbank/'+this.GLOBAL.USER_UUID;
  }
};
</script>

<style scoped>
</style>
