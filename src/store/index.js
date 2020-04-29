import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    showTabName: 'home'
}
const mutations = {
    changeTabs(state, data) {
        state.showTabName = data
    }
}
const store = new Vuex.Store({
    state,
    mutations
})
export default store