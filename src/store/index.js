import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || null,
    user: {}
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.state = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    async login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('/login', user)
          .then(res => {
            console.log("this is token ", res);
            const token = res.data.access_token
            console.log(token);

            const user = res.data.user
            console.log("this is res", res);
            localStorage.setItem('token', token)
            console.log(token);

            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(res)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    // async register({ commit }, user) {
    //   return new Promise((resolve, reject) => {
    //     commit('auth_request')
    //     axios.post('http://localhost:5000/login', user)
    //       .then(resp => {
    //         const token = resp.data.access_token
    //         const user = resp.data.user
    //         localStorage.setItem('token', token)
    //         axios.defaults.headers.common['Authorization'] = token
    //         commit('auth_success', token, user)
    //         resolve(resp)
    //       })
    //       .catch(err => {
    //         commit('auth_error', err)
    //         localStorage.removeItem('token')
    //         reject(err)
    //       })
    //   })
    // },
    async logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules: {

  }
})
