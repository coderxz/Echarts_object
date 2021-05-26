/*
 * @Author: guolongtao
 * @Date: 2019-09-16 11:07:43
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-22 10:07:02
 * @FilePath: \村医大屏数据展示\src\router\index.js
 */
import Vue from 'vue';
import Router from 'vue-router';
import chinaMap from '../views/chinaMap/index.vue'
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        component: chinaMap,
        // redirect: '/',
        // component: () =>
        //     import('@/layout/index'),
        // children: [
        //     {
        //         path: '/orderList',
        //         name: '订单列表',
        //         meta: {
        //             keepAlive: true //需要被缓存的组件
        //         },
        //         component: () =>
        //             import('@/views/orderList/orderList'),
        //     },
        //     {
        //         path: '/orderDetail',
        //         name: '订单详情',
        //         meta: {
        //             keepAlive: false //需要被缓存的组件
        //         },
        //         component: () =>
        //             import('@/views/orderDetail/orderDetail'),
        //     }
        // ]
    },

    ],
});