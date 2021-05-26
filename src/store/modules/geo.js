// 地区store数据
const state = {
    areaDataArr: [], //地区数据
    areaPosition: [], //城市数据
    acceptPatient: 10000,
    health: 234151,
    AI: 13221,
    inquire: 464642
};
const mutations = {
    // 设置地区数据
    set_area_data: (state, data) => {
        state.areaDataArr = data;
    },
    // 设置城市数据
    set_area_position: (state, data) => {
        state.areaPosition = data;
    },

    // 設置随机数
    set_acceptPatient_mathData: (state, data) => {
        state.acceptPatient += data;
    },
    set_health_mathData: (state, data) => {
        state.health += data;
    },
    set_AI_mathData: (state, data) => {
        state.AI += data;
    },
    set_inquire_mathData: (state, data) => {
        state.inquire += data;
    }
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