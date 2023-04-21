import { createRouter, createWebHistory } from '@ionic/vue-router';

import Agence from '../views/Agences.vue';
import Register from '../views/Auth/Register.vue';
import Login from '@/views/Auth/Login.vue';
import Voitures from '../views/Voitures.vue';
import Commande from '../views/Commande.vue';
import Commandes from '@/views/Commandes.vue';

const routes = [
  {
    path: '/',
    redirect: '/agences',
  },
  {
    path: '/agences',
    name: 'Agence',
    component: Agence,
  },
  {
    path: '/voitures/:agenceId',
    name: 'VoituresPage',
    component: Voitures,
  },
  { 
    path: '/commande/:voitureId', 
    name: 'CommandesPage',
    component: Commande 
  },
  {
    path: '/commandes',
    name: 'Commandes',
    component: Commandes,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
