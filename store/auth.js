export const state = () => ({
  authenticated: false
})

export const mutations = {
  setAuthenticated(state, status) {
    state.authenticated = status
  }
}

export const actions = {
  authenticate({ commit }, value) {
    commit('setAuthenticated', value)
  },
  logout({ commit }) {
    this.$axios.get(`/logout`)
      .then(() => {
        // Nothing to do here
        // It should fail
      })
      .catch(() => {
        commit('setAuthenticated', false)
      })
  }
}
