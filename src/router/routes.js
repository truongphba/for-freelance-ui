const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/Register.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('pages/Logout.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '',
        meta: {
          title: 'Homepage'
        },
        name: 'homepage',
        component: () => import('pages/Homepage.vue')
      },
      {
        path: '/register-freelancer',
        meta: {
          title: 'Register Freelancer'
        },
        name: 'registerFreelancer',
        component: () => import('pages/RegisterFreelancer.vue')
      },
      {
        path: '/chat/:roomid/:name',
        meta: {
          title: 'Chat Demo'
        },
        name: 'chat',
        component: () => import('pages/Chat.vue')
      },
      {
        path: 'freelancers',
        meta: {
          title: 'Freelancers'
        },
        name: 'freelancers',
        component: () => import('pages/Freelancers.vue')
      },
      {
        path: '/job/:job_id',
        meta: {
          title: 'Detail job'
        },
        name: 'detail',
        component: () => import('pages/DetailJob.vue')
      },
      {
        path: '/jobs',
        meta: {
          title: 'List job'
        },
        name: 'listJob',
        component: () => import('pages/ListJob.vue')
      },
      {
        path: '/jobs-freelancer',
        meta: {
          title: 'List freelancer job'
        },
        name: 'listFreelancerJob',
        component: () => import('pages/ListFreelancerJob.vue')
      },
      { path: '/add-fund-detail/:amount', component: () => import('pages/AddFundDetail') },
      { path: '/add-fund', component: () => import('pages/AddFund') }
      // {
      //   path: 'categories',
      //   meta: {
      //     title: 'Danh mục'
      //   },
      //   name: 'categories',
      //   component: () => import('pages/Category.vue')
      // },
      // {
      //   path: 'departments',
      //   meta: {
      //     title: 'Departments'
      //   },
      //   name: 'departments',
      //   component: () => import('pages/Department.vue')
      // },
      // {
      //   path: 'services',
      //   meta: {
      //     title: 'Services'
      //   },
      //   name: 'services',
      //   component: () => import('pages/Service.vue')
      // },
      // {
      //   path: 'clients',
      //   meta: {
      //     title: 'Clients'
      //   },
      //   name: 'clients',
      //   component: () => import('pages/Client.vue')
      // },
      // {
      //   path: 'products',
      //   meta: {
      //     title: 'Products'
      //   },
      //   name: 'products',
      //   component: () => import('pages/Product.vue')
      // },
      // {
      //   path: 'employees',
      //   meta: {
      //     title: 'Employees'
      //   },
      //   name: 'employees',
      //   component: () => import('pages/Employee.vue')
      // },
      // {
      //   path: 'payments',
      //   meta: {
      //     title: 'Payments'
      //   },
      //   name: 'payments',
      //   component: () => import('pages/Payment.vue')
      // },
      // {
      //   path: 'contacts',
      //   meta: {
      //     title: 'Contacts'
      //   },
      //   name: 'contacts',
      //   component: () => import('pages/Contact.vue')
      // },
      // {
      //   path: 'orders',
      //   meta: {
      //     title: 'Orders'
      //   },
      //   name: 'orders',
      //   component: () => import('pages/Order.vue')
      // }
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
