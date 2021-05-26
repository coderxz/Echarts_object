<!--
 * @Author: guolongtao
 * @Date: 2019-09-11 15:52:03
 * @LastEditors: guolongtao
 * @LastEditTime: 2019-11-28 14:46:22
 * @FilePath: \web_order_big_data\src\App.vue
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
};
</script>
<style lang="scss">
@import "./styles/base-color.scss";
</style>
