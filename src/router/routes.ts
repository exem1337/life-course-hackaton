import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PageOne.vue') }],
  },
  {
    path: '/page2',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PageTwo.vue') }],
  },
  {
    path: '/university',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UniversityPage.vue') }],
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UserProfilePage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
