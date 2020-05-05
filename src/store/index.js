import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    showTabName: '',
    lisData: []
}
const mutations = {
    changeTabs(state, data) {
        state.showTabName = data
    },
    changeListData(state, data) {
        state.lisData = data
    }
}
const store = new Vuex.Store({
    state,
    mutations
})
export default store