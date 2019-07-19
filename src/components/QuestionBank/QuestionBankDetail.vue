<template>
  <div  v-loading.fullscreen.lock="fullscreenLoading">
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      selfUrl: "",
      fullscreenLoading : false
    };
  },
  methods: {
    
  },
  created() {
    this.selfUrl = "/questionbank/" + this.GLOBAL.USER_UUID;
  }
};
</script>

<style scoped>
</style>
