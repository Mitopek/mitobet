import MainPage from "../components/pages/MainPage.vue";
import * as VueRouter from 'vue-router'
import RegisterPage from "../components/pages/RegisterPage.vue";
import CouponsPage from "../components/pages/CouponsPage.vue";

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/coupons',
    component: CouponsPage,
  }
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})
