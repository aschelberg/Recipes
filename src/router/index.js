import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import useUserStore from '@/stores/user.store.js';
import RecipeOverview from '@/components/Reusables/RecipeOverview.vue';
import RecipesView from '@/views/RecipesView.vue';
import MyRecipesView from '@/views/MyRecipesView.vue';
import ShoppingListView from '@/views/ShoppingListView.vue';
import IngredientsView from '@/views/IngredientsView.vue';
import LoginView from '@/views/LoginView.vue';
import LogoutView from '@/views/LogoutView.vue';
import SignupView from '@/views/SignupView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:{
        name: 'recipes'
      },
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipesView,
      meta: {
        title: 'Recipes',
        mustBeAuthenticated: true,
      }
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: IngredientsView,
      meta: {
        title: 'Ingredients',
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
      path: '/recipes/recipe/:id/:name',
      name: 'recipe',
      component: RecipeOverview,
      meta: {
        title: 'Recipe View',
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
