import * as VueRouter from 'vue-router'
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
    path: '/forgot-password',
    name: RouterName.ForgotPassword,
    component: () => import('../components/pages/ForgotPasswordPage.vue'),
  },
  {
    path: '/reset-password/:secret',
    name: RouterName.ResetPassword,
    component: () => import('../components/pages/ResetPasswordPage.vue'),
  },
  {
    path: '/verify/:secret',
    name: RouterName.VerifyUser,
    component: () => import('../components/pages/UserVerificationPage.vue'),
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
        component: () => import('../components/pages/SubscriptionPage.vue'),
      },
    ]
  },
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})
