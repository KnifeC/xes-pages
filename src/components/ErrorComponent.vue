<template>
  <div>
    <span class="face">:(</span>
    <p>
      您访问的页面没有找到。
      <br />
      <span><router-link to="/index"> 点击这里可以返回正常的页面 </router-link></span>
      <br />
      <span class="tips">如果您想了解更多信息，则可以稍后在线搜索此错误: 算了你还是别搜了……</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.face {
  font-size: 100px;
}
p {
  font-size: 24px;
  padding: 8px;
  line-height: 40px;
}
.tips {
  font-size: 16px;
}

/*针对小屏幕的优化*/
@media screen and (max-width: 600px) {
  body {
    margin: 0 10px;
  }
  p {
    font-size: 18px;
    line-height: 30px;
  }
  .tips {
    display: inline-block;
    padding-top: 10px;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>  