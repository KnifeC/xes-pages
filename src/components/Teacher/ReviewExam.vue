<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-row>
      <el-col :md="{span:18,offset:3}" style="margin-top: 25px;">
        <el-container>
          <el-aside>
            <el-menu class="el-menu-vertical-demo" router="true">
              <el-menu-item :index="selfUrl" @click="getToken()">
                <span slot="title">管理考试</span>
              </el-menu-item>
              <el-menu-item index="new">
                <span>创建考试</span>
              </el-menu-item>
            </el-menu>
          </el-aside>

          <el-container :md="{span:18,offset:3}">
            <el-main>
              <router-view></router-view>
            </el-main>
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
      selfUrl: "",
      fullscreenLoading: false
    };
  },
  methods: {
    
    
  },
  mounted() {
    this.selfUrl = "/teacher/" + this.GLOBAL.USER_UUID;
    // console.log('通过gettoken挂载url');
  }
};
</script>

<style scoped>
</style>
