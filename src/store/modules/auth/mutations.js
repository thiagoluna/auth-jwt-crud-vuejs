export default {
    SET_ME (state, me) {
        state.me = me
        state.authenticated = true
    },

    SET_AUTHENTICATED (state, status) {
        state.authenticated = status
    },

    SET_LOGOUT (state) {
        state.me = {
            name: '',
            email: "",
        }

        state.authenticated = false
    }
}