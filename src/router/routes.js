const routes = [
  // Đăng nhập
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },

  // Đăng xuất
  {
    path: '/logout',
    name: 'logout',
    component: () => import('pages/Logout.vue')
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('pages/Landing.vue')
  },
  // admin
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        meta: {
          title: 'Thống kê'
        },
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: 'categories',
        meta: {
          title: 'Danh mục'
        },
        name: 'categories',
        component: () => import('pages/Category.vue')
      },
      {
        path: 'departments',
        meta: {
          title: 'Departments'
        },
        name: 'departments',
        component: () => import('pages/Department.vue')
      },
      {
        path: 'services',
        meta: {
          title: 'Services'
        },
        name: 'services',
        component: () => import('pages/Service.vue')
      },
      {
        path: 'clients',
        meta: {
          title: 'Clients'
        },
        name: 'clients',
        component: () => import('pages/Client.vue')
      },
      {
        path: 'products',
        meta: {
          title: 'Products'
        },
        name: 'products',
        component: () => import('pages/Product.vue')
      },
      {
        path: 'employees',
        meta: {
          title: 'Employees'
        },
        name: 'employees',
        component: () => import('pages/Employee.vue')
      },
      {
        path: 'payments',
        meta: {
          title: 'Payments'
        },
        name: 'payments',
        component: () => import('pages/Payment.vue')
      },
      {
        path: 'contacts',
        meta: {
          title: 'Contacts'
        },
        name: 'contacts',
        component: () => import('pages/Contact.vue')
      },
      {
        path: 'orders',
        meta: {
          title: 'Orders'
        },
        name: 'orders',
        component: () => import('pages/Order.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
