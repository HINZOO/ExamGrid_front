import { createApp } from 'vue';
import App from './App.vue';
import Home from './pages/Home.vue';
import Link from './pages/Link.vue';
import Link02 from './pages/Link02.vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createI18n } from 'vue-i18n'
import i18n_ko from '@/assets/i18n/ko.json' 
import i18n_en from '@/assets/i18n/en.json'
import i18n_cn from '@/assets/i18n/cn.json'  

const messages = {
  ko: i18n_ko,
  en: i18n_en,
  cn: i18n_cn
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
  { path: '/link02/:linkUno', component: Link02, name: 'Link02', props:true},

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
