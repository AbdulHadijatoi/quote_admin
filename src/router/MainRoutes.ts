import { isSuperAdmin } from '@/utils/api';

const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard',
  component: () => import('@/layouts/full/FullLayout.vue'),
  beforeEnter: (to: any, from: any, next: any) => {
    if (isSuperAdmin()) {
      next(); // Allow access to all routes
    } else {
      const allowedRoutes = ['Dashboard', 'Create Quote', 'Quote History'];
      const routeName = to.name;

      if (allowedRoutes.includes(routeName)) {
        next(); // Allow access to specific routes
      } else {
        next('/main/dashboard'); // Redirect to the dashboard or another allowed route
      }
    }
  },
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
