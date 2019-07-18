<template>
  <div id="app">
    <el-container>
      <el-header>
        <v-navbar></v-navbar>
      </el-header>
    </el-container>
    <router-view></router-view>
    <el-divider></el-divider>
    <el-footer>Footer</el-footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import navbar from "./components/Navbar.vue";

export default {
  name: "app",
  components: {
    "v-navbar": navbar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
</style>
