import axios from 'axios'

// allow use http client without Vue instance
export const http = axios.create({
  baseURL: 'http://localhost:8081/api/',
})

/**
* Helper method to set the header with the token
*/
export function setToken(token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}

// receive store and data by options
// https://vuejs.org/v2/guide/plugins.html
export default function install(Vue) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  Object.defineProperty(Vue.prototype, '$http', {
    get() {
      return http
    },
  })
}