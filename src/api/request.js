/*
 * @Author: guolongtao
 * @Date: 2019-09-16 11:07:43
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-22 09:46:16
 * @FilePath: \web_order_big_data\src\api\request.js
 */
import axios from "axios";
import store from "@/store";
import router from "../router/index";
import md5 from 'js-md5'
import "../assets/js/base";

// 创建axios实例
const service = axios.create({
    baseURL: window.winConst.baseURL, //开发地址
    headers: {
    }
    // timeout: 30000 // 请求超时时间
});
var loadingInstance;
// 请求发出前的拦截器
service.interceptors.request.use(
    req => {
        let temp = req.url;
        let timestamp = Math.round(new Date().getTime() / 1000);
        let type = 'application/json; charset=utf-8'
        let sign = md5(temp + timestamp);
        req.headers = {
            'Content-Type': type,
            'timestamp': timestamp,
            'sign': sign
        }
        return req;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应的拦截器
service.interceptors.response.use(
    function (response) {
        // 请求正常则返回
        return Promise.resolve(response);
    },
    function (error) {
        console.log(error.response);
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    alert("404,请求找不到！");
                    break;
                case 500:
                    alert("500,服务器错误！");
                    break;
                case 403:
                    alert("403,认证过期！");
                case 401:
                    alert("401,无权限！");
                case 500004:
                    router.push({
                        path: "/"
                    });
            }
        } else {
            // alert("未知错误，可能是断网了！");
        }
        return Promise.reject(error);
    }
);

export default service;