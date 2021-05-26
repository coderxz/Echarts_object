import Vue from 'vue'

Vue.filter("formatDate", function (value) {   //全局方法 Vue.filter()注册过滤器, 1*10 => 2018-01-01 09:01:01
    if (!value) return '/'
    // console.log(value,1177)
    let timeStamp = +(value+'').padEnd(13, '0')
    let date = new Date(timeStamp)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
});
Vue.filter("formatDateNew", function (value) {   //全局方法 Vue.filter()注册过滤器, 1*10 => 2018-01-01 09:01:01
    if (!value) return '/'
    let timeStamp = +(value+'').padEnd(13, '0')
    let date = new Date(timeStamp)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    return Y + M + D 
});
Vue.filter("formatSecs", function (value) {   //全局方法 Vue.filter()注册过滤器, 1*10 => 天时分
    if (!value || value < 1) return '未设置'
    let D = Math.floor(value/3600/24)
    let h = Math.floor(value/3600) % 24
    let m = Math.floor(value/60) % 60
    let t = ''
    if (D) {
        t = D + ' 天 '
    }
    if (h) {
        t = t + h + ' 时 '
    }
    if (m) {
        t = t + m + ' 分 '
    }
    if (!t) {
        t = value + ' 秒 '
    }
    return t
})


Vue.filter("formatEnNature", function (value) {   //全局方法 Vue.filter()注册过滤器, 1*10 => 天时分
    if (!value || value < 1) return '未设置'
    let obj = {
        '1': '有限责任公司',
        '2': '股份有限公司',
        '3': '国有独资',
        '4': '个人独资',
        '5': '合伙企业',
        '6': '个体工商户',
        '7': '外资企业',
        '8': '私营',
        '9': '其他性质',
    }
    return obj[value+'']
})

// 获取节点位置，进行滚动条定位
Vue.prototype.$goScrollTop = function (value, off, type = 'class') {
    let t = document.getElementsByClassName('router_view')[0]  // 基于滚动节点
    // (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollTop == 'number' ? t : document.body)
    let st = t.scrollTop
    let y = 0
    if (type === 'class') {
        y = document.getElementsByClassName(value)[0].getBoundingClientRect().y
    }
    let top = y + st + off
    console.log(top)
    try {
        t.scrollTop = top
    } catch (error) {}
}

Vue.prototype.formatDouble = function(value) {
    if (!value && value !== 0) return ''
    value = value.toString().replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
    value = value.toString().replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
    value = value.toString().replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
    if (value.indexOf(".") < 0 && value != '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        value = parseFloat(value);
    }
    return value
}

Vue.prototype.formatTaxRate = function(value) {
    if (!value && value !== 0) return '0.00'
    value = value.toString().replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
    value = value.toString().replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
    value = value.toString().replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
    value = (+value).toFixed(2)
    if (value >= 100) {
        value = 99.99
    }
    return value
}

// 换成
Vue.prototype.newDate = function(value) {
    let d = new Date(value)
    var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
    return times;
  }
