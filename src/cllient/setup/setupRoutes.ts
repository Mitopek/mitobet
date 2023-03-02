import MainPage from "../components/pages/MainPage.vue";
import * as VueRouter from 'vue-router'
import RegisterPage from "../components/pages/RegisterPage.vue";

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  }
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})
