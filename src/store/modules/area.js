// 地区store数据
const state = {
    areaName: "广东省贫困村医疗健康大数据平台", //地区名称
    patient_create: [], //患者建档排行
    inquiry: [], //远程问诊排行
    patient_accept: [], //接待患者排行
    consultation: [], //远程会诊排行
    referral: [], //远程转诊排行
    institution_num: null, //地市机构数
    institution: [], //区县机构排行
    detection: {}, //健康检测排行
    date_statistics_date: [], //近七天
    village_list:[],//贫困村列表
};
const mutations = {
    // 设置地区名称
    set_area_name: (state, data) => {
        state.areaName = data;
    },

    // 患者建档排行
    set_patient_create: (state, data) => {
        state.patient_create = data;
    },

    // 远程问诊排行
    set_inquiry: (state, data) => {
        state.inquiry = data;
    },

    // 接待患者排行
    set_patient_accept: (state, data) => {
        state.patient_accept = data;
    },

    // 远程会诊排行
    set_consultation: (state, data) => {
        state.consultation = data;
    },

    // 远程转诊排行
    set_referral: (state, data) => {
        state.referral = data;
    },

    // 地市机构数
    set_institution_num: (state, data) => {
        state.institution_num = data;
    },

    //区县机构排行
    set_institution: (state, data) => {
        state.institution = data;
    },

    //区县机构排行
    set_village_list: (state, data) => {
        state.village_list = data;
    },

    //健康检测排行
    set_detection: (state, data) => {
        state.detection = data;
    },

    //七天业务趋势
    set_seven_day: (state, data) => {
        state.date_statistics_date = data;
    },
};
const actions = {
    // set_tab_active({ commit, state }, data) {
    //     return new Promise((resolve, reject) => {
    //         commit('set_data', data);
    //     });
    // },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};