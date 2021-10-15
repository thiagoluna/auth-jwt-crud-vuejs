import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users/index'
import auth from './modules/auth/index'
import { state, mutations } from './default'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        users,
        auth
    },
    state,
    mutations
})

export default store