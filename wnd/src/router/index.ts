import ProductDetail from '../views/ProductDetail.vue';

import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/components/Main.vue';
import ProductsList from '@/views/ProductsList.vue';
import Cart from '@/views/Cart.vue';
import Admin from '@/views/Admin.vue';
import PageNotFound from '../views/PageNotFound.vue'
import Checkout from '../views/Checkout.vue'
import Favourites from '../views/Favourites.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      beforeEnter: (to, from, next) => {
        
        const productId = parseInt(to.params.id);
  
        
        if (productId > 30) {
       
          next('/default');
        } else {
       
          next();
        }
      },
    },
    {
      path: '/productList', 
      name: 'ProductsList',
      component: ProductsList,
    },
    {
      path: '/cart', 
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/admin', 
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/favourites', 
      name: 'Favourites',
      component: Favourites,
    },
    {
      path: '/default',
      name: 'PageNotFound',
      component: PageNotFound,
    }, 
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'PageNotFound' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'PageNotFound' },
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
  ]
})

export default router
