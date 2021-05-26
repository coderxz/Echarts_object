window.testHost = "test999.cgc999.com";
window.healthHost = "health.cgc999.com";
window.cgcHost = "cgc.cgc999.com";
window.testNewHost = "test999.cgc999.com";

if (location.host === "health.cgc999.com") {
    window.winConst = {
        baseURL: '//health.cgc999.com/apigw', // 演示环境
        hostURL: 'https://health.cgc999.com', // 演示环境
        ws: 'ws://health.cgc999.com/ngInstMsg/alliance?type=1'

    }
} else if (location.host === "vv.cgc999.com") {
    window.winConst = {
        baseURL: '//aa.cgc999.com/apigw', // 测试环境
        hostURL: 'https://vv.cgc999.com', // 测试环境
        ws: 'ws://aa.cgc999.com/ngInstMsg/alliance?type=1'
    }
} else if (location.host === "www.cgc999.com") {
    window.winConst = {
        baseURL: '//aa.cgc999.com/apigw', // 测试环境
        hostURL: 'http://vv.cgc999.com', // 测试环境
        ws: 'ws://aa.cgc999.com/ngInstMsg/alliance?type=1'
    }
} else if (location.host === "cgc.cgc999.com") {
    window.winConst = {
        baseURL: '//cgc.cgc999.com/apigw', // 线上环境
        hostURL: 'https://cgc.cgc999.com', // 线上环境
        ws: 'ws://cgc.cgc999.com/ngInstMsg/alliance?type=1'
    }
} else if (location.host === "entry.cgc999.com") {
    window.winConst = {
        baseURL: '//cgc.cgc999.com/apigw', // 线上环境
    }
} else if (location.host === "139.9.184.166") {
    window.winConst = {
        baseURL: '//139.9.184.166/apigw', // 华为云
        hostURL: 'http://139.9.184.166', // 华为云
        ws: 'ws://139.9.184.166/ngInstMsg/alliance?type=1'
    }
} else if (location.host === "test999.cgc999.com") {
    window.winConst = {
        baseURL: '//test999.cgc999.com/apigw', // 华为云
        hostURL: 'http://test999.cgc999.com', // 华为云
        ws: 'ws://test999.cgc999.com/ngInstMsg/alliance?type=1'
    }
} else if (location.host.substring(0, 11) === "192.168.10.") {
    window.winConst = {
        baseURL: '//192.168.10.200/apigw', // 开发环境
        hostURL: 'http://192.168.10.200', // 开发环境
        ws: 'ws://aa.cgc999.com/ngInstMsg/alliance?type=1'
    }
} else if (location.hostname === "localhost") {
    window.winConst = {
        baseURL: '//192.168.10.200/apigw', // 开发环境
        hostURL: 'http://192.168.10.200', // 开发环境
        ws: 'ws://aa.cgc999.com/ngInstMsg/alliance?type=1'
    };
} else {
    window.winConst = {
        baseURL: '//' + location.host + '/apigw',
        hostURL: location.protocol + '//' + location.host,
        ws: 'ws://' + location.host + '/ngInstMsg/alliance?type=1'
    }
}

window.winConst.datacenter = '/datacenter';
window.winConst.goods = '/goods';
window.winConst.area = '/area';
