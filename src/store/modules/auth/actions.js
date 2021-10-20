import axios from 'axios'
import { TOKEN_NAME } from "../../../config/api";

export default {
    register ( { commit }, params) {
        commit('SET_PRELOADER', true )
        commit('SET_TEXT_PRELOADER', 'Loading Users...' )

        return axios.post('users', params)
            .finally(() => commit('SET_PRELOADER', false))
    },

    login ( { commit, dispatch }, params) {
      return axios.post('login', params)
          .then(response => {
              localStorage.setItem(TOKEN_NAME, response.data.access_token)

              dispatch('getMe')
          })
    },

    logout ({ commit }) {
        let token = localStorage.getItem(TOKEN_NAME)
        if (!token) return
        return axios.create({
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .post('logout', {})
            .then(response => {
                commit ('SET_LOGOUT')
                localStorage.removeItem(TOKEN_NAME)

            })
    },

    getMe ( { commit }) {
        let token = localStorage.getItem(TOKEN_NAME)
        if (!token) return
        //console.log(token)
        return axios.create({
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .post('me', {})
                .then(response => {
                    //console.log(response.data)
                    commit('SET_ME', response.data)
                })
                .catch(error => localStorage.removeItem(TOKEN_NAME))
    }
}
