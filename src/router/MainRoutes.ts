const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboards/Dashboard.vue')
    },
    {
      name: 'Create Quote',
      path: '/dashboard/quotes/create',
      component: () => import('@/views/dashboards/CreateQuote.vue')
    },
    {
      name: 'Quote History',
      path: '/dashboard/quotes/history',
      component: () => import('@/views/dashboards/QuoteHistory.vue')
    },
    {
      name: 'Subscribers',
      path: '/dashboard/subscribers',
      component: () => import('@/views/dashboards/Subscribers.vue')
    },
    {
      name: 'Permissions',
      path: '/dashboard/permissions',
      component: () => import('@/views/dashboards/Permissions.vue')
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
    {
      name: 'Profile Setting',
      path: '/dashboard/profile-setting',
      component: () => import('@/views/dashboards/ProfileSetting.vue')
    },
  ]
};

export default MainRoutes;
