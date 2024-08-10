const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Default',
      path: '/dashboard',
      component: () => import('@/views/dashboards/Dashboard.vue')
    },
    {
      name: 'Starter',
      path: '/dashboard/starter',
      component: () => import('@/views/dashboards/StarterPage.vue')
    },
    {
      name: 'Users',
      path: '/dashboard/users',
      component: () => import('@/views/dashboards/Users.vue')
    },
    {
      name: 'Setting',
      path: '/dashboard/setting',
      component: () => import('@/views/dashboards/Setting.vue')
    },
  ]
};

export default MainRoutes;
