import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    showTabName: '',
    showOldTabName: '',
    subTabName: '',
    lisData: []
}
const mutations = {
    changeTabs(state, data) {
        state.showTabName = data
    },
    changeOldTabs(state, data) {
        state.showOldTabName = data
    },
    changeListData(state, data) {
        state.lisData = data
    },
    changeListName(state, data) {
        state.subTabName = data
    }
}
const store = new Vuex.Store({
    state,
    mutations
})
export default store