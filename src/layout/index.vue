<!--
 * @Author: guolongtao
 * @Date: 2019-09-17 11:59:04
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-22 14:51:43
 * @FilePath: \web_order_big_data\src\layout\index.vue
 -->
<template>
  <div class="layout">
    <div class="header">
      <div class="title" @click="goBack">{{title_name}}</div>
    </div>
    <div class="container">
      <keep-alive>
        <!--这里是会被缓存的组件-->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <!--这里是不会被缓存的组件-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title_name: "订单列表"
    };
  },
  created() {
    this.title_name =
      this.$route.path === "/orderList" ? "订单列表" : "订单详情";
  },
  watch: {
    $route(to, from) {
      if (to.path === "/orderList") {
        this.title_name = "订单列表";
      } else if (to.path === "/orderDetail") {
        this.title_name = "订单详情";
      }
    }
  },
  methods: {
    // 返回列表页面
    goBack() {
      if (this.$route.path === "/orderDetail") {
        this.$router.go(-1);
      }
    }
  }
};
  // let cityCode = "china";
  // var planePath ="path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705";
  // var color = ["red", "#a6c84c", "#ffa022"];
  // var HZData = [
  //     [{ name: "杭州" }, { name: "湖北", value: 95,lineStyle: '#4ab2e5'}],
  //     [{ name: "杭州" }, { name: "山西", value: 90,lineStyle: '#4fb6d2' }],
  //     [{ name: "杭州" }, { name: "辽宁", value: 85,lineStyle: '#52b9c7'}],
  //     [{ name: "杭州" }, { name: "黑龙江", value: 80,lineStyle: '#5abead'}],
  //     [{ name: "杭州" }, { name: "广东", value: 75,lineStyle: '#f34e2b'}],
  //     [{ name: "杭州" }, { name: "河北", value: 70,lineStyle: '#f56321'}],
  //     // [{ name: "杭州" }, { name: "上海", value: 65 }],
  //     // [{ name: "杭州" }, { name: "江苏", value: 60 }],
  //     // [{ name: "杭州" }, { name: "福建", value: 55 }],
  //     // [{ name: "杭州" }, { name: "宁夏", value: 50 }],
  //     [{ name: "杭州" }, { name: "北京", value: 45 ,lineStyle: '#f56f1c'}],
  //     [{ name: "杭州" }, { name: "陕西", value: 40,lineStyle: '#f58414'}],
  //     [{ name: "杭州" }, { name: "海南", value: 35 ,lineStyle: '#f56f1c'}],
  //     [{ name: "杭州" }, { name: "新疆", value: 30 ,lineStyle: '#f56321'}],
  //     [{ name: "杭州" }, { name: "云南", value: 25 ,lineStyle: '#4ab2e5'}],
  //     [{ name: "杭州" }, { name: "重庆", value: 20 ,lineStyle: '#e7ab0b'}],
  //     [{ name: "杭州" }, { name: "吉林", value: 15 ,lineStyle: '#f58414'}],
  //     [{ name: "杭州" }, { name: "安徽", value: 5 ,lineStyle: '#f58f0e'}],
  // ];
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
