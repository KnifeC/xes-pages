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
              <el-menu-item index="search">
                <span>查询考试</span>
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
    // getToken() {
    //   if(this.GLOBAL.USER_UUID!==''){
    //     this.selfUrl = "/questionbank/" + this.GLOBAL.USER_UUID;
    //     this.$router.push(this.selfUrl);
    //     // console.log('通过gettoken挂载url');
    //     return;
    //   }
    //   //下面这个获取token好像有没有都不影响——keshane
    //   this.fullscreenLoading = true;
    //   this.axios
    //     .get(this.GLOBAL.BASE_REQUEST_URL + "/gettoken")
    //     .then(response => {
    //       if (response.data.status.status === "success") {
    //         this.GLOBAL.USER_NAME = response.data.user.username;
    //         this.GLOBAL.USER_UUID = response.data.user.userUuid;
    //         this.GLOBAL.USER_EMAIL = response.data.user.email;
    //         this.GLOBAL.UESR_TYPE = response.data.user.type;
    //       }
    //       this.fullscreenLoading = false;
    //     })
    //     .catch(err => {
    //       this.fullscreenLoading = false;
    //     });
    // }
  },
  mounted() {
    // this.selfUrl = "/questionbank/" + this.GLOBAL.USER_UUID;
    // console.log('通过gettoken挂载url');
  }
};
</script>

<style scoped>
</style>
