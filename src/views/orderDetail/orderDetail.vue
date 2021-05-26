<!--
 * @Author: guolongtao
 * @Date: 2019-11-04 16:19:06
 * @LastEditors  : guolongtao
 * @LastEditTime : 2019-12-25 10:11:12
 * @FilePath: \web_order_big_data\src\views\orderDetail\orderDetail.vue
 -->

<template>
  <div class="order-detail">
    <!-- 卡片容器 -->
    <div class="card-container">
      <!-- 用户信息 -->
      <div class="card-user">
        <div class="card-title">用户信息</div>
        <div class="user-container">
          <img
            src="@/assets/images/user_img.png"
            v-if="!userInfo.logo||!userInfo.logo.original"
            alt
          />
          <img :src="userInfo.logo.original" v-if="userInfo.logo&&userInfo.logo.original" alt />
        </div>
        <ul>
          <li>
            <label>昵 称</label>：
            <span>{{userInfo.nickname}}</span>
          </li>
          <li>
            <label>姓 名</label>：
            <span>{{userInfo.realName?userInfo.realName:'****'}}</span>
          </li>
          <li>
            <label>手机号码</label>：
            <span>{{userInfo.mobile}}</span>
          </li>
        </ul>
      </div>

      <!-- 订单信息 -->
      <div class="card-order">
        <div class="card-title">订单信息</div>
        <div class="total-income">
          <img src="@/assets/images/total_circle_left.png" alt />
          <span>收益总额(元)</span>
          <img src="@/assets/images/total_circle_right.png" alt />
        </div>

        <!-- 数字区域 -->
        <div class="num-container">
          <span v-for="(item,index) in profitTotalPre" :key="index">{{item}}</span>
          <i></i>
          <span v-for="(subItem,subIndex) in profitTotalAft" :key="subIndex+4">{{subItem}}</span>
        </div>

        <!-- 光线分割 -->
        <img src="@/assets/images/line.png" class="line-img" alt />

        <!-- 订单总量 -->
        <div class="total-order">
          <span>订单总额(元)</span>
          <div>{{getFloat2(orderInfo.orderPrice)}}</div>
        </div>

        <!-- 消费信息 -->
        <ul class="consume-info">
          <li>
            <label>消费门店</label>：
            <span>{{orderInfo.consumptionStore}}</span>
          </li>
          <li>
            <label>消费区域</label>：
            <span>{{orderInfo.consumptionArea}}</span>
          </li>
          <li>
            <label>消费时间</label>：
            <span>{{orderInfo.consumptionTime | formatDate}}</span>
          </li>
        </ul>
      </div>

      <!-- 雷达视图 -->
      <div class="card-view">
        <div id="radarView" style="width: 32.4479vw;height: 31.0185vh;"></div>
      </div>
    </div>

    <!-- 奖金池 -->
    <div class="bonus-pools">
      <div class="bonus-pools-title">消费强国 奖励消费</div>
      <!-- 奖金池左边 -->
      <div class="bonus-pools-left">
        <div class="icon-item">
          <img src="@/assets/images/管理中心.png" class="role-icon" alt />
          <countTo
            :startVal="startVal"
            :endVal="Number(areaOperatorProfit.profit)"
            :duration="duration"
            prefix="+"
            :decimals="decimals"
            :autoplay="true"
            v-if="areaOperatorProfit.profit!=0"
          ></countTo>
          <img
            src="@/assets/images/箭头动画.gif"
            class="animate-img"
            v-if="areaOperatorProfit.profit!=0"
            alt
          />
          <p>区级管理中心</p>
          <p
            class="p-name"
            v-if="areaOperatorProfit.name"
          >（{{sliceString(areaOperatorProfit.name)}}）</p>
          <div class="arrow-img">
            <span>开拓服务</span>
            <img src="@/assets/images/arrow-up.png" alt />
          </div>
        </div>
        <div class="icon-item" style="left: 11.9792vw;">
          <img src="@/assets/images/管理中心.png" class="role-icon" alt />
          <countTo
            :startVal="startVal"
            :endVal="Number(provinceOperatorProfit.profit)"
            :duration="duration"
            prefix="+"
            :decimals="decimals"
            :autoplay="true"
            v-if="provinceOperatorProfit.profit!=0"
          ></countTo>
          <img
            src="@/assets/images/箭头动画.gif"
            class="animate-img"
            v-if="provinceOperatorProfit.profit!=0"
            alt
          />
          <p>省级管理中心</p>
          <p
            class="p-name"
            v-if="provinceOperatorProfit.name"
          >（{{sliceString(provinceOperatorProfit.name)}}）</p>
          <div class="arrow-img arrow-img-host">
            <span>本地运营</span>
            <img src="@/assets/images/arrow-bottom.png" alt />
          </div>
        </div>
        <div class="icon-item" style="top: 32.3148vh;">
          <img src="@/assets/images/行业平台.png" class="role-icon" alt />
          <countTo
            :startVal="startVal"
            :endVal="Number(platformProfit.profit)"
            :duration="duration"
            prefix="+"
            :decimals="decimals"
            :autoplay="true"
            v-if="platformProfit.profit!=0"
          ></countTo>
          <img
            src="@/assets/images/箭头动画.gif"
            class="animate-img"
            v-if="platformProfit.profit!=0"
            alt
          />
          <p>行业平台</p>
          <p class="p-name" v-if="platformProfit.name">（{{sliceString(platformProfit.name)}}）</p>
          <div class="arrow-img">
            <span>开拓管理</span>
            <img src="@/assets/images/arrow-up.png" alt />
          </div>
        </div>
        <div class="icon-item" style="top: 32.3148vh;left: 11.9792vw;">
          <img src="@/assets/images/联合运营商.png" class="role-icon" alt />
          <countTo
            :startVal="startVal"
            :endVal="Number(channelProfit.profit)"
            :duration="duration"
            prefix="+"
            :decimals="decimals"
            :autoplay="true"
            v-if="channelProfit.profit!=0"
          ></countTo>
          <img
            src="@/assets/images/箭头动画.gif"
            class="animate-img"
            v-if="channelProfit.profit!=0"
            alt
          />
          <p>联合运营商</p>
          <p class="p-name" v-if="channelProfit.name">（{{sliceString(channelProfit.name)}}）</p>
          <div class="arrow-img arrow-img-rotate">
            <span>开拓管理</span>
            <img src="@/assets/images/arrow-up.png" alt />
          </div>
        </div>
        <div class="icon-item" style="top: 21.2593vh;left: 19.7917vw;">
          <img src="@/assets/images/联盟企业.png" class="role-icon" alt />
          <countTo
            :startVal="startVal"
            :endVal="Number(allianceProfit.profit)"
            :duration="duration"
            prefix="+"
            :decimals="decimals"
            :autoplay="true"
            v-if="allianceProfit.profit!=0"
          ></countTo>
          <img
            src="@/assets/images/箭头动画.gif"
            class="animate-img"
            v-if="allianceProfit.profit!=0"
            alt
          />
          <p>联盟企业</p>
          <p class="p-name" v-if="allianceProfit.name">（{{sliceString(allianceProfit.name)}}）</p>
          <div class="arrow-img arrow-img-long" v-if="profitType===2||profitType===3">
            <span>终身确权</span>
            <img src="@/assets/images/形状1612.png" alt />
          </div>
          <div class="arrow-img arrow-img-long arrow-img-long-recommend" v-if="profitType===1">
            <span>推荐</span>
            <img src="@/assets/images/形状1612.png" alt />
          </div>
        </div>
        <div class="back-btn" @click="closeWindow">返回</div>
      </div>

      <!-- 奖金池中间 -->
      <div class="bonus-pools-middle">
        <div class="bonus-pools-img">
          <p>奖金池</p>
          <div class="bonus-pools-arrow">
            <img src="@/assets/images/箭头动画.gif" v-if="bonusPool!=0" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(bonusPool)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="bonusPool!=0"
            ></countTo>
          </div>
        </div>
        <div class="icon-list-order">
          <!-- 店长 -->
          <div class="icon-item" v-if="profitType===2||profitType===3">
            <img src="@/assets/images/店长.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(recommendManagerProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="recommendManagerProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="recommendManagerProfit.profit!=0"
              alt
            />
            <p>店长</p>
            <p
              class="p-name"
              v-if="recommendManagerProfit.name"
            >（{{sliceString(recommendManagerProfit.name)}}）</p>
            <div class="arrow-img">
              <span>管理</span>
              <img src="@/assets/images/arrow-up.png" alt />
            </div>
          </div>
          <!-- 店员 -->
          <div class="icon-item" v-if="profitType===2||profitType===3">
            <img src="@/assets/images/店员.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(recommendEmployeeProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="recommendEmployeeProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="recommendEmployeeProfit.profit!=0"
              alt
            />
            <p>店员</p>
            <p
              class="p-name"
              v-if="recommendEmployeeProfit.name"
            >（{{sliceString(recommendEmployeeProfit.name)}}）</p>
            <div class="arrow-img">
              <span>推荐</span>
              <img src="@/assets/images/arrow-bottom.png" style="transform: rotate(150deg);" alt />
            </div>
          </div>
          <div class="icon-item" v-if="profitType===8"></div>
          <div class="icon-item" v-if="profitType===8"></div>
          <!-- 用户 -->
          <div class="icon-item" v-if="profitType===2||profitType===3||profitType===8">
            <img src="@/assets/images/用户.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(userProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="userProfit.profit!=0"
            ></countTo>
            <img src="@/assets/images/箭头动画.gif" class="animate-img" v-if="userProfit.profit!=0" alt />
            <p>用户</p>
            <p class="p-name" v-if="userProfit.name">（{{sliceString(userProfit.name)}}）</p>
            <div class="arrow-img" v-if="profitType===2||profitType===3">
              <span>销售</span>
              <img src="@/assets/images/arrow-up.png" alt />
            </div>
          </div>
          <div class="icon-item" v-if="profitType===8"></div>
          <div class="icon-item" v-if="profitType===8"></div>
          <!-- 用户 -->
          <div class="icon-item icon-item-middle" v-if="profitType===1">
            <img src="@/assets/images/用户.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(userProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="userProfit.profit!=0"
            ></countTo>
            <img src="@/assets/images/箭头动画.gif" class="animate-img" v-if="userProfit.profit!=0" alt />
            <p>用户</p>
            <p class="p-name" v-if="userProfit.name">（{{sliceString(userProfit.name)}}）</p>
            <div class="arrow-img arrow-no-right">
              <span>消费￥{{payPrice}}</span>
              <img src="@/assets/images/arrow-up.png" alt />
            </div>
          </div>
          <!-- 联盟企业 -->
          <div class="icon-item icon-item-right" v-if="profitType===1">
            <img src="@/assets/images/联盟企业.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(consumptionAllianceProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="consumptionAllianceProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="consumptionAllianceProfit.profit!=0"
              alt
            />
            <p>联盟企业</p>
            <p
              class="p-name"
              v-if="consumptionAllianceProfit.name"
            >（{{consumptionAllianceProfit.name}}）</p>
          </div>
          <!-- 店员 -->
          <div class="icon-item" v-if="profitType===2||profitType===3">
            <img src="@/assets/images/店员.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(marketEmployeeProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="marketEmployeeProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="marketEmployeeProfit.profit!=0"
              alt
            />
            <p>店员</p>
            <p
              class="p-name"
              v-if="marketEmployeeProfit.name"
            >（{{sliceString(marketEmployeeProfit.name)}}）</p>
            <div class="arrow-img">
              <span>管理</span>
              <img src="@/assets/images/arrow-bottom.png" style="transform: rotate(150deg);" alt />
            </div>
          </div>
          <!-- 店长 -->
          <div class="icon-item" v-if="profitType===2||profitType===3">
            <img src="@/assets/images/店长.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(marketManagerProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="marketManagerProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="marketManagerProfit.profit!=0"
              alt
            />
            <p>店长</p>
            <p
              class="p-name"
              v-if="marketManagerProfit.name"
            >（{{sliceString(marketManagerProfit.name)}}）</p>
          </div>
        </div>
        <div class="icon-item" style="top: 15.2778vh;left: 31.625vw;" v-if="profitType===2">
          <img src="@/assets/images/共享设备.png" class="role-icon" alt />
          <p>{{profitType===2?'共享设备':'供应链云商城'}}</p>
          <p class="p-name" v-if="goodsName" style="bottom: -2.9259vh;">（{{sliceString(goodsName)}}）</p>
          <div class="arrow-img arrow-img-pay">
            <span>消费￥{{payPrice}}</span>
            <img src="@/assets/images/arrow-bottom.png" alt />
          </div>
          <div class="arrow-img arrow-img-run">
            <span>运营服务</span>
            <img src="@/assets/images/arrow-bottom.png" alt />
          </div>
          <div class="arrow-img arrow-img-supply">
            <span>供应链</span>
            <img src="@/assets/images/arrow-up.png" alt />
          </div>
        </div>
        <div class="icon-item" style="top: 15.2778vh;left: 31.625vw;" v-if="profitType===3">
          <img src="@/assets/images/供应链云商城.png" class="role-icon" alt />
          <p>{{profitType===2?'共享设备':'供应链云商城'}}</p>
          <p class="p-name" v-if="goodsName">（{{sliceString(goodsName)}}）</p>
          <div class="arrow-img arrow-img-pay">
            <span>消费￥{{payPrice}}</span>
            <img src="@/assets/images/arrow-bottom.png" alt />
          </div>
          <div class="arrow-img arrow-img-run">
            <span>运营服务</span>
            <img src="@/assets/images/arrow-bottom.png" alt />
          </div>
          <div class="arrow-img arrow-img-supply">
            <span>供应链</span>
            <img src="@/assets/images/arrow-up.png" alt />
          </div>
        </div>
      </div>

      <!-- 奖金池右边 -->
      <div class="bonus-pools-right" v-if="profitType===2||profitType===3">
        <div
          class="icon-list-order"
          :style="profitType===3?'top: 10.0926vh;width:80%;':'top: 10.0926vh;'"
        >
          <div class="icon-item" v-if="profitType===2">
            <img src="@/assets/images/联营企业.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(chainsProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="chainsProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="chainsProfit.profit!=0"
              alt
            />
            <p>联营企业</p>
            <p class="p-name" v-if="chainsProfit.name">（{{sliceString(chainsProfit.name)}}）</p>
          </div>
          <div class="icon-item" v-if="profitType===2">
            <img src="@/assets/images/事业合伙人.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(systemProviderProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="systemProviderProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="systemProviderProfit.profit!=0"
              alt
            />
            <p>事业合伙人</p>
            <p
              class="p-name"
              v-if="systemProviderProfit.name"
            >（{{sliceString(systemProviderProfit.name)}}）</p>
          </div>
          <div class="icon-item" v-if="profitType===3">
            <img src="@/assets/images/区域合伙人.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(areaAgentProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="areaAgentProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="areaAgentProfit.profit!=0"
              alt
            />
            <p>区域合伙人</p>
            <p class="p-name" v-if="areaAgentProfit.name">（{{sliceString(areaAgentProfit.name)}}）</p>
          </div>
          <div class="icon-item" v-if="profitType===2">
            <img src="@/assets/images/金融投资商.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(investorProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="investorProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="investorProfit.profit!=0"
              alt
            />
            <p>金融投资商</p>
            <p class="p-name" v-if="investorProfit.name">（{{sliceString(investorProfit.name)}}）</p>
          </div>
          <div class="icon-item" v-if="profitType===2">
            <img src="@/assets/images/设备运营公司.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(equipOperationProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="equipOperationProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="equipOperationProfit.profit!=0"
              alt
            />
            <p>设备运营公司</p>
            <p
              class="p-name"
              v-if="equipOperationProfit.name"
            >（{{sliceString(equipOperationProfit.name)}}）</p>
          </div>
          <div class="icon-item" v-if="profitType===3">
            <img src="@/assets/images/供应链运营公司.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(supplyChainOperationProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="supplyChainOperationProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="supplyChainOperationProfit.profit!=0"
              alt
            />
            <p>供应链运营公司</p>
            <p
              class="p-name"
              v-if="equipOperationProfit.name"
            >（{{sliceString(equipOperationProfit.name)}}）</p>
          </div>
          <div class="icon-item" v-if="profitType===3">
            <img src="@/assets/images/供应商.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(supplyProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="supplyProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="supplyProfit.profit!=0"
              alt
            />
            <p>供应商</p>
            <p class="p-name" v-if="supplyProfit.name">（{{sliceString(supplyProfit.name)}}）</p>
          </div>
        </div>
        <div class="icon-list-order">
          <div class="icon-item">
            <img src="@/assets/images/品牌商.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(brandProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="brandProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="brandProfit.profit!=0"
              alt
            />
            <p>品牌商</p>
            <p class="p-name" v-if="brandProfit.name">（{{sliceString(brandProfit.name)}}）</p>
          </div>
          <div class="icon-item">
            <img src="@/assets/images/生产商.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(producerProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="producerProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="producerProfit.profit!=0"
              alt
            />
            <p>生产商</p>
            <p class="p-name" v-if="producerProfit.name">（{{sliceString(producerProfit.name)}}）</p>
          </div>
          <div class="icon-item">
            <img src="@/assets/images/集采商.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(dealerProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="dealerProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="dealerProfit.profit!=0"
              alt
            />
            <p>集采商</p>
            <p class="p-name" v-if="dealerProfit.name">（{{sliceString(dealerProfit.name)}}）</p>
          </div>
          <div class="icon-item">
            <img src="@/assets/images/独角兽平台.png" class="role-icon" alt />
            <countTo
              :startVal="startVal"
              :endVal="Number(financierProfit.profit)"
              :duration="duration"
              prefix="+"
              :decimals="decimals"
              :autoplay="true"
              v-if="financierProfit.profit!=0"
            ></countTo>
            <img
              src="@/assets/images/箭头动画.gif"
              class="animate-img"
              v-if="financierProfit.profit!=0"
              alt
            />
            <p>独角兽平台</p>
            <p class="p-name" v-if="financierProfit.name">（{{sliceString(financierProfit.name)}}）</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import countTo from "vue-count-to";
var timer;
export default {
  data() {
    return {
      startVal: 0,
      endVal: 3.7,
      decimals: 2,
      duration: 1000,
      goodsName: "", //商品名称
      payPrice: "", //消费金额
      userInfo: {}, //用户信息对象
      orderInfo: {}, //订单信息对象
      userFundInfo: {}, //雷达图-个人值
      channelMemberDataInfo: {}, //雷达图-平台平均值
      bonusPool: "0.01", //奖金池
      areaOperatorProfit: {}, //区级管理中心分润信息
      provinceOperatorProfit: {}, //省级管理中心分润信息
      platformProfit: {}, //行业平台分润信息
      channelProfit: {}, //联合运营商分润信息
      allianceProfit: {}, //联盟企业分润信息
      userProfit: {}, //用户分润分润信息
      recommendManagerProfit: {}, //推荐店长分润信息
      recommendEmployeeProfit: {}, //推荐店员分润信息
      marketManagerProfit: {}, //销售店长分润信息
      marketEmployeeProfit: {}, //销售店员分润信息
      brandProfit: {}, //品牌商分润信息
      producerProfit: {}, //生产商分润信息
      dealerProfit: {}, //集采商分润信息
      financierProfit: {}, //独角兽平台分润信息
      areaAgentProfit: {}, //区域合伙人分润信息
      equipOperationProfit: {}, //设备运营公司分润信息
      supplyProfit: {}, //供应商分润信息
      chainsProfit: {}, //联营企业分润信息
      systemProviderProfit: {}, //事业合伙人(系统服务商)分润信息
      investorProfit: {}, //金融投资商(投资商)分润信息
      consumptionAllianceProfit: {}, //用户消费的联盟企业分润信息
      supplyChainOperationProfit: {}, //供应链运营公司分润信息
      supplyChainProfitProfit: {}, //供应链云商城分润信息
      profitType: null, //分润类型 规则:1产业联盟,2共享设备,3供应链商城
      orderSn: "", //订单编号
      profitTotalPre: "", //收益总额(元)小数点前
      profitTotalAft: "" //收益总额(元)小数点后
    };
  },
  computed: {
    // 保留两位小数
    getFloat2(x) {
      return x => {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf(".");
        if (rs < 0) {
          rs = s.length;
          s += ".";
        }
        while (s.length <= rs + 2) {
          s += "0";
        }
        return s;
      };
    },

    // 省略字符截取
    sliceString(val) {
      return val => {
        let string = "";
        if (val.length > 5) {
          string = val.slice(0, 5) + "...";
        } else {
          string = val;
        }
        return string;
      };
    }
  },
  components: { countTo },
  mounted() {
    this.orderSn = this.$route.query.orderSn;
    this.is_self = this.$route.query.is_self;
    if (this.is_self) {
      let data = JSON.parse(this.$route.query.data);
      console.log(data);
      this.userInfo = data.userInfo;
      this.orderInfo = data.orderInfo;
      this.goodsName = data.goodsName;
      this.payPrice = data.payPrice;
      this.profitType = data.profitType;
      this.userProfit = data.userProfit;
      this.userFundInfo = data.userFundInfo;
      this.channelMemberDataInfo = data.channelMemberDataInfo;
      this.bonusPool = data.bonusPool;
      this.areaOperatorProfit = data.areaOperatorProfit;
      this.provinceOperatorProfit = data.provinceOperatorProfit;
      this.platformProfit = data.platformProfit;
      this.channelProfit = data.channelProfit;
      this.allianceProfit = data.allianceProfit;
      this.recommendManagerProfit = data.recommendManagerProfit;
      this.recommendEmployeeProfit = data.recommendEmployeeProfit;
      this.marketManagerProfit = data.marketManagerProfit;
      this.marketEmployeeProfit = data.marketEmployeeProfit;
      this.brandProfit = data.brandProfit;
      this.producerProfit = data.producerProfit;
      this.dealerProfit = data.dealerProfit;
      this.financierProfit = data.financierProfit;
      this.areaAgentProfit = data.areaAgentProfit;
      this.equipOperationProfit = data.equipOperationProfit;
      this.supplyProfit = data.supplyProfit;
      this.chainsProfit = data.chainsProfit;
      this.systemProviderProfit = data.systemProviderProfit;
      this.investorProfit = data.investorProfit;
      this.consumptionAllianceProfit = data.consumptionAllianceProfit;
      this.supplyChainOperationProfit = data.supplyChainOperationProfit;
      this.renderRadarView();
      this.formatProfitTotal(this.getFloat2(this.orderInfo.profitTotal));
    } else {
      // 调用获取大屏订单详情
      this.getOrderDetailBigData();
    }
  },
  beforeDestroy() {
    // 清除定时器
    // clearInterval(timer);
  },
  methods: {
    /**
     * @description: 关闭当前页面
     * @param {type}
     * @return:
     */
    closeWindow() {
      if (this.is_self) {
        window.close();
      } else {
        this.$router.go(-1);
      }
    },

    // 获取大屏订单详情
    getOrderDetailBigData(orderSn) {
      let vm = this;
      let param = {
        orderSn: this.orderSn
      };
      vm.logistics = true;
      vm.$http.order
        .getOrderDetail(param)
        .then(res => {
          this.userInfo = res.data.userInfo;
          this.orderInfo = res.data.orderInfo;
          this.goodsName = res.data.goodsName;
          this.payPrice = res.data.payPrice;
          this.profitType = res.data.profitType;
          this.userProfit = res.data.userProfit;
          this.userFundInfo = res.data.userFundInfo;
          this.channelMemberDataInfo = res.data.channelMemberDataInfo;
          this.bonusPool = res.data.bonusPool;
          this.areaOperatorProfit = res.data.areaOperatorProfit;
          this.provinceOperatorProfit = res.data.provinceOperatorProfit;
          this.platformProfit = res.data.platformProfit;
          this.channelProfit = res.data.channelProfit;
          this.allianceProfit = res.data.allianceProfit;
          this.recommendManagerProfit = res.data.recommendManagerProfit;
          this.recommendEmployeeProfit = res.data.recommendEmployeeProfit;
          this.marketManagerProfit = res.data.marketManagerProfit;
          this.marketEmployeeProfit = res.data.marketEmployeeProfit;
          this.brandProfit = res.data.brandProfit;
          this.producerProfit = res.data.producerProfit;
          this.dealerProfit = res.data.dealerProfit;
          this.financierProfit = res.data.financierProfit;
          this.areaAgentProfit = res.data.areaAgentProfit;
          this.equipOperationProfit = res.data.equipOperationProfit;
          this.supplyProfit = res.data.supplyProfit;
          this.chainsProfit = res.data.chainsProfit;
          this.systemProviderProfit = res.data.systemProviderProfit;
          this.investorProfit = res.data.investorProfit;
          this.consumptionAllianceProfit = res.data.consumptionAllianceProfit;
          this.supplyChainOperationProfit = res.data.supplyChainOperationProfit;
          this.renderRadarView();
          this.formatProfitTotal(this.getFloat2(this.orderInfo.profitTotal));
        })
        .catch(err => {});
    },

    // 格式化Number
    formatNumber(val) {
      let obj = {
        profit: Number(val.profit),
        name: val.name
      };
      return obj;
    },

    // 格式化收益总额
    formatProfitTotal(val) {
      let pre = val.split(".")[0];
      var temp = pre;
      let after = val.split(".")[1];
      for (let index = pre.length; index < 4; index++) {
        temp = "0" + temp;
      }
      this.profitTotalPre = temp;
      this.profitTotalAft = after;
    },

    // 渲染雷达视图
    renderRadarView() {
      var myChart = echarts.init(document.getElementById("radarView"));
      var personData = [
        this.userFundInfo.orderNums,
        this.userFundInfo.lotteryNum,
        this.userFundInfo.lotteryBonus,
        this.userFundInfo.income,
        this.userFundInfo.availablePoints,
        this.userFundInfo.availableBalance,
        this.userFundInfo.price,
        this.userFundInfo.totalOrder
      ];
      var platformData = [
        this.channelMemberDataInfo.avgOrderNums,
        this.channelMemberDataInfo.avgLotteryNum,
        this.channelMemberDataInfo.avgLotteryBonus,
        this.channelMemberDataInfo.avgIncome,
        this.channelMemberDataInfo.avgAvailablePoints,
        this.channelMemberDataInfo.avgBalance,
        this.channelMemberDataInfo.avgAvgPrice,
        this.channelMemberDataInfo.avgTotalOrder
      ];
      let arr = personData.concat(platformData);
      let maxNum = Math.max.apply(null, arr);
      var base = document.documentElement.clientWidth / 1920;
      // let maxNum = null;
      console.log(arr);

      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: 39 * base,
          bottom: 35 * base,
          itemWidth: 8 * base,
          itemHeight: 8 * base,
          orient: "vertical",
          icon: "circle",
          textStyle: {
            color: "#7EFAFC"
          },
          data: [
            {
              name: "个人统计"
            },
            {
              name: "平台平均值"
            }
          ]
        },
        color: ["#F14C72", "#FFB745"],
        radar: [
          {
            indicator: [
              { text: "订单总数", max: maxNum, color: "#fff" },
              { text: "中奖次数", max: maxNum, color: "#fff" },
              { text: "中奖金额", max: maxNum, color: "#fff" },
              { text: "收益", max: maxNum, color: "#fff" },
              { text: "信用积分", max: maxNum, color: "#fff" },
              { text: "通用积分", max: maxNum, color: "#fff" },
              { text: "客单价", max: maxNum, color: "#fff" },
              { text: "订单总额", max: maxNum, color: "#fff" }
            ],
            center: ["50%", "50%"],
            radius: 100 * base,
            symbolRotate: 55 * base,
            axisLabel: {
              textStyle: {
                color: "red", //更改坐标轴文字颜色
                fontSize: 22 //更改坐标轴文字大小
              }
            }
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            label: {
              fontSize: 20,
              color: "red"
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  opacity: 0.2
                }
              }
            },
            startAngle: 90,
            data: [
              {
                value: personData,
                name: "个人统计"
              },
              {
                value: platformData,
                name: "平台平均值"
              }
            ]
          }
        ]
      };
      window.onresize = function() {
        myChart.resize();
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./orderDetail.scss";
</style>