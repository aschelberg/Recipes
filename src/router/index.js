import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import useUserStore from '@/stores/user.store.js';
import HomeView from '@/views/HomeView.vue';
import MyRecipesView from '@/views/MyRecipesView.vue';
import ShoppingListView from '@/views/ShoppingListView.vue';
import AboutView from '@/views/AboutView.vue';
import LoginView from '@/views/Auth/LoginView.vue';
import LogoutView from '@/views/Auth/LogoutView.vue';
import SignupView from '@/views/Auth/SignupView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:{
        name: 'home'
      },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        mustBeAuthenticated: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About',
        mustBeAuthenticated: true,
      }
    },
    {
      path: '/myrecipes',
      name: 'myrecipes',
      component: MyRecipesView,
      meta: {
        title: 'My Recipes',
        mustBeAuthenticated: true,
      }
    },
    {
      path: '/shoppinglist',
      name: 'shoppinglist',
      component: ShoppingListView,
      meta: {
        title: 'Shopping List',
        mustBeAuthenticated: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    }
  ]
})

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.mustBeAuthenticated) {
    const currentUser = await getCurrentUser()
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return 'login'
    }
  }
})

export default router
