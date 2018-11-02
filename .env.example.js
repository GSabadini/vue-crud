module.exports = {
  install: (Vue) => {
    Vue.env = {}
    Vue.env.BASE_API_URL = 'http://localhost:8081/api'

    Vue.prototype.$env = Vue.env
  }
}
