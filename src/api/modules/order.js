/*
 * @Author: guolongtao
 * @Date: 2019-11-05 21:08:09
 * @LastEditors: guolongtao
 * @LastEditTime: 2019-12-02 16:37:45
 * @FilePath: \web_order_big_data\src\api\modules\order.js
 */
// 地区数据请求
import { post, fetch, patch, put, del } from '../index';
const order = {
    // 获取订单列表
    getOrderList(paramObj) {
        return fetch('/order/public/v1/order/getDemonstrationOrderList', paramObj);
        return fetch('/order/public/v1/order/getDemonstrationOrderList', paramObj);
    },
    // 获取订单详情
    getOrderDetail(paramObj) {
        return fetch('/datacenter/public/v1/alliance/queryUserOrderShareProfit', paramObj);
        return fetch('/datacenter/public/v1/alliance/queryUserOrderShareProfit', paramObj);
    },
};
export default order;