import { isAuthenticated } from '@/utils/api'; // Adjust the path according to your project structure

const AuthRoutes = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  beforeEnter: (to: any, from: any, next: any) => {
    if (isAuthenticated()) {
      next('/dashboard'); // Redirect to the dashboard if authenticated
    } else {
      next(); // Proceed to the auth route if not authenticated
    }
  },
  children: [
    {
      name: 'Login',
      path: '/auth/login',
      component: () => import('@/views/authentication/auth/LoginPage.vue')
    },
    {
      name: 'Error 404',
      path: '/pages/error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    }
  ]
};

export default AuthRoutes;
