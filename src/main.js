import { createApp } from 'vue';
import App from './App.vue';
import Home from './pages/Home.vue';
import List from './pages/List.vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const routes = [
  { path: '/', component: Home },
  { path: '/list', component: List }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app
  .use(router)
  .mount('#app');
