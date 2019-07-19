<template>
  <div>
    <el-row>
      <el-col :md="{span:18,offset:3}" style="margin-top: 25px;">
        <el-container>
          <el-aside>
            <el-menu class="el-menu-vertical-demo" router="true">
              <el-menu-item :index="selfUrl">
                <!-- <i class="el-icon-setting"></i> -->
                <span slot="title">个人题库</span>
              </el-menu-item>
              <el-menu-item index="search">
                <!-- <i class="el-icon-setting"></i> -->
                <span>搜索题库</span>
              </el-menu-item>
              <el-menu-item index="new">
                <!-- <i class="el-icon-setting"></i> -->
                <span slot="title">新建题库</span>
              </el-menu-item>
            </el-menu>
          </el-aside>

          <el-container :md="{span:18,offset:3}">
            <el-main style="maigin-top:100px">
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
      selfUrl: ""
    };
  },
  methods: {},
  updated() {
    this.selfUrl = this.GLOBAL.USER_UUID;
    // alert(this.selfUrl);
  }
};
</script>

<style scoped>
</style>
