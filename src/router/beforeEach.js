import store from '../store'

const beforeEach = (to, from, next) => {
  if (to.path == '/login') {
    next()
  }

  store.dispatch('checkUserToken')
    .then(() => {
      // There is a token and it is valid
      next() // can access the route
    })
    .catch(() => {
      // No token, or it is invalid
      next('/login') // redirect to login
    })
}

export default beforeEach
