import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import rege from '../views/rege.vue'
import sech from '../views/sech.vue'
import tuijian from '../views/tuijian.vue'
import tuijian2 from '../views/tuijian2.vue'
import mocInfo from "../views/mocInfo.vue"



const routes = [
  {
    path: '/',
    redirect: "/Home",
    
  },
  {
    path: '/tuijian2',
    name: 'tuijian2',
    component: tuijian2,
    
  },
  {
    path: '/mocInfo',
    name: 'mocInfo',
    component: mocInfo,
    
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: "/Home/tuijian",
      },
      {
        path: 'tuijian',
        name: 'tuijian',
        component: tuijian,
      },
      {
        path: 'rege',
        name: 'rege',
        component: rege,
      },
      {
        path: 'sech',
        name: 'sech',
        component: sech,
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  //   // redirect:"/about/two",

  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
