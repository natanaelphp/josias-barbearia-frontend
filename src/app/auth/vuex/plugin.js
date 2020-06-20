import localforage from 'localforage'
import { setToken as httpSetToken } from '@/plugins/http'

const subscribe = (store) => {
  store.subscribe((mutation, { auth }) => {
    if ('SET_TOKEN' === mutation.type) {
      /**
       * Set the Axios Authorization header with the token
       */
      httpSetToken(auth.token)

      /**
       * Sets the token to the local storage
       * for auto-login purpose
       */
      localforage.setItem('APP_USER_TOKEN', auth.token)
    }
  })
}

export default (store) => {
  subscribe(store)
};
