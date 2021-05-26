<!--
 * @Author: guolongtao
 * @Date: 2019-11-04 13:55:51
 * @LastEditors  : guolongtao
 * @LastEditTime : 2019-12-19 09:51:48
 * @FilePath: \web_order_big_data\src\views\orderlist\orderlist.vue
 -->

<template>
  <div class="order-list">
    <!-- 搜索工具栏 -->
    <div class="tools-container">
      <span>关键字：</span>
      <input type="text" v-model="search_input" placeholder="请输入手机号码" />
      <div class="search-btn" @click="search">搜索</div>
      <div class="reset-btn" @click="reset">重置</div>
    </div>

    <!-- 列表内容 -->
    <div class="list-title">
      <span>商品信息</span>
      <span>消费企业</span>
      <span>订单金额</span>
      <span>状态</span>
      <span>操作</span>
    </div>

    <!-- 列表单项 -->
    <div class="list-item" v-for="(item,index) in orderListArr" :key="index">
      <div class="item-info clear">
        <div class="eq-tip">{{orderType(item.type)}}</div>
        <span>订单编号：{{item.orderSn}}</span>
        <span>订单来源：{{orderOrigin(item.sourceType)}}</span>
        <span>下单时间：{{item.createTime | formatDate}}</span>
      </div>
      <div class="item-content">
        <div class="item-goods">
          <img :src="item.items[0].thumb.original" alt class="item-img" v-if="item.items[0].thumb" />
          <img src="@/assets/images/user_img.png" alt class="item-img" v-if="!item.items[0].thumb" />
          <span>{{item.items[0].goodsName}}</span>
        </div>
        <div>{{item.shopName}}</div>
        <div>¥ {{item.actualPrice}}</div>
        <div>
          <span class="status-span">{{item.statusName}}</span>
        </div>
        <div @click="goDetail(item.orderSn)">订单详情</div>
      </div>
    </div>

    <div class="page-tools">
      <span @click="changePage(curPage-1)">上一页</span>
      <span @click="changePage(curPage+1)">下一页</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_input: "", //查询参数
      search_content: "", //18378318070
      orderListArr: [], //订单列表数组13619892035
      curPage: 1, //当前页码15652090803
      pageSize: 3 //页容量
    };
  },
  computed: {
    // 计算订单应用类型
    orderType(val) {
      return val => {
        switch (val) {
          case -1:
            return "全部";
            break;
          case 1:
            return "门店订单";
            break;
          case 2:
            return "商城订单";
            break;
          case 3:
            return "共享服务";
            break;
          case 5:
            return "酒店";
            break;
          case 6:
            return "门票";
            break;
          case 7:
            return "游戏";
            break;
          case 8:
            return "手机充值";
            break;
          case 9:
            return "电影票";
            break;
          case 10:
            return "演出票";
            break;
          case 11:
            return "加油卡";
            break;
          case 12:
            return "收钱码";
            break;
          case 15:
            return "线上点餐";
            break;
          case 17:
            return "卡券订单";
            break;
          case 19:
            return "设备套餐卡";
            break;

          default:
            return "其他订单";
            break;
        }
      };
    },

    // 计算订单来源类型
    orderOrigin(val) {
      return val => {
        switch (val) {
          case 1:
            return "会员订单";
            break;
          case 2:
            return "推荐订单";
            break;
          case 3:
            return "分红订单";
            break;

          default:
            return "其他订单";
            break;
        }
      };
    }
  },
  mounted() {
    //  获取大屏订单列表
    this.getOrderListBigData();
  },
  methods: {
    // 重置操作
    reset() {
      this.search_input = "";
    },

    // 搜索操作
    search() {
      this.curPage = 1;
      this.getOrderListBigData();
    },
    // 切换分页
    changePage(page) {
      if (page < 1) {
        this.curPage = 1;
        this.$message("已经是第一页了");
        return;
      } else {
        this.curPage = page;
        this.getOrderListBigData();
      }
    },

    // 获取大屏订单列表
    getOrderListBigData() {
      let vm = this;
      let param = {
        goodsId: "",
        nums: "",
        mobile: vm.search_input,
        curPage: vm.curPage,
        pageSize: vm.pageSize
      };
      vm.logistics = true;
      vm.$http.order
        .getOrderList(param)
        .then(res => {
          vm.orderListArr = res.data.list;
        })
        .catch(err => {});
    },

    // 跳转到详情
    goDetail(orderSn) {
      this.$router.push({
        path: "/orderDetail",
        query: {
          orderSn: orderSn
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./orderList.scss";
</style>