import HomePage from "../components/pages/HomePage.vue";
import * as VueRouter from 'vue-router'
import RegisterPage from "../components/pages/RegisterPage.vue";
import CouponsPage from "../components/pages/CouponsPage.vue";
import MainView from "../components/views/MainView.vue";
import NotificationsPage from "../components/pages/NotificationsPage.vue";
import {RouterName} from "../enum/RouterName.js";

//TODO When refresh page 0.1 sec image loaded on top and white body

const routes = [
  {
    path: '/',
    name: RouterName.Home,
    component: import('../components/pages/HomePage.vue'),
  },
  {
    path: '/events',
    name: RouterName.Events,
    component: () => import('../components/pages/EventsPage.vue'),
  },
  {
    path: '/register',
    name: RouterName.Register,
    component: () => import('../components/pages/RegisterPage.vue'),
  },
  {
    path: '/me',
    component: () => import('../components/views/MainView.vue'),
    children: [
      {
        path: 'ai',
        name: RouterName.AI,
        component: () => import('../components/pages/AIPage.vue'),
      },
      {
        path: '/coupons',
        name: RouterName.Coupons,
        component: () => import('../components/pages/CouponsPage.vue'),
      },
      {
        path: 'notifications',
        name: RouterName.Notifications,
        component: () => import('../components/pages/NotificationsPage.vue'),
      },
      {
        path: 'settings',
        name: RouterName.Settings,
        component: () => import('../components/pages/SettingsPage.vue'),
      },
      {
        path: 'subscription',
        name: RouterName.Subscription,
        component: () => import('../components/pages/NotificationsPage.vue'),
      },
    ]
  },
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})
