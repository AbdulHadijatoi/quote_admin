const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    // {
    //   name: 'LandingPage',
    //   path: '/',
    //   component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    // },
    {
      name: 'Default',
      path: '/dashboard',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Starter',
      path: '/dashboard/starter',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Users',
      path: '/dashboard/users',
      component: () => import('@/views/Users.vue')
    },
  ]
};

export default MainRoutes;
