<template>
  <div>
    <h2>题目详情</h2>
    <h3>题目id-------{{questionuuid}}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionuuid: ""
    };
  },
  method: {},
  mounted() {
    this.questionuuid = this.$route.params.questionid;
  }
};
</script>

<style scoped>
</style>
