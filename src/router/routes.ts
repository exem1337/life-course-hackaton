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
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutPage.vue') }],
  },
  {
    path: '/partners',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PartnersPage.vue') }],
  },
  {
    path: '/terms',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TermsOfUsePage.vue') }],
  },
  {
    path: '/contacts',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ContactsPage.vue') }],
  },
  {
    path: '/ads',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AdsPage.vue') }],
  },
  {
    path: '/privacypolicy',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PrivacyPolicyPage.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
