export const state = {
    preLoader: false,
    textPreloader: 'Loading...'
}

export const mutations = {
    SET_PRELOADER (state, status) {
        state.preLoader = status
        state.textPreloader = 'Loading...'
    },

    SET_TEXT_PRELOADER (state, text) {
        state.textPreloader = text
    }

}