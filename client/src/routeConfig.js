
import { Login } from './views/Login';
import { Signup } from './views/Signup';
import { Dashboard } from './views/Dashboard';

export const routeConfig = {
  loginPage: {
    component: Login,
    route: '/login',
    exact: true
  },
  signupPage: {
    component: Signup,
    route: '/signup',
    exact: true
  },
  dashboardPage: {
    component: Dashboard,
    route: '/dashboard',
    exact: true
  }
};