import axios from 'axios'
import {API_VERSION, TOKEN_NAME} from "../../../config/api";

export default {
    getUsers ({commit}) {
        commit('SET_PRELOADER', true )
        commit('SET_TEXT_PRELOADER', 'Loading Users...' )

        const token = localStorage.getItem(TOKEN_NAME)
        return axios.create({
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .get('users')
                .then(response => {
                    //console.log(response.data)
                    commit('SET_USER', response.data)
                })
                .finally(() => commit('SET_PRELOADER', false))
    },

    getFakeUsers ({commit}) {
        commit('SET_PRELOADER', true )
        commit('SET_TEXT_PRELOADER', 'Loading Users...' )

        const token = localStorage.getItem(TOKEN_NAME)
        return axios.get('https://cdn.jsdelivr.net/gh/thiagoluna/auth-jwt-crud-vuejs@master/api/users.json')
            .then(response => {
                commit('SET_USER', response.data)
            })
            .finally(() => commit('SET_PRELOADER', false))
    }
}
