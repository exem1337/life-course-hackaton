import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/news',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/NewsPage.vue') }],
  },
  {
    path: '/university/:universityId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UniversityPage.vue') }],
  },
  {
    path: '/profile/:userId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UserProfilePage.vue') }],
  },
  {
    path: '/offers',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/OffersPage.vue') }],
  },
  {
    path: '/offers/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/OfferViewPage.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
