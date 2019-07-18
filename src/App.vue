<template>
  <div id="app">
    <el-container>
      <el-header>
        <v-navbar></v-navbar>
      </el-header>
    </el-container>
    <router-view></router-view>
    
    <el-footer><v-footer></v-footer></el-footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "app",
  components: {
    "v-navbar": Navbar,
    "v-footer":Footer,
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
