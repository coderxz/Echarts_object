import { resolve } from "url";
import { reject } from "q";

// 首页store数据
const state = {
  data: []
};
const mutations = {
    set_data: (state, data) => {
        state.data = data;
    },
};
const actions = {
  setData({commit, state}, data) {
    return new Promise((resolve, reject) => {
      commit('set_data', data);
    })
  }
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