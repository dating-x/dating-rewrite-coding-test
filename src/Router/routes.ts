const Home = async () => import('@/Pages/Public/Home/index.vue');

// Layouts
const DefaultLayout = async () => import('@/Layouts/Default.vue');

export default [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: {
          guest: true,
        },
      },
    ],
  },
];
