import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProdutosView from '../views/ProdutosView.vue'
import PedidosView from '../views/PedidosView.vue'
import ComprasView from '../views/ComprasView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: ProdutosView
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: PedidosView
  },
  {
    path: '/compras',
    name: 'Compras',
    component: ComprasView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
