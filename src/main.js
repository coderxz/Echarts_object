/*
 * @Author: guolongtao
 * @Date: 2019-09-16 11:07:43
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-24 15:17:05
 * @FilePath: \web_order_big_data\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './styles/index.scss';
import store from './store';
import './assets/js/filter';
import moment from 'moment'
import echarts from 'echarts';
// import './assets/js/wy_rem'
Vue.config.productionTip = false;
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts;
import { http } from '@/api/api';
Vue.prototype.$http = http;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});