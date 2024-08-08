const GuestRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Home Page',
      path: '/',
      component: () => import('@/views/landing/home.vue')
    },
    {
      name: 'Contact Us',
      path: '/contact-us',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    {
      name: 'Terms & Conditions',
      path: '/pages/terms',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    }
  ]
};

export default GuestRoutes;
