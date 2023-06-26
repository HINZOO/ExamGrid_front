import { createApp } from 'vue';
import App from './App.vue';
import Home from './pages/Home.vue';
import Link from './pages/Link.vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createI18n } from 'vue-i18n'
import i18n_ko from '@/assets/i18n/ko.json' 
import i18n_en from '@/assets/i18n/en.json' 

const messages = {
  ko: i18n_ko,
  en: i18n_en
}

const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  globalInjection: true,
  messages
})


const routes = [
  { path: '/', component: Home },
  { path: '/list', component: Link },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app
  .use(router).use(i18n)
  .mount('#app');
