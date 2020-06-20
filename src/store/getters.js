// check if current path is /login/*
export const isLoginPage = ({ route }) => route.path.indexOf('/login') !== -1

// check if navigation should be displayed
// if route.path does not exist yet returns false
export const shouldShowNavigation = ({ route }, getters) => (route.path ? !getters.isLoginPage : false);