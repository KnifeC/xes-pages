<template>
  <div id="app">
    <el-container>
      <el-header>
        <v-navbar></v-navbar>
      </el-header>
    </el-container>
    <router-view></router-view>

    <el-footer>
      <v-footer class="footer"></v-footer>
    </el-footer>
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
    "v-footer": Footer
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
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 75px;
  /* background: #000; */
}
</style>
