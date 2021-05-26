import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import area from './modules/area';
import geo from './modules/geo';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        home,
        area,
        geo
    },
});
export default store;