import localforage from 'localforage'
import { isEmpty } from 'lodash'
import { http } from '@/plugins/http'

export const attemptLogin = ({ dispatch }, payload) => {
  return http.post('login', payload)
    .then(response => {
      const { token, user } = response.data

      dispatch('setUser', user)
      dispatch('setToken', token)

      return user
    })
}

export const logout = ({ dispatch }) => {
  http.post('logout')

  // call actions
  return Promise.all([
    dispatch('setToken', null),
    dispatch('setUser', {})
  ])
}

export const setUser = ({ commit }, user) => {
  commit('SET_USER', user)
  Promise.resolve(user) // keep promise chain
}

export const setToken = ({ commit }, payload) => {
  // prevent if payload is a object
  const token = (isEmpty(payload)) ? null : payload.token || payload

  // Commit the mutations
  commit('SET_TOKEN', token)

  return Promise.resolve(token) // keep promise chain
}

export const checkUserToken = ({ dispatch, state }) => {
  // If the token exists then all validation has already been done
  if (!isEmpty(state.token)) {
    return Promise.resolve(state.token)
  }

  /**
   * Token does not exist yet
   * - Recover it from localstorage
   * - Recover also the user, validating the token also
   */
  return localforage.getItem('APP_USER_TOKEN')
    .then(token => {
      if (isEmpty(token)) {
        // Token is not saved in localstorage
        return Promise.reject('NO_TOKEN') // Reject promise
      }
      // Put the token in the vuex store
      return dispatch('setToken', token) // keep promise chain
    })
    // With the token in hand, retrieves the user's data, validating the token
    .then(() => dispatch('loadUser'))
}

/**
 * Retrieves updated user information
 * If something goes wrong, the user's token is probably invalid
 */
export const loadUser = ({ dispatch }) => http.get('me')
  // store user's data
  .then(user => dispatch('setUser', user.data))
  .catch(() => {
    // Process failure, delete the token
    dispatch('setToken', '')
    return Promise.reject('FAIL_IN_LOAD_USER') // keep promise chain
  })
