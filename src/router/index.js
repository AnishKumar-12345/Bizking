import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },     
  
    ...setupLayouts(routes),   

    // {
    //   path: '/Createwarehouseinput/:po_id',
    //   name: 'Createwarehouseinput',
    //   component: () => import('../pages/Createwarehouseinput.vue'), // Replace with your component path
    //   props: true // Enable props for route params
    // },  
    
    // other routes...
   
    // { path: '/default', component: 'Default' },
    // { path: '/login', component: Login },
  ],
  base: import.meta.env.BASE_URL,
  scrollBehavior() { 
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('createdby') !== null

  /* Check if user is authenticated */  // You need to implement this logic
  
  // If the user is not authenticated and trying to access any route other than '/login', redirect to '/login'
  if (!isAuthenticated && to.path !== '/login') {
    next('/login')
  } else {
    next() // Proceed with navigation
  }
})
export default router
