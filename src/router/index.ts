import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory, RouteLocationNormalized,
} from 'vue-router'

import routes from './routes'
import { useUserStore } from 'stores/user'
import { waitForCurrentUser } from 'src/utils/waitForCurrentUser.util'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to: RouteLocationNormalized) => {
    let routeToGo = to.path;

    await waitForCurrentUser(() => {
      const store = useUserStore();
      if (to.path !== '/' && !store.isLoggedIn) {
        routeToGo = '/';
      }
    })

    if (routeToGo !== to.path) {
      return routeToGo;
    }
  });

  return Router;
})
