import { lazy } from 'react'

const routes = [
  { path: '/', label: 'Home', Component: lazy(() => import('pages/Home')) },
  { path: '/menu-collections', label: 'Menu collections', Component: lazy(() => import('pages/MenuCollections')) },
  { path: '/favorite-recipes', label: 'Favorite recipes', Component: lazy(() => import('pages/FavoriteRecipes')) },
  { path: '/my-recipes', label: 'My recipes', Component: lazy(() => import('pages/MyRecipes')) },
  { path: '/create-recipe', label: 'Create recipe', Component: lazy(() => import('pages/CreateRecipe')) },
  { path: '/profile', label: 'Profile', Component: lazy(() => import('pages/Profile')) },
  { path: '/settings', label: 'Settings', Component: lazy(() => import('pages/Settings')) },
]

export { routes }
